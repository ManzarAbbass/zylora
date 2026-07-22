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
    previewUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
    captionText: "Don't let your style wait in the cart! 🛍️ Use code RETAKE10 for an exclusive 10% off.",
    status: "PENDING",
    feedback: null,
    createdAt: new Date("2026-07-18"),
  },
  {
    id: "app_social_91",
    campaignId: "cmp_welcome_01",
    contentType: "Instagram Story Canvas",
    previewUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop",
    captionText: "Welcome to the family! ✨ Enjoy 15% off your first order with code WELCOME15.",
    status: "PENDING",
    feedback: null,
    createdAt: new Date("2026-07-19"),
  },
  {
    id: "app_email_12",
    campaignId: "cmp_cart_02",
    contentType: "Email Marketing Copy",
    previewUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    captionText: "Your cart misses you! Complete your purchase now and get free shipping on orders above $50.",
    status: "APPROVED",
    feedback: null,
    createdAt: new Date("2026-07-16"),
  },
  {
    id: "app_display_45",
    campaignId: "cmp_welcome_01",
    contentType: "Display Banner 728x90",
    previewUrl: "https://images.unsplash.com/photo-1434626881859-194d67b2b861?w=600&h=400&fit=crop",
    captionText: "New season, new you. Explore our latest collection with up to 40% off — shop the sale now!",
    status: "REVISION",
    feedback: "Please update the CTA button color to match brand guidelines and reduce the discount percentage.",
    createdAt: new Date("2026-07-15"),
  },
  {
    id: "app_video_23",
    campaignId: "cmp_cart_02",
    contentType: "TikTok Organic Reel",
    previewUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    captionText: "Behind the scenes: how we craft your favorite pieces. Watch the full video on our channel!",
    status: "PENDING",
    feedback: null,
    createdAt: new Date("2026-07-20"),
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
  {
    id: "msg_003",
    clientId: "usr_client_4206",
    senderRole: "CLIENT" as const,
    messageText: "Great, looking forward to it. Also, can you share the analytics report for the current running campaigns?",
    createdAt: new Date("2026-07-21T09:00:00Z"),
  },
  {
    id: "msg_004",
    clientId: "usr_client_4206",
    senderRole: "ADMIN" as const,
    messageText: "Absolutely. We've just compiled the July metrics — revenue attributed is up 12.5% MoM. I'll share the full breakdown in the Performance Reports section shortly.",
    createdAt: new Date("2026-07-21T11:45:00Z"),
  },
  {
    id: "msg_005",
    clientId: "usr_client_4206",
    senderRole: "CLIENT" as const,
    messageText: "That's impressive! Please prioritize the creative assets for the Black Friday campaign — we need at least 3 variations ready for review by end of month.",
    createdAt: new Date("2026-07-22T14:30:00Z"),
  },
  {
    id: "msg_006",
    clientId: "usr_client_4206",
    senderRole: "ADMIN" as const,
    messageText: "Noted. Our creative team has already begun drafting concepts. You'll see the first batch in the Approvals Queue by Monday. We'll keep you posted!",
    createdAt: new Date("2026-07-22T16:00:00Z"),
  },
];

export const adminDashboardStats = {
  totalRevenue: "$602,170",
  revenueDelta: "+18.4% MoM",
  onboardedClients: "34",
  clientsDelta: "+3 this month",
  activeCampaigns: "62",
  campaignsDelta: "+8 vs last quarter",
  avgOpenRate: "41.6%",
  openRateDelta: "+2.1% progressive",
};

export const clientDashboardStats = {
  revenueAttributed: "$68,420",
  revenueDelta: "+12.5%",
  emailsDelivered: "128,400",
  emailsDelta: "+8.3%",
  openRate: "42.8%",
  openRateDelta: "+2.1%",
  clickThrough: "6.4%",
  clickThroughDelta: "+0.8%",
};

export const mockAnalyticsMonthlyTrends = [
  { month: "Jan", revenue: 32000, spend: 12000 },
  { month: "Feb", revenue: 38500, spend: 14500 },
  { month: "Mar", revenue: 42000, spend: 16000 },
  { month: "Apr", revenue: 51000, spend: 19500 },
  { month: "May", revenue: 58000, spend: 22000 },
  { month: "Jun", revenue: 64000, spend: 24000 },
  { month: "Jul", revenue: 68420, spend: 25800 },
];
