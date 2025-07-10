const BenefitCardSkeleton = () => (
    <div className="rounded-2xl shadow-md p-6 min-w-[220px] max-w-[260px] flex flex-col items-center bg-white dark:bg-[#23242a] animate-pulse opacity-70">
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
  );
  
  export default BenefitCardSkeleton;
  