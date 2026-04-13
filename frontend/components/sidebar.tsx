"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import type { AuthUser } from "../lib/api";
import { clearStoredSession } from "../lib/session";

type SidebarProps = {
  user: AuthUser;
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
}: {
  item: NavigationItem;
  isActive: boolean;
}) {
  const className = isActive ? "sidebar-nav-item active" : "sidebar-nav-item";

  return (
    <Link className={className} href={item.href}>
      {item.label}
    </Link>
  );
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  return (
    <aside className="sidebar-panel" aria-label="Primary navigation">
      <div className="sidebar-content">
        <header>
          <h1 className="sidebar-title">Tensor Wealth</h1>
        </header>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <SidebarNavigationItem
              key={item.label}
              item={item}
              isActive={item.href === pathname}
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
