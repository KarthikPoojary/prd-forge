function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-neutral-800 ${className}`} />;
}

export function PrdSkeleton({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <div className="px-5 py-3 border-b border-neutral-800">
        <Pulse className="h-3 w-8" />
      </div>
      <div className="px-5 py-4 space-y-3">
        <p className="text-sm text-neutral-400 animate-pulse">{message}</p>
        <Pulse className="h-5 w-48 mt-4" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
        <Pulse className="h-3 w-4/5" />
        <Pulse className="h-4 w-40 mt-4" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-3/4" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-4 w-32 mt-4" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
      </div>
    </div>
  );
}

export function CritiqueSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <div className="px-5 py-3 border-b border-neutral-800">
        <Pulse className="h-3 w-20" />
      </div>
      <div className="px-5 py-4 space-y-3">
        <Pulse className="h-3 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Pulse className="h-5 w-7 shrink-0" />
            <div className="flex-1 space-y-1">
              <Pulse className="h-3 w-32" />
              <Pulse className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
