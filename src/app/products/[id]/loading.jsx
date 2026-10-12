import { ProductDetailSkeleton, NavlinksSkeleton, HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <NavlinksSkeleton />
      <ProductDetailSkeleton />
      <FooterSkeleton />
    </div>
  );
}