import type { Metadata } from "next";
import { PortalDemo } from "@/components/demo/portal-demo";

export const metadata: Metadata = {
  title: "Customer portal demo | Nomba Subscription Engine",
  description:
    "A live, clickable walkthrough of the customer portal: view a plan, switch plans with real proration, pause, cancel, reactivate.",
};

export default function PortalDemoPage() {
  return <PortalDemo />;
}
