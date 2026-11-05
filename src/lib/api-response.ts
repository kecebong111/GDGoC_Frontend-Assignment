export type ApiItem = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  category: string;
  tagline: string;
  explore_link: string;
  step?: number;
};

export type Endpoint = "tracks" | "formats" | "faqs" | "values" | "journey" | "roles" | "inquiry-categories";

export const API_BASE_URL = "https://gdgoc-ugm-api.vercel.app/api";

export function parseItems(value: unknown, endpoint: Endpoint): ApiItem[] {
  if (!value || typeof value !== "object" || !("success" in value) || value.success !== true || !("data" in value) || !Array.isArray(value.data)) {
    throw new Error("The API returned an invalid response.");
  }
  const ids = new Set<string>();
  return value.data.map((row: unknown) => {
    if (!row || typeof row !== "object") throw new Error("The API returned an invalid item.");
    const item: Record<string, unknown> = Object.fromEntries(Object.entries(row));
    const title = endpoint === "tracks" || endpoint === "formats" ? item.name : endpoint === "faqs" ? item.question : endpoint === "inquiry-categories" ? item.label : item.title;
    const description = endpoint === "faqs" ? item.answer : item.description;
    if (typeof item.id !== "string" || !item.id.trim() || ids.has(item.id) || typeof title !== "string" || !title.trim() || typeof description !== "string") throw new Error("The API returned invalid fields.");
    ids.add(item.id);
    if (endpoint === "tracks" && (!Array.isArray(item.skills) || typeof item.tagline !== "string" || typeof item.explore_link !== "string" || !/^\/overview(?:\?|#|$)/.test(item.explore_link))) throw new Error("The API returned invalid track fields.");
    if (endpoint === "faqs" && typeof item.category !== "string") throw new Error("The API returned an invalid FAQ category.");
    if (endpoint === "journey" && (typeof item.step !== "number" || !Number.isInteger(item.step) || item.step < 1)) throw new Error("The API returned an invalid journey step.");
    if (item.skills !== undefined && (!Array.isArray(item.skills) || !item.skills.every((skill: unknown) => typeof skill === "string"))) throw new Error("The API returned invalid skills.");
    return { id: item.id, title, description, skills: Array.isArray(item.skills) ? item.skills.filter((skill: unknown): skill is string => typeof skill === "string") : [], tagline: typeof item.tagline === "string" ? item.tagline : "", category: typeof item.category === "string" ? item.category : "", explore_link: typeof item.explore_link === "string" ? item.explore_link : "", step: typeof item.step === "number" ? item.step : undefined };
  });
}
