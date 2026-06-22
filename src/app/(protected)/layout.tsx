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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(false);
      router.replace("/signin");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const userId = Cookies.get("user_id");
  const fname = Cookies.get("user_fname");
  const lname = Cookies.get("user_lname");
  const avatar = Cookies.get("user_avatar");
  const email = Cookies.get("user_email");

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="min-h-full flex flex-col mx-64 px-4">
        <Siteheader
          email={email}
          fname={fname}
          lname={lname}
          avatar={avatar}
          userId={userId}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
