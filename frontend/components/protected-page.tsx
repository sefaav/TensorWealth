"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { AuthResponse } from "../lib/api";
import { readStoredSession } from "../lib/session";

export function useProtectedPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const storedSession = readStoredSession();

    if (!storedSession) {
      router.replace("/");
      return;
    }

    setSession(storedSession);
  }, [router]);

  return session;
}
