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
    title: "Connect your tools",
    text: "Link your existing stack in a few clicks. 40+ integrations with zero configuration needed.",
  },
  {
    icon: Users,
    title: "Configure your workflow",
    text: "Set rules, filters, and triggers using our visual editor — built around how your team works.",
  },
  {
    icon: CheckCircle2,
    title: "Invite your team",
    text: "Add co-founders and teammates instantly. Roles and shared views ready out of the box.",
  },
  {
    icon: CheckCircle2,
    title: "Go live instantly",
    text: "Publish with one click. Watch leads, deals, and payments flow in from day one.",
  }
];
