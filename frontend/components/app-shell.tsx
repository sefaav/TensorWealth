"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import type { AuthUser } from "../lib/api";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  user: AuthUser;
  children: ReactNode;
};

export function AppShell({ user, children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  const shellClassName = isSidebarOpen ? "app-shell sidebar-open" : "app-shell";

  return (
    <main className={shellClassName}>
      <button
        className="ghost-button app-sidebar-toggle"
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-expanded={isSidebarOpen}
        aria-controls="primary-sidebar"
      >
        Menu
      </button>

      <div
        className="app-shell-overlay"
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <section className="app-content">{children}</section>
    </main>
  );
}
