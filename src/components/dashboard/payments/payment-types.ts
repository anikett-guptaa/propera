export type PaymentStatus = "paid" | "pending" | "overdue" | "partial";
export type PaymentMethod = "upi" | "cash" | "bank" | "cheque";

export interface Payment {
  id: string;
  tenantName: string;
  tenantAvatar: string;
  room: string;
  propertyName: string;
  propertyId: string;
  amount: string;
  amountRaw: number;
  month: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  paidOn?: string;
  dueDate: string;
  reference?: string;
  notes?: string;
}

export interface PaymentStatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
}

export const paymentStatusConfig: Record<PaymentStatus, PaymentStatusConfig> = {
  paid: {
    label: "Paid",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-500",
  },
  overdue: {
    label: "Overdue",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/30",
    dot: "bg-rose-500",
  },
  partial: {
    label: "Partial",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/30",
    dot: "bg-blue-500",
  },
};

export const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: string }> = {
  upi: { label: "UPI", icon: "📱" },
  cash: { label: "Cash", icon: "💵" },
  bank: { label: "Bank Transfer", icon: "🏦" },
  cheque: { label: "Cheque", icon: "📄" },
};
