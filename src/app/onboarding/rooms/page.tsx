"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { DoorOpen, Wand2, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  roomsFormSchema,
  type RoomsFormInput,
} from "@/lib/validations/onboarding";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";
import { WizardFooter } from "@/components/onboarding/wizard-footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const steps = [
  { label: "Organization", status: "done" as const },
  { label: "Property", status: "done" as const },
  { label: "Rooms", status: "active" as const },
];

function RoomPreview({
  floors,
  roomsPerFloor,
  startNumber,
}: {
  floors: number;
  roomsPerFloor: number;
  startNumber: number;
}) {
  const validFloors = Math.min(Math.max(floors, 0), 50);
  const validRooms = Math.min(Math.max(roomsPerFloor, 0), 100);
  const validStart = Math.max(startNumber, 1);
  const totalRooms = validFloors * validRooms;

  if (validFloors === 0 || validRooms === 0) return null;

  const previewFloors = Math.min(validFloors, 3);
  const previewRoomsPerFloor = Math.min(validRooms, 8);
  const truncateRooms = validRooms > 8;
  const truncateFloors = validFloors > 3;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Room Preview
        </p>
        <span className="text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
          {totalRooms} rooms total
        </span>
      </div>
      <div className="space-y-2">
        {Array.from({ length: previewFloors }).map((_, floorIndex) => {
          const floorNumber = validFloors - floorIndex;
          const floorStart = validStart + floorIndex * validRooms;
          return (
            <div key={floorIndex} className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 w-12 shrink-0">
                Floor {floorNumber}
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                {Array.from({ length: previewRoomsPerFloor }).map(
                  (_, roomIndex) => (
                    <div
                      key={roomIndex}
                      className="w-9 h-6 rounded-md bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex items-center justify-center"
                    >
                      <span className="text-[9px] font-semibold text-zinc-600 dark:text-zinc-300">
                        {floorStart + roomIndex}
                      </span>
                    </div>
                  )
                )}
                {truncateRooms && (
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-0.5">
                    +{validRooms - previewRoomsPerFloor} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {truncateFloors && (
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 pl-14">
            +{validFloors - previewFloors} more floors
          </p>
        )}
      </div>
    </div>
  );
}

function ModeCard({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl border p-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        selected
          ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800"
          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors",
            selected
              ? "bg-zinc-900 dark:bg-white"
              : "bg-zinc-100 dark:bg-zinc-800"
          )}
        >
          <Icon
            className={cn(
              "w-[18px] h-[18px] transition-colors",
              selected
                ? "text-white dark:text-zinc-900"
                : "text-zinc-500 dark:text-zinc-400"
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium transition-colors",
              selected
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {title}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all",
            selected
              ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white"
              : "border-zinc-300 dark:border-zinc-600"
          )}
        >
          {selected && (
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-900" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 dark:text-red-400">{message}</p>;
}

export default function OnboardingRoomsPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RoomsFormInput>({
    resolver: zodResolver(roomsFormSchema) as Resolver<RoomsFormInput>,
    defaultValues: {
      mode: "auto",
      floors: 3,
      roomsPerFloor: 10,
      startNumber: 101,
    },
  });

  const watched = useWatch({ control });
  const mode = watched.mode ?? "auto";
  const floors = Number(watched.floors) || 0;
  const roomsPerFloor = Number(watched.roomsPerFloor) || 0;
  const startNumber = Number(watched.startNumber) || 101;

  async function onSubmit(_data: RoomsFormInput): Promise<void> {
    // API call createrooms
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard");
  }

  return (
    <AuthLayout>
      <OnboardingStepper steps={steps} />

      <AuthCard>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <DoorOpen className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Set up your rooms
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              How would you like to create rooms for this property?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="space-y-2">
            <ModeCard
              selected={mode === "auto"}
              onClick={() =>
                setValue("mode", "auto", { shouldValidate: true })
              }
              icon={Wand2}
              title="Auto-generate rooms"
              description="Specify floors and rooms per floor. We'll generate everything instantly."
            />
            <ModeCard
              selected={mode === "manual"}
              onClick={() =>
                setValue("mode", "manual", { shouldValidate: true })
              }
              icon={ClipboardList}
              title="Create manually later"
              description="Skip for now and add rooms one by one from the dashboard."
            />
          </div>

          {mode === "auto" && (
            <div className="space-y-4 pt-1">
              <div className="border-t border-zinc-100 dark:border-zinc-800" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Room configuration
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="floors" className="text-sm font-medium">
                    Floors
                  </Label>
                  <Input
                    id="floors"
                    type="number"
                    min={1}
                    max={50}
                    placeholder="3"
                    aria-invalid={!!errors.floors}
                    {...register("floors")}
                    className={
                      errors.floors
                        ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                        : ""
                    }
                  />
                  <FieldError message={errors.floors?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="roomsPerFloor" className="text-sm font-medium">
                    Rooms / floor
                  </Label>
                  <Input
                    id="roomsPerFloor"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="10"
                    aria-invalid={!!errors.roomsPerFloor}
                    {...register("roomsPerFloor")}
                    className={
                      errors.roomsPerFloor
                        ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                        : ""
                    }
                  />
                  <FieldError message={errors.roomsPerFloor?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="startNumber" className="text-sm font-medium">
                    Start at
                  </Label>
                  <Input
                    id="startNumber"
                    type="number"
                    min={1}
                    placeholder="101"
                    aria-invalid={!!errors.startNumber}
                    {...register("startNumber")}
                    className={
                      errors.startNumber
                        ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                        : ""
                    }
                  />
                  <FieldError message={errors.startNumber?.message} />
                </div>
              </div>

              {floors > 0 && roomsPerFloor > 0 && (
                <RoomPreview
                  floors={floors}
                  roomsPerFloor={roomsPerFloor}
                  startNumber={startNumber}
                />
              )}
            </div>
          )}

          {mode === "manual" && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-4 flex items-start gap-3">
              <ClipboardList className="w-[18px] h-[18px] text-zinc-400 dark:text-zinc-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  You can add rooms later
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-relaxed">
                  Go to{" "}
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">
                    Dashboard → Rooms → Add Room
                  </span>{" "}
                  to create rooms individually or in bulk after setup.
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1" />

          <WizardFooter
            backHref="/onboarding/property"
            backLabel="Property"
            submitLabel="Finish Setup"
            loading={isSubmitting}
          />
        </form>
      </AuthCard>

      <p className="text-xs text-center text-zinc-400 dark:text-zinc-500 mt-5">
        Rooms can be edited, added, or removed from the dashboard anytime.
      </p>
    </AuthLayout>
  );
}