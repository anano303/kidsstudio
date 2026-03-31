import { fetchWithAuth } from "@/lib/fetch-with-auth";

export interface SiteSettings {
  _id: string;
  messengerLink: string;
}

export async function getSettings(): Promise<{
  success: boolean;
  data?: SiteSettings;
  error?: string;
}> {
  try {
    const response = await fetchWithAuth("/settings");
    if (!response.ok) {
      return { success: false, error: "Failed to fetch settings" };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return { success: false, error: "Network error" };
  }
}

export async function updateSettings(
  settings: Partial<SiteSettings>
): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    const response = await fetchWithAuth("/settings", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      return { success: false, error: "Failed to update settings" };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Network error" };
  }
}
