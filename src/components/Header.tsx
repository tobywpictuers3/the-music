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
    <header className="sticky top-0 z-50 py-3 sm:py-4" dir="rtl">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 pill-nav px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img src={currentLogo} alt="Toby Music" className="h-9 sm:h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium rounded-full px-4 py-2 transition-all ${
                  isActive(link.href)
                    ? "bg-primary/15 text-primary"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/10 transition-all"
              aria-label="החלף ערכת נושא"
            >
              {isDark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-2 hover:scale-105 transition-all text-sm font-semibold">
              <Link to="/contact">צור קשר</Link>
            </Button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="תפריט"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-card border border-border p-4 shadow-soft animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium rounded-lg px-4 py-3 transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full w-full mt-2 font-semibold">
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
