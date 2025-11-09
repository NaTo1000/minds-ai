import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import {
  createConversation,
  getConversation,
  getUserConversations,
  addMessage,
  getConversationMessages,
  logActivity,
  getUserActivities,
} from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Chat with Trina (anonymous and authenticated)
  chat: router({
    // Create a new conversation
    create: publicProcedure
      .input(z.object({ isAnonymous: z.boolean().optional() }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id ?? null;
        const isAnonymous = input.isAnonymous ?? !ctx.user;
        const conversationId = await createConversation(userId, isAnonymous);
        return { conversationId };
      }),

    // Get conversation history
    getConversation: publicProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        const conversation = await getConversation(input.conversationId);
        if (!conversation) throw new Error("Conversation not found");
        const messages = await getConversationMessages(input.conversationId);
        return { conversation, messages };
      }),

    // Get user's conversation list (authenticated only)
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserConversations(ctx.user.id);
    }),

    // Send message and get Trina's response
    sendMessage: publicProcedure
      .input(z.object({ 
        conversationId: z.number(), 
        message: z.string() 
      }))
      .mutation(async ({ input }) => {
        // Save user message
        await addMessage(input.conversationId, "user", input.message);

        // Get conversation history for context
        const history = await getConversationMessages(input.conversationId);
        
        // Build messages for LLM
        const llmMessages = [
          {
            role: "system" as const,
            content: `You are Trina, a compassionate and patient mental health support assistant. You are a nurturing turtle character who helps people dealing with depression, PTSD, panic attacks, and chronic insomnia.

Your role:
- Provide emotional support and a safe space for people to talk
- Offer evidence-based coping strategies and grounding techniques
- Suggest appropriate resources and professional help when needed
- Be patient, understanding, and non-judgmental
- Use warm, friendly language while maintaining professionalism
- Never provide medical diagnoses or replace professional treatment
- Encourage users to seek professional help for serious concerns
- Offer practical suggestions for calming activities, CBT techniques, and sleep hygiene

Remember: You're here to listen, support, and guide - not to diagnose or treat.`
          },
          ...history.slice(-10).map(msg => ({
            role: msg.role as "user" | "assistant",
            content: String(msg.content)
          }))
        ];

        // Get response from LLM
        const response = await invokeLLM({ messages: llmMessages });
        const messageContent = response.choices[0]?.message?.content;
        const trinaResponse = typeof messageContent === 'string' 
          ? messageContent 
          : Array.isArray(messageContent) 
            ? messageContent.map(c => c.type === 'text' ? c.text : '').join('') 
            : "I'm here to listen. How can I support you today?";

        // Save Trina's response
        await addMessage(input.conversationId, "assistant", trinaResponse);

        return { response: trinaResponse };
      }),
  }),

  // Activity logging
  activities: router({
    log: publicProcedure
      .input(z.object({
        activityType: z.string(),
        duration: z.number().optional(),
        completed: z.boolean(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user?.id ?? null;
        await logActivity(userId, input.activityType, input.duration ?? null, input.completed, input.notes);
        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserActivities(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
