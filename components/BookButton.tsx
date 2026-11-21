import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "text";
  tone?: "on-dark" | "on-light";
  className?: string;
};

export function BookButton({
  children = "Book a 20-minute call",
  href = "/contact#book",
  variant = "solid",
  tone = "on-dark",
  className = "",
}: Props) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-5 text-center text-[0.82rem] font-semibold tracking-[0.08em] uppercase no-underline transition";
  const styles = {
    solid: "bg-gold-bright text-ink hover:bg-gold",
    outline:
      tone === "on-dark"
        ? "border border-paper/40 text-paper hover:border-gold-bright hover:text-gold-bright"
        : "border border-ink/30 text-ink hover:border-ink",
    text:
      tone === "on-dark"
        ? "px-0 text-gold-bright underline decoration-gold/50 underline-offset-4 hover:decoration-gold-bright"
        : "px-0 text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
