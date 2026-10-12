import { MarqueeSkeleton, HeroSkeleton, ProductSectionSkeleton, NavlinksSkeleton, HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <NavlinksSkeleton />
      <MarqueeSkeleton />
      <HeroSkeleton />
      <div className="container mx-auto max-w-6xl space-y-12 sm:space-y-14 px-4 sm:px-6">
        <ProductSectionSkeleton count={4} />
        <ProductSectionSkeleton count={4} />
        <ProductSectionSkeleton count={8} />
      </div>
      <FooterSkeleton />
    </div>
  );
}