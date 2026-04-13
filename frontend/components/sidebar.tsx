"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import type { AuthUser } from "../lib/api";
import { clearStoredSession } from "../lib/session";

type SidebarProps = {
  user: AuthUser;
  isOpen?: boolean;
  onClose?: () => void;
};

type NavigationItem = {
  label: string;
  href: string;
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Budget", href: "/budget" },
  { label: "Analysis", href: "/analysis" },
  { label: "Add Assets", href: "/add-assets" },
];

function SidebarNavigationItem({
  item,
  isActive,
  onNavigate,
}: {
  item: NavigationItem;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const className = isActive ? "sidebar-nav-item active" : "sidebar-nav-item";

  return (
    <Link className={className} href={item.href} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function Sidebar({ user, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    onClose?.();
    clearStoredSession();
    router.replace("/");
  }

  const className = isOpen ? "sidebar-panel sidebar-panel-open" : "sidebar-panel";

  return (
    <aside
      id="primary-sidebar"
      className={className}
      aria-label="Primary navigation"
    >
      <div className="sidebar-content">
        <header className="sidebar-header">
          <h1 className="sidebar-title">Tensor Wealth</h1>
          <button
            className="ghost-button sidebar-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
          >
            Close
          </button>
        </header>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <SidebarNavigationItem
              key={item.label}
              item={item}
              isActive={item.href === pathname}
              onNavigate={onClose}
            />
          ))}
        </nav>
      </div>

      <footer className="sidebar-footer">
        <p className="sidebar-user-name">{user.first_name}</p>
        <button
          className="ghost-button sidebar-logout-button"
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </footer>
    </aside>
  );
}
