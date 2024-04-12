import { SkeletonCard } from "./SkeletonCard";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 p-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className="flex justify-center">
            <SkeletonCard />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonLoader;
