import { ProductsPageSkeleton, NavlinksSkeleton, HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <NavlinksSkeleton />
      <ProductsPageSkeleton />
      <FooterSkeleton />
    </div>
  );
}