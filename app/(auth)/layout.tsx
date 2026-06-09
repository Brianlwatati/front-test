import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Student Enrollment",
  description: "Authentication pages for the Student Enrollment application.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
