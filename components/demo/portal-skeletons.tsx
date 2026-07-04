import { Skeleton } from "@/components/ui/skeleton";

export type LoadableView = "home" | "subscription" | "choose-plan" | "confirm-plan";

function CardRowSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="ml-auto h-4 w-28" />
        <Skeleton className="ml-auto h-3 w-24" />
      </div>
    </div>
  );
}

function PaymentMethodSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-12 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
}

function InvoiceHistorySkeleton() {
  return (
    <div>
      <Skeleton className="mb-3 h-6 w-40" />
      <Skeleton className="mb-4 h-10 w-full rounded-md" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-gray-100 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="mb-3 h-6 w-24" />
        <CardRowSkeleton />
      </div>
      <PaymentMethodSkeleton />
      <InvoiceHistorySkeleton />
    </div>
  );
}

function SubscriptionSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5 h-4 w-16" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-3 h-4 w-64" />
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
      <div className="mt-8 rounded-lg border border-gray-200 p-5">
        <Skeleton className="mb-4 h-4 w-32" />
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="mt-8">
        <PaymentMethodSkeleton />
      </div>
    </div>
  );
}

function ChoosePlanSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5 h-4 w-16" />
      <Skeleton className="mb-5 h-6 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3 w-56" />
            <Skeleton className="mt-2 h-4 w-24" />
            <Skeleton className="mt-4 h-9 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmPlanSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5 h-4 w-16" />
      <Skeleton className="mb-5 h-6 w-28" />
      <div className="mb-5 rounded-lg border border-gray-200 p-5">
        <Skeleton className="mb-2 h-4 w-28" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-1 h-3 w-48" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>
      <div className="mb-5 rounded-lg border border-gray-200 p-5">
        <Skeleton className="mb-4 h-4 w-32" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="mt-3 flex justify-between">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );
}

export function PortalSkeleton({ view }: { view: LoadableView }) {
  switch (view) {
    case "home":
      return <HomeSkeleton />;
    case "subscription":
      return <SubscriptionSkeleton />;
    case "choose-plan":
      return <ChoosePlanSkeleton />;
    case "confirm-plan":
      return <ConfirmPlanSkeleton />;
  }
}
