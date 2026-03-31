"use client";

import { SettingsForm } from "@/modules/admin/components/settings-form";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import HeartLoading from "@/components/HeartLoading/HeartLoading";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login?redirect=/admin/settings");
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <HeartLoading size="medium" inline={true} />
      </div>
    );
  }

  return (
    <div
      className="responsive-container"
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SettingsForm />
    </div>
  );
}
