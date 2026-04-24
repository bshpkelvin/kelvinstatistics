import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, MessageCircle, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[var(--gradient-soft)]">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-hero)] text-primary-foreground font-bold">
              KW
            </div>
            <div>
              <p className="font-semibold text-foreground">Kelvin Wambua</p>
              <p className="text-xs text-muted-foreground">M&E Specialist · Data Analyst</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Turning data into impact for resilient communities. Based in Nairobi, Kenya — working
            across humanitarian, development, and research sectors.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/254798592946"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="mailto:bshpkelvin@gmail.com"
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/experience" className="hover:text-primary transition-colors">Experience</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/ngo" className="hover:text-primary transition-colors">Hope for Kibera</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-accent" />
              Nairobi, Kenya
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-accent" />
              bshpkelvin@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 mt-0.5 text-accent" />
              +254 798 592 946
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-prose py-5 flex flex-col sm:flex-row gap-2 justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kelvin Wambua. All rights reserved.</p>
          <p>Designed with purpose in Nairobi 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
}
