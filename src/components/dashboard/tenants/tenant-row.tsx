"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import type { Tenant } from "./tenant-types";
import { tenantStatusConfig } from "./tenant-types";

interface TenantRowProps {
  tenant: Tenant;
  index: number;
  onClick: (tenant: Tenant) => void;
}

export function TenantRow({ tenant, index, onClick }: TenantRowProps) {
  const cfg = tenantStatusConfig[tenant.status];

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={() => onClick(tenant)}
      className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-zinc-50 dark:border-white/[0.04] last:border-0"
    >
      {/* Tenant name + avatar */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
            {tenant.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-950 dark:text-white truncate">
              {tenant.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Phone className="w-2.5 h-2.5 text-zinc-400" />
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                {tenant.phone}
              </p>
            </div>
          </div>
        </div>
      </td>

      {/* Room + property */}
      <td className="px-4 py-3.5 hidden sm:table-cell">
        <p className="text-sm font-mono font-medium text-ink-950 dark:text-white">
          {tenant.room}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-2.5 h-2.5 text-zinc-400" />
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate max-w-[140px]">
            {tenant.propertyName}
          </p>
        </div>
      </td>

      {/* Rent */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <p className="text-sm font-semibold text-ink-950 dark:text-white font-mono">
          {tenant.rentAmount}
        </p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
          per month
        </p>
      </td>

      {/* Last paid */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{tenant.lastPaid}</p>
        {tenant.pendingAmount && (
          <p className="text-[10px] text-rose-500 dark:text-rose-400 mt-0.5 font-medium">
            {tenant.pendingAmount} pending
          </p>
        )}
      </td>

      {/* Lease end */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{tenant.leaseEnd}</p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
          since {tenant.joinDate}
        </p>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </td>

      {/* Arrow */}
      <td className="px-4 py-3.5 text-right">
        <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors ml-auto" />
      </td>
    </motion.tr>
  );
}
