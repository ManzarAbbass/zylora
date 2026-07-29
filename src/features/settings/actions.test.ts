import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateNotificationPrefsAction } from "./actions";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
  },
}));

vi.mock("@/lib/audit", () => ({
  logAuditEvent: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { auth } from "@/auth";

describe("updateNotificationPrefsAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error for invalid input", async () => {
    const result = await updateNotificationPrefsAction({
      emailNotifications: "not-a-boolean" as unknown as boolean,
      campaignUpdates: true,
      approvalAlerts: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid preferences data.");
  });

  it("returns error when unauthenticated", async () => {
    vi.mocked(auth).mockResolvedValue({ user: null } as never);

    const result = await updateNotificationPrefsAction({
      emailNotifications: true,
      campaignUpdates: false,
      approvalAlerts: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Unauthorized.");
  });

  it("updates prefs on valid input", async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { id: "user-1" },
    } as never);

    const result = await updateNotificationPrefsAction({
      emailNotifications: true,
      campaignUpdates: false,
      approvalAlerts: true,
    });

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });
});