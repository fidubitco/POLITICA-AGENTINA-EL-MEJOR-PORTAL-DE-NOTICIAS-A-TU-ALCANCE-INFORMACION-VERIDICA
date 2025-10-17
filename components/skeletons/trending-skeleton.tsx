export default function TrendingSkeleton() {
  return (
    <div className="space-y-5">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="animate-pulse">
          <div className="flex gap-4">
            {/* Number badge */}
            <div className="flex-shrink-0 w-12 h-12 bg-zinc-800/50 rounded-xl" />

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-zinc-800/30 rounded-md w-16" />
              <div className="space-y-1">
                <div className="h-4 bg-zinc-800/50 rounded-md w-full" />
                <div className="h-4 bg-zinc-800/50 rounded-md w-5/6" />
                <div className="h-4 bg-zinc-800/50 rounded-md w-4/6" />
              </div>
              <div className="h-3 bg-zinc-800/30 rounded-md w-20" />
            </div>
          </div>
          {index < 5 && <div className="h-px bg-zinc-800 mt-5" />}
        </div>
      ))}
    </div>
  );
}
