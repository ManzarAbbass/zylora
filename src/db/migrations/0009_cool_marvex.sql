CREATE TYPE "public"."campaign_channel" AS ENUM('EMAIL', 'META', 'GOOGLE', 'TIKTOK');--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "channel" "campaign_channel" DEFAULT 'EMAIL' NOT NULL;