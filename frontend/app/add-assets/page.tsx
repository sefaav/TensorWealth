"use client";

import { AppShell } from "../../components/app-shell";
import { useProtectedPage } from "../../components/protected-page";

export default function AddAssetsPage() {
  const session = useProtectedPage();

  if (!session) {
    return null;
  }

  return (
    <AppShell user={session.user}>
      <h1 className="page-title">Add Assets</h1>
    </AppShell>
  );
}
