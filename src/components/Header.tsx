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
          className="w-[88vw] sm:max-w-md p-0 border-r border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-6 pt-6 pb-4 flex-row items-center justify-between space-y-0">
              <div className="text-left">
                <SheetTitle className="text-base font-semibold tracking-tight">
                  Navigate
                </SheetTitle>
                <SheetDescription className="text-xs">
                  Explore the portfolio
                </SheetDescription>
              </div>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 rounded-full hover:bg-muted hover:gap-2 transition-all group"
                  aria-label="Close menu"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  <span className="text-xs font-medium">Back</span>
                </Button>
              </SheetClose>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-4 pb-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, idx) => {
                  const active =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.to);
                  return (
                    <li
                      key={item.to}
                      className="animate-fade-up"
                      style={{ animationDelay: `${60 + idx * 35}ms` }}
                    >
                      <Link
                        to={item.to}
                        className={cn(
                          "group relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden",
                          active
                            ? "bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]"
                            : "text-foreground/80 hover:text-foreground hover:bg-muted hover:translate-x-1",
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-all duration-300",
                              active
                                ? "bg-primary-foreground scale-110"
                                : "bg-muted-foreground/40 group-hover:bg-accent group-hover:scale-125",
                            )}
                          />
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "text-xs opacity-0 -translate-x-2 transition-all duration-300",
                            !active && "group-hover:opacity-60 group-hover:translate-x-0",
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

            <div className="px-6 py-5 border-t border-border">
              <Button asChild className="w-full rounded-full" size="lg">
                <Link to="/contact">Hire Me</Link>
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Kelvin Wambua · M&E · Data · Impact
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
