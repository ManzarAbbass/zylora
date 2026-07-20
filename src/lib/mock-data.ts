export const mockUserAdmin = {
  id: "usr_admin_9831",
  name: "Zylora Senior Executive",
  email: "admin@zylora.com",
  role: "ADMIN" as const,
  companyName: "Zylora Digital Agency",
  packageName: null,
  createdAt: new Date("2026-01-01"),
};

export const mockUserClient = {
  id: "usr_client_4206",
  name: "Ahmed Clothing Team",
  email: "ahmed@clothing.com",
  role: "CLIENT" as const,
  companyName: "Ahmed Clothing Ltd",
  packageName: "Pro",
  createdAt: new Date("2026-03-15"),
};

export const currentMockUser = mockUserClient;

export const mockClientsList = [
  {
    id: "usr_client_4206",
    name: "Ahmed Clothing",
    email: "ahmed@clothing.com",
    packageName: "Pro",
    activeCampaignsCount: 2,
    totalRevenueTracked: 17200.00,
    joinDate: "2026-03-15",
  },
  {
    id: "usr_client_5521",
    name: "Veloce Footwear",
    email: "ops@veloce.pk",
    packageName: "Enterprise",
    activeCampaignsCount: 5,
    totalRevenueTracked: 48900.00,
    joinDate: "2026-02-10",
  },
  {
    id: "usr_client_1109",
    name: "Lumina Skincare",
    email: "hello@luminaskin.com",
    packageName: "Growth",
    activeCampaignsCount: 1,
    totalRevenueTracked: 3400.00,
    joinDate: "2026-05-01",
  },
];

export const mockCampaigns = [
  {
    id: "cmp_welcome_01",
    clientId: "usr_client_4206",
    title: "Welcome Email Series",
    status: "ACTIVE",
    emailsSent: 5420,
    openRate: "42.50",
    revenueGenerated: 12400.00,
    budgetSpendToDate: 1200.00,
    updatedAt: new Date("2026-07-20"),
  },
  {
    id: "cmp_cart_02",
    clientId: "usr_client_4206",
    title: "Abandoned Cart Recovery Flow",
    status: "ACTIVE",
    emailsSent: 1200,
    openRate: "38.00",
    revenueGenerated: 4800.00,
    budgetSpendToDate: 450.00,
    updatedAt: new Date("2026-07-19"),
  },
];

export const mockContentApprovals = [
  {
    id: "app_banner_88",
    campaignId: "cmp_cart_02",
    contentType: "Meta Creative Video/Banner",
    previewUrl: "https://unsplash.com",
    captionText: "Don't let your style wait in the cart! 🛍️ Use code RETAKE10 for an exclusive 10% off.",
    status: "PENDING",
    feedback: null,
    createdAt: new Date("2026-07-18"),
  },
];

export const mockMessages = [
  {
    id: "msg_001",
    clientId: "usr_client_4206",
    senderRole: "CLIENT" as const,
    messageText: "Can we execute a new campaign setup for Black Friday launch week?",
    createdAt: new Date("2026-07-20T10:15:00Z"),
  },
  {
    id: "msg_002",
    clientId: "usr_client_4206",
    senderRole: "ADMIN" as const,
    messageText: "Sure! We will have the strategy and copy ready for approval by Friday.",
    createdAt: new Date("2026-07-20T10:30:00Z"),
  },
];

export const mockAnalyticsMonthlyTrends = [
  { month: "Jan", revenue: 4000, spend: 800 },
  { month: "Feb", revenue: 5500, spend: 1100 },
  { month: "Mar", revenue: 7800, spend: 1500 },
  { month: "Apr", revenue: 11000, spend: 2200 },
  { month: "May", revenue: 13400, spend: 2900 },
  { month: "Jun", revenue: 15800, spend: 3400 },
  { month: "Jul", revenue: 17200, spend: 3850 },
];
