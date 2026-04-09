import { useState, useEffect } from "react";
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
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const currentLogo = isDark ? whitelogo : logoBlack;

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-3 sm:py-4" dir="rtl">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="pill-nav flex h-14 items-center justify-between px-5 sm:h-16 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={currentLogo} alt="Toby Music" className="h-9 w-auto sm:h-10" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary/15 text-primary"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-all hover:bg-primary/10"
              aria-label="החלף ערכת נושא"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            <Button
              asChild
              className="hidden rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground transition-all hover:scale-105 hover:bg-accent/90 md:flex"
            >
              <Link to="/contact">צור קשר</Link>
            </Button>

            <button
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="תפריט"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-2 animate-fade-in rounded-2xl border border-border bg-card p-4 shadow-soft md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 w-full rounded-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
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
