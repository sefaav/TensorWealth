"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { clearStoredSession, readStoredSession } from "../../lib/session";

export default function DashboardPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = readStoredSession();

    if (!session) {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [router]);

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  if (!isReady) {
    return null;
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card">
        <div>
          <p className="dashboard-kicker">TensorWealth</p>
          <h1>Dashboard</h1>
        </div>
        <button className="ghost-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}
