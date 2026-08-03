import { describe, it, expect, vi, beforeEach } from "vitest";
import { injectClientLiveMetricsAction } from "./actions";
import { injectMetricsValidationSchema } from "./inject-metrics-schema";

const mocks = vi.hoisted(() => {
  const limit = vi.fn<() => Promise<Array<{ id: string }>>>(() => Promise.resolve([]));
  const orderBy = vi.fn(() => ({ limit }));
  const where = vi.fn(() => ({ orderBy }));
  const from = vi.fn(() => ({ where }));
  const select = vi.fn(() => ({ from }));
  const insert = vi.fn(() => ({ values: vi.fn<() => Promise<void>>(() => Promise.resolve()) }));
  const update = vi.fn(() => ({
    set: vi.fn(() => ({ where: vi.fn<() => Promise<void>>(() => Promise.resolve()) })),
  }));
  return { select, insert, update, limit };
});

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    select: mocks.select,
    insert: mocks.insert,
    update: mocks.update,
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { auth } from "@/auth";

const validPayload = {
  clientId: "3b8a9e04-5c9a-4b4e-9c3f-2f1e6d4a8b10",
  channel: "META" as const,
  spend: 4250.5,
  revenueGenerated: 12800,
  emailsSent: 5400,
};

describe("injectMetricsValidationSchema", () => {
  it("accepts a valid telemetry payload", () => {
    const parsed = injectMetricsValidationSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
  });

  it("coerces numeric string inputs", () => {
    const parsed = injectMetricsValidationSchema.safeParse({
      ...validPayload,
      spend: "4250.5",
      revenueGenerated: "12800",
      emailsSent: "5400",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.spend).toBe(4250.5);
      expect(parsed.data.emailsSent).toBe(5400);
    }
  });

  it("rejects invalid clientId and channel", () => {
    expect(
      injectMetricsValidationSchema.safeParse({
        ...validPayload,
        clientId: "not-a-uuid",
      }).success,
    ).toBe(false);
    expect(
      injectMetricsValidationSchema.safeParse({
        ...validPayload,
        channel: "SNAP",
      }).success,
    ).toBe(false);
  });

  it("rejects negative spend and non-integer emailsSent", () => {
    expect(
      injectMetricsValidationSchema.safeParse({
        ...validPayload,
        spend: -1,
      }).success,
    ).toBe(false);
    expect(
      injectMetricsValidationSchema.safeParse({
        ...validPayload,
        emailsSent: 100.5,
      }).success,
    ).toBe(false);
  });
});

describe("injectClientLiveMetricsAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns unauthorized for non-admin session", async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { role: "CLIENT" },
    } as never);

    const result = await injectClientLiveMetricsAction(validPayload);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Unauthorized.");
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("returns error for invalid payload", async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { role: "ADMIN" },
    } as never);

    const result = await injectClientLiveMetricsAction({
      ...validPayload,
      spend: -5,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid telemetry payload provided.");
  });

  it("inserts a new campaign track when no row matches clientId + channel", async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { role: "ADMIN" },
    } as never);
    mocks.limit
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "trend-1" }]);

    const result = await injectClientLiveMetricsAction(validPayload);

    expect(result.success).toBe(true);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.update).toHaveBeenCalledTimes(1);
  });

  it("updates the existing campaign row when clientId + channel match", async () => {
    vi.mocked(auth).mockResolvedValue({
      user: { role: "ADMIN" },
    } as never);
    mocks.limit
      .mockResolvedValueOnce([{ id: "campaign-1" }])
      .mockResolvedValueOnce([]);

    const result = await injectClientLiveMetricsAction(validPayload);

    expect(result.success).toBe(true);
    expect(mocks.update).toHaveBeenCalledTimes(1);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
  });
});
