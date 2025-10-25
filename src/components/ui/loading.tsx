import { cn } from "@/lib/utils";

export default function Loading({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) {
  return (
    <span
      className={cn(
        "loading self-center my-4 loading-dots",
        variant ? `loading-${variant}` : "loading-xl",
        className
      )}
    ></span>
  );
}
