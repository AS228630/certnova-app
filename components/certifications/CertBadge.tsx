export default function CertBadge({ code, size = "sm" }: { code: string; size?: "sm" | "lg" }) {
  const dimension = size === "lg" ? "h-16 w-16 text-xs" : "h-12 w-12 text-[10px]";
  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center bg-gradient-to-br from-primary to-primary-dark font-extrabold leading-none text-white shadow-sm`}
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      {code}
    </div>
  );
}
