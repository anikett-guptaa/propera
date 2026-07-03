"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { mockRooms, mockProperties } from "@/components/dashboard/rooms/mock-data";
import { RoomsSummary } from "@/components/dashboard/rooms/rooms-summary";
import { RoomsFilters } from "@/components/dashboard/rooms/rooms-filters";
import { FloorGrid } from "@/components/dashboard/rooms/floor-grid";
import { RoomDrawer } from "@/components/dashboard/rooms/room-drawer";
import type { Room, RoomStatus } from "@/components/dashboard/rooms/room-types";

type StatusFilter = "all" | RoomStatus;

export default function RoomsPage() {
  const [selectedProperty, setSelectedProperty] = useState("1");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Filter rooms by property first
  const propertyRooms = mockRooms.filter((r) => r.propertyId === selectedProperty);

  // Then apply search + status filter
  const filteredRooms = propertyRooms.filter((r) => {
    const matchSearch =
      r.number.includes(search) ||
      r.tenant?.name.toLowerCase().includes(search.toLowerCase()) ||
      false;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Group filtered rooms by floor
  const floors = [...new Set(filteredRooms.map((r) => r.floor))].sort((a, b) => a - b);

  const currentProperty = mockProperties.find((p) => p.id === selectedProperty);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-950 dark:text-white">Rooms</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {currentProperty?.name} · {propertyRooms.length} rooms across {floors.length} floors
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors shrink-0">
          <Plus className="w-3.5 h-3.5" />
          Add Room
        </button>
      </div>

      {/* Summary */}
      <RoomsSummary rooms={propertyRooms} />

      {/* Filters */}
      <RoomsFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        properties={mockProperties}
      />

      {/* Legend */}
      <div className="flex items-center gap-4">
        {[
          { color: "bg-emerald-200 dark:bg-emerald-500/30 border border-emerald-300 dark:border-emerald-500/40", label: "Occupied" },
          { color: "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10", label: "Vacant" },
          { color: "bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30", label: "Maintenance" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-md ${item.color}`} />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Floor grids */}
      {floors.length > 0 ? (
        <div className="space-y-4">
          {floors.map((floor, i) => (
            <FloorGrid
              key={floor}
              floor={floor}
              rooms={filteredRooms.filter((r) => r.floor === floor)}
              onRoomClick={setSelectedRoom}
              floorIndex={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No rooms found
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
            Try adjusting your search or filter
          </p>
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="mt-4 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Room detail drawer */}
      <RoomDrawer room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </div>
  );
}