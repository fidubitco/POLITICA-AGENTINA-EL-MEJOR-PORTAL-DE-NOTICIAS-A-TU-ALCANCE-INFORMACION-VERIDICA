export default function PostCardSkeleton() {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800 rounded-xl animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[16/9] bg-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="h-6 w-24 bg-zinc-700/50 rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-zinc-800/50 rounded-md w-full" />
          <div className="h-6 bg-zinc-800/50 rounded-md w-4/5" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-zinc-800/30 rounded-md w-full" />
          <div className="h-4 bg-zinc-800/30 rounded-md w-full" />
          <div className="h-4 bg-zinc-800/30 rounded-md w-3/4" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
          <div className="h-3 bg-zinc-800/30 rounded-md w-20" />
          <div className="h-3 bg-zinc-800/30 rounded-md w-20" />
        </div>
      </div>
    </div>
  );
}
