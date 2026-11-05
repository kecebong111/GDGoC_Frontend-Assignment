import type { Metadata } from "next";
import AboutPage from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the student community behind Google Developer Groups on Campus at Universitas Gadjah Mada.",
};

export default function Page() {
  return <AboutPage />;
}