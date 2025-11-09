CREATE TABLE `activityLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`activityType` varchar(100) NOT NULL,
	`duration` int,
	`completed` int NOT NULL DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activityLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`isAnonymous` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `healthProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`medicareNumber` text,
	`healthCareCard` text,
	`privateHealthInsurer` varchar(255),
	`privateHealthNumber` text,
	`emergencyContact` varchar(255),
	`emergencyPhone` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `healthProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `healthProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questionnaires` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`currentFeelings` text,
	`triggers` text,
	`copingStrategies` text,
	`currentMedications` text,
	`medicationSideEffects` text,
	`previousDiagnoses` text,
	`previousTreatments` text,
	`sleepQuality` varchar(50),
	`sleepHours` varchar(50),
	`currentSupport` text,
	`preferredContactMethod` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `questionnaires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `savedResources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`resourceType` enum('service','article','exercise','contact') NOT NULL,
	`resourceId` varchar(255) NOT NULL,
	`resourceName` varchar(255) NOT NULL,
	`resourceData` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedResources_id` PRIMARY KEY(`id`)
);
