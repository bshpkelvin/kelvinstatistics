import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/insights")({
  component: InsightsLayout,
});

function InsightsLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}