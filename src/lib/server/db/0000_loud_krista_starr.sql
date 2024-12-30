CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer
);
--> statement-breakpoint
CREATE TABLE `user_manga` (
	`user_id` integer NOT NULL,
	`manga_id` integer NOT NULL,
	`status` text,
	`score` integer,
	PRIMARY KEY(`user_id`, `manga_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
