CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`completed` integer NOT NULL,
	`priority` integer DEFAULT 1 NOT NULL
);
