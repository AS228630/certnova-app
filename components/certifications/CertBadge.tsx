export default function CertBadge({ code, size = 48 }: { code: string; size?: number }) {
  const fontSize = size >= 56 ? 12 : 10;
  return (
    <div
      className="flex shrink-0 items-center justify-center bg-gradient-to-br from-primary to-primary-dark font-extrabold leading-none text-white shadow-sm"
      style={{
        width: size,
        height: size,
        fontSize,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {code}
    </div>
  );
}
