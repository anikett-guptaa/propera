export type TenantStatus = "active" | "overdue" | "vacating";

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  room: string;
  floor: number;
  rentAmount: string;
  status: TenantStatus;
  joinDate: string;
  leaseEnd: string;
  lastPaid: string;
  pendingAmount?: string;
  idType: "aadhaar" | "pan" | "passport";
  idNumber: string;
  emergencyContact: string;
  avatar: string;
}

export interface TenantStatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
}

export const tenantStatusConfig: Record<TenantStatus, TenantStatusConfig> = {
  active: {
    label: "Active",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  overdue: {
    label: "Overdue",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/30",
    dot: "bg-rose-500",
  },
  vacating: {
    label: "Vacating",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-500",
  },
};
