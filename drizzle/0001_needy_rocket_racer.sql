CREATE TABLE `account_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`accountKey` varchar(80) NOT NULL,
	`action` enum('copy','open') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `account_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reference` varchar(24) NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organisation` varchar(200),
	`channel` varchar(60),
	`topic` enum('technology','services','partnership','support','press','other') NOT NULL,
	`budget` varchar(60),
	`message` text NOT NULL,
	`status` enum('new','read','answered','archived') NOT NULL DEFAULT 'new',
	`routedTo` varchar(320) NOT NULL,
	`sourcePath` varchar(200),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `enquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `enquiries_reference_unique` UNIQUE(`reference`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`token` varchar(32) NOT NULL,
	`consent` boolean NOT NULL DEFAULT false,
	`sourcePath` varchar(200),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletter_signups_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_signups_email_unique` UNIQUE(`email`)
);
