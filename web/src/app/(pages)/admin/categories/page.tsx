"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/api-client";
import { useRouter } from "next/navigation";

import "@/styles/admin-categories.css"; // Import the new CSS file
import { CategoriesManager } from "./components/categories-manager";
import HeartLoading from "@/components/HeartLoading/HeartLoading";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated before rendering
    if (!isAuthenticated()) {
      router.push("/login?redirect=/admin/categories");
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
    <div className="responsive-container">
      <CategoriesManager />
    </div>
  );
}
