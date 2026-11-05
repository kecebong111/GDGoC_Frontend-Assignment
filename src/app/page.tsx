import HomePage from "@/components/home/home-page";
import { ApiRenderBoundary } from "@/components/ui/api-data";

export default function Home() {
  return <ApiRenderBoundary><HomePage /></ApiRenderBoundary>;
}
