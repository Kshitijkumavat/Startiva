import {
  Bot,
  CheckCircle2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Target,
  Timer,
  Users,
  Zap,
} from "lucide-react";

export const painPoints = [
  {
    icon: LayoutDashboard,
    title: "Leads scattered across spreadsheets",
  },
  {
    icon: FileText,
    title: "Proposals drafted in Docs, then sent over email",
  },
  {
    icon: CreditCard,
    title: "Payments tracked manually, overdue ones missed",
  },
];

export const features = [
  {
    icon: Target,
    title: "Visual deal pipelines",
    text: "Move opportunities from first chat to signed deal with a board your whole team understands.",
  },
  {
    icon: Bot,
    title: "AI proposal generator",
    text: "Turn discovery notes into crisp proposals, scopes, and next steps without staring at a blank doc.",
  },
  {
    icon: CreditCard,
    title: "Payment tracking",
    text: "Keep due dates, partial payments, and overdue follow-ups visible before cash flow gets messy.",
  },
  {
    icon: Zap,
    title: "Follow-up reminders",
    text: "Never lose momentum after a call. Assign next steps and nudge teammates at the right time.",
  },
];

export const steps = [
  {
    icon: Timer,
    title: "Create your workspace",
    text: "Add your startup, invite co-founders, and choose the deal stages that match how you sell.",
  },
  {
    icon: Users,
    title: "Add leads and deals",
    text: "Capture prospects, attach notes, and generate proposals when a lead is ready to move.",
  },
  {
    icon: CheckCircle2,
    title: "Close and get paid",
    text: "Track signed deals, payment status, and follow-ups from one clean operating view.",
  },
];
