"use client";

import { useState } from "react";
import { SettingsCard, Toggle, SaveButton } from "./settings-ui";

export function NotificationSettings() {
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [billingRun, setBillingRun] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(true);
  const [overdueAlert, setOverdueAlert] = useState(true);
  const [tenantJoined, setTenantJoined] = useState(true);
  const [leaseExpiry, setLeaseExpiry] = useState(true);
  const [maintenanceRequest, setMaintenanceRequest] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(true);

  return (
    <div className="space-y-4">
      <SettingsCard
        title="Notification channels"
        description="Choose how you want to receive alerts."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Changes apply immediately
            </p>
            <SaveButton />
          </>
        }
      >
        <Toggle
          enabled={whatsapp}
          onChange={setWhatsapp}
          label="WhatsApp"
          description="Receive alerts and billing confirmations via WhatsApp"
        />
        <Toggle
          enabled={email}
          onChange={setEmail}
          label="Email"
          description="Get reports and summaries to your email inbox"
        />
        <Toggle
          enabled={sms}
          onChange={setSms}
          label="SMS"
          description="Text message alerts for critical events"
        />
      </SettingsCard>

      <SettingsCard
        title="Activity notifications"
        description="Pick which events trigger a notification."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Only enabled channels will be used
            </p>
            <SaveButton />
          </>
        }
      >
        <Toggle
          enabled={billingRun}
          onChange={setBillingRun}
          label="Auto-billing completed"
          description="When the monthly billing engine finishes running"
        />
        <Toggle
          enabled={paymentReceived}
          onChange={setPaymentReceived}
          label="Payment received"
          description="When a tenant records or makes a payment"
        />
        <Toggle
          enabled={overdueAlert}
          onChange={setOverdueAlert}
          label="Overdue payment alert"
          description="When a tenant's payment passes the due date"
        />
        <Toggle
          enabled={tenantJoined}
          onChange={setTenantJoined}
          label="New tenant joined"
          description="When a tenant is added to a property"
        />
        <Toggle
          enabled={leaseExpiry}
          onChange={setLeaseExpiry}
          label="Lease expiry reminder"
          description="30 days before a tenant's lease ends"
        />
        <Toggle
          enabled={maintenanceRequest}
          onChange={setMaintenanceRequest}
          label="Maintenance request"
          description="When a tenant raises a maintenance complaint"
        />
      </SettingsCard>

      <SettingsCard
        title="Digest & reports"
        description="Scheduled summaries sent to your inbox."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Sent via email only
            </p>
            <SaveButton />
          </>
        }
      >
        <Toggle
          enabled={weeklyDigest}
          onChange={setWeeklyDigest}
          label="Weekly digest"
          description="Every Monday — occupancy, collections, and pending dues"
        />
        <Toggle
          enabled={monthlyReport}
          onChange={setMonthlyReport}
          label="Monthly report"
          description="On the 2nd of each month — full revenue and expense breakdown"
        />
      </SettingsCard>
    </div>
  );
}
