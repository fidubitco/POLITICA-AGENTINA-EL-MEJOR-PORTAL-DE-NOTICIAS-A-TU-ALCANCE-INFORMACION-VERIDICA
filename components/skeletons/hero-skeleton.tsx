export default function HeroSkeleton() {
  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[650px] flex items-end bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800 animate-pulse">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="relative p-8 md:p-16 z-10 w-full space-y-6">
        {/* Badges */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-zinc-800/50 rounded-lg" />
          <div className="h-10 w-24 bg-zinc-800/30 rounded-lg" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <div className="h-12 md:h-16 bg-zinc-800/50 rounded-lg w-full" />
          <div className="h-12 md:h-16 bg-zinc-800/50 rounded-lg w-5/6" />
          <div className="h-12 md:h-16 bg-zinc-800/50 rounded-lg w-4/6" />
        </div>

        {/* Excerpt */}
        <div className="space-y-3 max-w-5xl">
          <div className="h-6 bg-zinc-800/30 rounded-md w-full" />
          <div className="h-6 bg-zinc-800/30 rounded-md w-full" />
          <div className="h-6 bg-zinc-800/30 rounded-md w-3/4" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-8">
          <div className="h-5 bg-zinc-800/30 rounded-md w-32" />
          <div className="h-5 bg-zinc-800/30 rounded-md w-28" />
          <div className="h-5 bg-zinc-800/30 rounded-md w-28" />
        </div>
      </div>
    </div>
  );
}
