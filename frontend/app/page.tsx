"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  loginUser,
  registerUser,
  type RegisterPayload,
} from "../lib/api";
import { readStoredSession, writeStoredSession } from "../lib/session";

type AuthMode = "login" | "register";

type AuthFormState = {
  firstName: string;
  email: string;
  password: string;
};

const initialFormState: AuthFormState = {
  firstName: "",
  email: "",
  password: "",
};

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<AuthFormState>(initialFormState);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (readStoredSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const submitLabel = mode === "register" ? "Create Account" : "Login";

  function updateField(field: keyof AuthFormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || isSubmitting) {
      return;
    }

    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    event.preventDefault();
    event.currentTarget.requestSubmit();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response =
        mode === "register"
          ? await registerUser({
              first_name: form.firstName.trim(),
              email: form.email.trim(),
              password: form.password,
            } satisfies RegisterPayload)
          : await loginUser({
              email: form.email.trim(),
              password: form.password,
            });

      writeStoredSession(response);
      setForm(initialFormState);
      router.push("/dashboard");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "An error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <span className="eyebrow">TensorWealth</span>
        <h1>See your entire wealth. Think like a quant.</h1>
        <p className="hero-copy">
          Connect your accounts, track your assets, analyze performance, 
          and make smarter financial decisions from one intelligent dashboard.
        </p>

        <div className="feature-grid">
          <article className="feature-card">
            <h2>All your assets in one place</h2>
            <p>Connect bank accounts, investments, crypto and more for a complete view of your wealth</p>
          </article>
          <article className="feature-card">
            <h2>Advanced portfolio insights</h2>
            <p>Track performance, risk, allocation and historical growth with institutional-grade analytics.</p>
          </article>
          <article className="feature-card">
            <h2>Smarter financial decisions</h2>
            <p>Use intelligent tools to optimize your portfolio and plan your next moves with confidence.</p>
          </article>
        </div>
      </section>

      <section className="auth-card">
        <div className="mode-switch" role="tablist" aria-label="Mode of authentication">
          <button
            type="button"
            className={mode === "login" ? "mode-button active" : "mode-button"}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "mode-button active" : "mode-button"}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          onKeyDown={handleFormKeyDown}
        >
          {mode === "register" ? (
            <label className="field">
              <span>First Name</span>
              <input
                type="text"
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                placeholder="John"
                minLength={2}
                enterKeyHint="next"
                required
              />
            </label>
          ) : null}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@exemple.com"
              enterKeyHint="next"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              enterKeyHint={mode === "register" ? "done" : "go"}
              required
            />
          </label>

          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : submitLabel}
          </button>
        </form>

        {feedback ? <p className="feedback">{feedback}</p> : null}
      </section>
    </main>
  );
}
