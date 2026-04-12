import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import whitelogo from "@/assets/whitelogo.png";
import logoBlack from "@/assets/homepage/brand/logo-black.jpg";

const NAV_LINKS = [
  { label: "בית", href: "/" },
  { label: "תזמורות", href: "/orchestras" },
  { label: "הופעות", href: "/performances" },
  { label: "תלמידות", href: "/students" },
  { label: "תווים", href: "/sheets" },
  { label: "אודות", href: "/about" },
  { label: "בלוג", href: "/blog" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    document.documentElement.style.colorScheme = shouldBeDark ? "dark" : "light";
  }, []);

  const applyTheme = (darkMode: boolean) => {
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  const toggleTheme = () => {
    applyTheme(!isDark);
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const currentLogo = isDark ? whitelogo : logoBlack;

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-3 sm:py-4" dir="rtl">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="pill-nav flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-none"
          >
            <img
              src={currentLogo}
              alt="Toby Music"
              className="h-9 w-auto rounded-md object-contain sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/18 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.18)]"
                      : "text-muted-foreground hover:bg-secondary/75 hover:text-foreground",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "עבור למצב יום" : "עבור למצב לילה"}
              aria-pressed={isDark}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground shadow-soft hover:border-primary/30 hover:bg-secondary/70"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
              )}
            </button>

            <Button
              asChild
              className="hidden rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground shadow-soft hover:bg-accent/92 hover:shadow-hover md:flex"
            >
              <Link to="/contact">צור קשר</Link>
            </Button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground hover:bg-secondary/70 md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="תפריט"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-2 animate-fade-in overflow-hidden rounded-3xl border border-border/80 bg-card/96 p-4 shadow-hover backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/16 text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    ].join(" ")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Button
                asChild
                className="mt-2 w-full rounded-full bg-accent font-semibold text-accent-foreground hover:bg-accent/92"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  צור קשר
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
