"use client";

import { AppShell } from "../../components/app-shell";
import { useProtectedPage } from "../../components/protected-page";

export default function DashboardPage() {
  const session = useProtectedPage();

  if (!session) {
    return null;
  }

  return (
    <AppShell user={session.user}>
      <h1 className="page-title">Dashboard</h1>
    </AppShell>
  );
}
