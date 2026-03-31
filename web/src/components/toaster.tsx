"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        bottom: "10px",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "90vw",
      }}
    >
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        onOpenChange,
        open,
        ...props
      }) {
        return (
          <div
            key={id}
            style={{
              backgroundColor:
                variant === "destructive"
                  ? "#fee2e2"
                  : variant === "success"
                  ? "#d1fae5"
                  : "#ffffff",
              color:
                variant === "destructive"
                  ? "#dc2626"
                  : variant === "success"
                  ? "#065f46"
                  : "#000000",
              border: `1px solid ${
                variant === "destructive"
                  ? "#dc2626"
                  : variant === "success"
                  ? "#10b981"
                  : "#d1d5db"
              }`,
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              position: "relative",
              opacity: 1,
              transform: "translateY(0)",
              transition: "all 0.3s ease",
              marginTop: "30%",
            }}
            onClick={() => onOpenChange?.(false)}
          >
            <div style={{ flex: 1 }}>
              {title && (
                <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                  {title}
                </div>
              )}
              {description && (
                <div style={{ fontSize: "14px", opacity: 0.9 }}>
                  {description}
                </div>
              )}
            </div>
            {action}
            <button
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "#6b7280",
                padding: "4px",
              }}
              onClick={() => dismiss(id)}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
