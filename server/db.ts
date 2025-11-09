import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  conversations, 
  messages, 
  healthProfiles, 
  InsertHealthProfile,
  questionnaires, 
  InsertQuestionnaire,
  activityLogs,
  savedResources
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Chat and conversation helpers
export async function createConversation(userId: number | null, isAnonymous: boolean = true) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(conversations).values({
    userId,
    isAnonymous: isAnonymous ? 1 : 0,
  });
  return result[0].insertId;
}

export async function getConversation(conversationId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserConversations(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(conversations.updatedAt);
}

export async function addMessage(conversationId: number, role: "user" | "assistant", content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(messages).values({
    conversationId,
    role,
    content,
  });

  // Update conversation timestamp
  await db.update(conversations)
    .set({ updatedAt: new Date() })
    .where(eq(conversations.id, conversationId));
}

export async function getConversationMessages(conversationId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);
}

// Health profile helpers
export async function getHealthProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(healthProfiles).where(eq(healthProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertHealthProfile(userId: number, data: Partial<InsertHealthProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getHealthProfile(userId);
  if (existing) {
    await db.update(healthProfiles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(healthProfiles.userId, userId));
  } else {
    await db.insert(healthProfiles).values({
      userId,
      ...data,
    });
  }
}

// Questionnaire helpers
export async function getQuestionnaire(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(questionnaires)
    .where(eq(questionnaires.userId, userId))
    .orderBy(questionnaires.createdAt)
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function saveQuestionnaire(userId: number, data: Partial<InsertQuestionnaire>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(questionnaires).values({
    userId,
    ...data,
  });
}

// Activity log helpers
export async function logActivity(userId: number | null, activityType: string, duration: number | null, completed: boolean, notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(activityLogs).values({
    userId,
    activityType,
    duration,
    completed: completed ? 1 : 0,
    notes,
  });
}

export async function getUserActivities(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(activityLogs)
    .where(eq(activityLogs.userId, userId))
    .orderBy(activityLogs.createdAt)
    .limit(limit);
}

// Saved resources helpers
export async function saveResource(userId: number, resourceType: "service" | "article" | "exercise" | "contact", resourceId: string, resourceName: string, resourceData?: string, notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(savedResources).values({
    userId,
    resourceType,
    resourceId,
    resourceName,
    resourceData,
    notes,
  });
}

export async function getUserSavedResources(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(savedResources)
    .where(eq(savedResources.userId, userId))
    .orderBy(savedResources.createdAt);
}

export async function deleteResource(resourceId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(savedResources)
    .where(eq(savedResources.id, resourceId));
}
