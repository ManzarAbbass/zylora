CREATE TABLE "access_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"work_email" text NOT NULL,
	"company_name" text NOT NULL,
	"role" text,
	"monthly_ad_spend" text,
	"message" text,
	"ip" text,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
