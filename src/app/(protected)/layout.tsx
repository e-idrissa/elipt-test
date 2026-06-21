"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingPage from "../loading";
import { Siteheader } from "@/components/global/site-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!Cookies.get("auth_token");
  });

  const [loading, setLoading] = useState<boolean>(() => {
    return !Cookies.get("auth_token");
  });

  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      router.replace("/signin");
    }
  }, [router]);

  if (loading && !isAuthenticated) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) return null;

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="min-h-full flex flex-col mx-64">
        <Siteheader />
        {children}
      </div>
    </div>
  );
}
