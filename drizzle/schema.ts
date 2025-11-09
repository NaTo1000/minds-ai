import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Chat conversations and messages
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // null for anonymous chats
  isAnonymous: int("isAnonymous").default(1).notNull(), // 1 = true, 0 = false
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Health profiles (encrypted sensitive data)
export const healthProfiles = mysqlTable("healthProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  // Encrypted fields - store as text after encryption
  medicareNumber: text("medicareNumber"), // encrypted
  healthCareCard: text("healthCareCard"), // encrypted
  privateHealthInsurer: varchar("privateHealthInsurer", { length: 255 }),
  privateHealthNumber: text("privateHealthNumber"), // encrypted
  emergencyContact: varchar("emergencyContact", { length: 255 }),
  emergencyPhone: varchar("emergencyPhone", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Patient questionnaire responses
export const questionnaires = mysqlTable("questionnaires", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // Mental health assessment
  currentFeelings: text("currentFeelings"),
  triggers: text("triggers"),
  copingStrategies: text("copingStrategies"),
  // Medication
  currentMedications: text("currentMedications"),
  medicationSideEffects: text("medicationSideEffects"),
  // History
  previousDiagnoses: text("previousDiagnoses"),
  previousTreatments: text("previousTreatments"),
  // Sleep
  sleepQuality: varchar("sleepQuality", { length: 50 }),
  sleepHours: varchar("sleepHours", { length: 50 }),
  // Support
  currentSupport: text("currentSupport"),
  preferredContactMethod: varchar("preferredContactMethod", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Saved resources and favorites
export const savedResources = mysqlTable("savedResources", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  resourceType: mysqlEnum("resourceType", ["service", "article", "exercise", "contact"]).notNull(),
  resourceId: varchar("resourceId", { length: 255 }).notNull(),
  resourceName: varchar("resourceName", { length: 255 }).notNull(),
  resourceData: text("resourceData"), // JSON data for the resource
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Activity logs for tracking tool usage
export const activityLogs = mysqlTable("activityLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // null for anonymous
  activityType: varchar("activityType", { length: 100 }).notNull(), // breathing, meditation, cbt, etc
  duration: int("duration"), // in seconds
  completed: int("completed").default(0).notNull(), // 1 = true, 0 = false
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
export type HealthProfile = typeof healthProfiles.$inferSelect;
export type InsertHealthProfile = typeof healthProfiles.$inferInsert;
export type Questionnaire = typeof questionnaires.$inferSelect;
export type InsertQuestionnaire = typeof questionnaires.$inferInsert;
export type SavedResource = typeof savedResources.$inferSelect;
export type InsertSavedResource = typeof savedResources.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = typeof activityLogs.$inferInsert;