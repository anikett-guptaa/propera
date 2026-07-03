export type RoomStatus = "occupied" | "vacant" | "maintenance";

export interface Tenant {
  name: string;
  since: string;
  rent: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  propertyId: string;
  status: RoomStatus;
  tenant?: Tenant;
  rent: string;
  type: "single" | "double" | "triple";
  lastCleaned?: string;
}

export interface RoomStatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  cellBg: string;
  cellBorder: string;
  cellText: string;
}

export const roomStatusConfig: Record<RoomStatus, RoomStatusConfig> = {
  occupied: {
    label: "Occupied",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/30",
    dot: "bg-emerald-500",
    cellBg: "bg-emerald-50 dark:bg-emerald-500/10",
    cellBorder: "border-emerald-200 dark:border-emerald-500/30",
    cellText: "text-emerald-700 dark:text-emerald-300",
  },
  vacant: {
    label: "Vacant",
    color: "text-zinc-500 dark:text-zinc-400",
    bg: "bg-zinc-50 dark:bg-white/[0.03]",
    border: "border-zinc-200 dark:border-white/[0.08]",
    dot: "bg-zinc-400",
    cellBg: "bg-zinc-50 dark:bg-white/[0.03]",
    cellBorder: "border-zinc-200 dark:border-white/[0.08]",
    cellText: "text-zinc-500 dark:text-zinc-400",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-500",
    cellBg: "bg-amber-50 dark:bg-amber-500/10",
    cellBorder: "border-amber-200 dark:border-amber-500/30",
    cellText: "text-amber-700 dark:text-amber-300",
  },
};