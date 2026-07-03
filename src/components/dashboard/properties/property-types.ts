import { Home, Users, Building2, Landmark, Briefcase, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PropertyType = "hostel" | "pg" | "apartment" | "residential" | "commercial" | "villa";
export type PropertyStatus = "active" | "maintenance";

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  floors: number;
  totalRooms: number;
  occupiedRooms: number;
  monthlyRevenue: string;
  pendingDues: string;
  status: PropertyStatus;
}

export interface PropertyTypeConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const propertyTypeConfig: Record<PropertyType, PropertyTypeConfig> = {
  hostel: {
    label: "Hostel",
    icon: Home,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
  pg: {
    label: "PG",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  apartment: {
    label: "Apartment",
    icon: Building2,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  residential: {
    label: "Residential",
    icon: Landmark,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  commercial: {
    label: "Commercial",
    icon: Briefcase,
    color: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-800",
  },
  villa: {
    label: "Villa",
    icon: TreePine,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-500/10",
  },
};