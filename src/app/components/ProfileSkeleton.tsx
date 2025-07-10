const ProfileSkeleton = () => (
    <div className="flex items-center gap-6 w-full">
      <div className="w-20 h-20 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-full animate-pulse mt-4" />
      </div>
    </div>
  );
  
  export default ProfileSkeleton;
  