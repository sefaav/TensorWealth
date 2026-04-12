export type AuthUser = {
  id: number;
  first_name: string;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  first_name: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function post<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { detail?: string }
      | null;

    throw new Error(errorBody?.detail ?? "An error occurred.");
  }

  return (await response.json()) as T;
}

export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return post<AuthResponse>("/api/auth/login", payload);
}

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return post<AuthResponse>("/api/auth/register", payload);
}
