CREATE TYPE "public"."recurrence_type" AS ENUM('daily', 'weekly', 'monthly', 'annual');--> statement-breakpoint
CREATE TABLE "habit" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habit_execution" (
	"id" text PRIMARY KEY NOT NULL,
	"habit_id" text NOT NULL,
	"completed_at" timestamp NOT NULL,
	"completed_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "habitExecution_habitId_completedDate_unique" UNIQUE("habit_id","completed_date")
);
--> statement-breakpoint
CREATE TABLE "habit_recurrence" (
	"id" text PRIMARY KEY NOT NULL,
	"habit_id" text NOT NULL,
	"type" "recurrence_type" NOT NULL,
	"interval_days" integer,
	"weekdays" integer[],
	"interval_months" integer,
	"interval_years" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "habit_recurrence_habit_id_unique" UNIQUE("habit_id")
);
--> statement-breakpoint
ALTER TABLE "habit" ADD CONSTRAINT "habit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_execution" ADD CONSTRAINT "habit_execution_habit_id_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_recurrence" ADD CONSTRAINT "habit_recurrence_habit_id_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "habit_userId_idx" ON "habit" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "habit_isActive_idx" ON "habit" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "habitExecution_habitId_idx" ON "habit_execution" USING btree ("habit_id");--> statement-breakpoint
CREATE INDEX "habitExecution_completedDate_idx" ON "habit_execution" USING btree ("completed_date");--> statement-breakpoint
CREATE INDEX "habitRecurrence_habitId_idx" ON "habit_recurrence" USING btree ("habit_id");