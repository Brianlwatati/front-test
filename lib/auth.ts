export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  accessToken?: string;
  user?: {
    id?: string;
    email?: string;
  };
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof json === "object" && json !== null && "message" in json
        ? String((json as { message?: string }).message ?? "Login failed")
        : "Login failed"
    );
  }

  return json as LoginResponse;
}

export async function registerUser(payload: RegisterPayload): Promise<LoginResponse> {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof json === "object" && json !== null && "message" in json
        ? String((json as { message?: string }).message ?? "Registration failed")
        : "Registration failed"
    );
  }

  return json as LoginResponse;
}
