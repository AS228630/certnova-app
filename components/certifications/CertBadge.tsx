export default function CertBadge({ code }: { code: string }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-[10px] font-extrabold leading-none text-white shadow-sm"
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      {code}
    </div>
  );
}
