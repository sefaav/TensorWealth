"use client";

import { AppShell } from "../../components/app-shell";
import { useProtectedPage } from "../../components/protected-page";

export default function BudgetPage() {
  const session = useProtectedPage();

  if (!session) {
    return null;
  }

  return (
    <AppShell user={session.user}>
      <h1 className="page-title">Budget</h1>
    </AppShell>
  );
}
