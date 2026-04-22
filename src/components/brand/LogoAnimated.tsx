import { useEffect, useState } from "react";
import logoWhite from "@/assets/whitelogo.png";
import logoBlack from "@/assets/homepage/brand/logo-black.jpg";

interface LogoAnimatedProps {
  isDark: boolean;
  className?: string;
  /** "sm" = header size  |  "md" = section  |  "lg" = hero/splash */
  size?: "sm" | "md" | "lg";
  /** Skip the reveal animation and only apply the breathing glow */
  pulseOnly?: boolean;
}

const sizeClasses = {
  sm: "h-9 sm:h-10",
  md: "h-14 sm:h-16",
  lg: "h-20 sm:h-24 md:h-32",
};

const LogoAnimated = ({
  isDark,
  className = "",
  size = "sm",
  pulseOnly = false,
}: LogoAnimatedProps) => {
  const [revealed, setRevealed] = useState(pulseOnly);

  useEffect(() => {
    if (pulseOnly) return;
    const id = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(id);
  }, [pulseOnly]);

  const src = isDark ? logoWhite : logoBlack;

  return (
    <span
      className={[
        "logo-animated",
        revealed ? "logo-revealed" : "logo-pre-reveal",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={src}
        alt="Toby Music"
        className={`${sizeClasses[size]} w-auto object-contain`}
        draggable={false}
      />
    </span>
  );
};

export default LogoAnimated;
