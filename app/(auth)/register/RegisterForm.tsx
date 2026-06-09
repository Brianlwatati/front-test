"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser, type RegisterPayload, type LoginResponse } from "@/lib/auth";

type RegisterFormValues = RegisterPayload;

export default function RegisterForm() {
  const [registerResult, setRegisterResult] = useState<LoginResponse | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ mode: "onTouched" });

  const onSubmit = async (values: RegisterFormValues) => {
    setRegisterError(null);
    setRegisterResult(null);

    try {
      const response = await registerUser(values);
      setRegisterResult(response);
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-blue-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Student Enrollment</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Register</h1>
          <p className="mt-2 text-sm text-slate-500">Create your account to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">First Name</span>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Last Name</span>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="name@example.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Registering…" : "Register"}
          </button>
        </form>

        {registerError ? (
          <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            <p className="text-sm font-medium text-rose-900">Registration failed</p>
            <p className="mt-2 text-sm">{registerError}</p>
          </div>
        ) : null}

        {registerResult ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <p className="text-sm font-medium text-slate-900">Registration response</p>
            <pre className="mt-3 overflow-x-auto text-xs text-slate-600">
              {JSON.stringify(registerResult, null, 2)}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
