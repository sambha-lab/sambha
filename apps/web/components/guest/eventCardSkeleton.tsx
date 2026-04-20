function EventCardSkeleton() {
  return (
    <div className="border border-gray-300 rounded-xl p-4 w-72 h-32 flex gap-3 flex-col sm:flex-row">
      <div className="h-24 w-36 bg-gray-300 animate-pulse rounded-md transition-all duration-300 ease-in-out" />
      <div className="flex flex-col justify-center gap-2 w-full">
        <div className=" py-[10px] rounded-full w-20 bg-gray-300 animate-pulse " />
        <div className=" py-[10px] rounded-full  bg-gray-300 animate-pulse " />
        <div className=" py-[10px] rounded-full w-28 bg-gray-300 animate-pulse " />
      </div>
    </div>
  );
}
export default EventCardSkeleton;
