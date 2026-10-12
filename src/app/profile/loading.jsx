import { ProfileSkeleton, NavlinksSkeleton, HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeaderSkeleton />
      <NavlinksSkeleton />
      <ProfileSkeleton />
      <FooterSkeleton />
    </div>
  );
}