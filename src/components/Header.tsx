import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/tools", label: "Tools" },
  { to: "/insights", label: "Insights" },
  { to: "/certifications", label: "Certifications" },
  { to: "/ngo", label: "Hope for Kibera" },
  { to: "/gallery", label: "Gallery" },
  { to: "/guestbook", label: "Guestbook" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-[var(--shadow-soft)]"
          : "bg-transparent",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        {/* Left: menu + theme toggle */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-full hover:bg-muted transition-all hover:scale-105"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted transition-all hover:scale-105"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Center/Right: brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold leading-tight text-foreground">Kelvin Wambua</p>
            <p className="text-[11px] text-muted-foreground leading-tight">M&E · Data · Impact</p>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-hero)] text-primary-foreground font-bold shadow-[var(--shadow-soft)]">
            KW
          </div>
        </Link>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-[88vw] sm:max-w-md p-0 border-r border-white/10 bg-slate-950/70 dark:bg-slate-950/75 backdrop-blur-md text-white [&>button.absolute]:hidden"
        >
          {/* Ambient glow accents */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
          </div>

          <div className="relative flex flex-col h-full">
            <SheetHeader className="px-6 pt-6 pb-5 flex-row items-center justify-between space-y-0 border-b border-white/10">
              <div className="text-left">
                <SheetTitle className="text-lg font-semibold tracking-tight text-white">
                  Navigate
                </SheetTitle>
                <SheetDescription className="text-xs text-white/50">
                  Explore the portfolio
                </SheetDescription>
              </div>
              <SheetClose asChild>
                <button
                  aria-label="Close menu"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white/90 hover:text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(125,211,252,0.35)] backdrop-blur-sm"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                  <span>Back</span>
                </button>
              </SheetClose>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col">
                {navItems.map((item, idx) => {
                  const active =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.to);
                  return (
                    <li
                      key={item.to}
                      className="opacity-0 animate-fade-up border-b border-white/5 last:border-b-0"
                      style={{
                        animationDelay: `${80 + idx * 55}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <Link
                        to={item.to}
                        className={cn(
                          "group relative flex items-center justify-between px-3 py-4 text-[15px] font-medium transition-all duration-200 transform hover:translate-x-1",
                          active
                            ? "text-sky-400"
                            : "text-white/70 hover:text-sky-300",
                        )}
                      >
                        <span className="relative">
                          {item.label}
                          <span
                            className={cn(
                              "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-sky-400 to-transparent transition-all duration-300",
                              active ? "w-10" : "w-0 group-hover:w-8",
                            )}
                          />
                        </span>
                        <span
                          className={cn(
                            "text-sky-400 text-sm opacity-0 -translate-x-2 transition-all duration-200",
                            active
                              ? "opacity-100 translate-x-0"
                              : "group-hover:opacity-70 group-hover:translate-x-0",
                          )}
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-6 py-5 border-t border-white/10">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-400/40"
              >
                <Link to="/contact">Hire Me</Link>
              </Button>
              <p className="mt-3 text-center text-[10px] tracking-wide text-white/40">
                Kelvin Wambua • M&E • Data • Impact
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
