"use client";

import { Sidebar } from "../../components/sidebar";
import { useProtectedPage } from "../../components/protected-page";

export default function AddAssetsPage() {
  const session = useProtectedPage();

  if (!session) {
    return null;
  }

  return (
    <main className="dashboard-layout">
      <Sidebar user={session.user} />
      <h1>Add Assets</h1>
    </main>
  );
}
