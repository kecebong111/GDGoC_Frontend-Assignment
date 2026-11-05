import "server-only";
import { API_BASE_URL, parseItems, type ApiItem, type Endpoint } from "./api-response";

export type { Endpoint } from "./api-response";
export type Item = ApiItem;

export async function getItems(endpoint: Endpoint): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`API ${endpoint}: HTTP ${response.status}`);
  return parseItems(await response.json(), endpoint);
}
