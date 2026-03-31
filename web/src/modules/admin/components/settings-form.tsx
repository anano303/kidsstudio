"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings, SiteSettings } from "../api/settings";
import HeartLoading from "@/components/HeartLoading/HeartLoading";
import "./settings-form.css";

export function SettingsForm() {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<SiteSettings>) => updateSettings(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: Partial<SiteSettings> = {
      messengerLink: formData.get("messengerLink") as string,
    };
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <HeartLoading size="medium" />
      </div>
    );
  }

  if (error || !data?.success) {
    return <div className="settings-error">პარამეტრების ჩატვირთვა ვერ მოხერხდა</div>;
  }

  const settings = data.data!;

  return (
    <div className="settings-container">
      <h2 className="settings-title">საიტის პარამეტრები</h2>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3 className="section-title">მესენჯერი</h3>

          <div className="settings-field">
            <label htmlFor="messengerLink">მესენჯერის ლინკი</label>
            <input
              type="text"
              id="messengerLink"
              name="messengerLink"
              defaultValue={settings.messengerLink}
              placeholder="https://m.me/your-page-id"
            />
            <span className="field-hint">
              მაგ: https://m.me/61574139157964
            </span>
          </div>
        </div>

        <div className="settings-actions">
          <button
            type="submit"
            className="settings-save-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "ინახება..." : "შენახვა"}
          </button>
          {saved && (
            <span className="settings-saved-msg">✓ წარმატებით შეინახა</span>
          )}
          {mutation.isError && (
            <span className="settings-error-msg">შენახვა ვერ მოხერხდა</span>
          )}
        </div>
      </form>
    </div>
  );
}
