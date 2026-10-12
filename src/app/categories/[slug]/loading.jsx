import { CategoryPageSkeleton, NavlinksSkeleton, HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <NavlinksSkeleton />
      <CategoryPageSkeleton />
      <FooterSkeleton />
    </div>
  );
}