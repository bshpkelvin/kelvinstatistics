import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Linkedin, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { sendContactEmail } from "@/lib/contact.functions";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kelvin Wambua — M&E Specialist in Nairobi, Kenya" },
      { name: "description", content: "Get in touch with Kelvin Wambua for M&E consulting, data analysis, and humanitarian collaborations. Based in Nairobi, Kenya." },
      { property: "og:title", content: "Contact — Kelvin Wambua" },
      { property: "og:description", content: "Reach out for collaborations, consulting and partnership opportunities." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const sendEmail = useServerFn(sendContactEmail);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      await sendEmail({ data: result.data });
      toast.success("Thanks! Your message has been sent. I'll reply within 24 hours.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send right now. Please email bshpkelvin@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Get In Touch"
            title={<>Let's start a <span className="gradient-text">conversation</span></>}
            description="Whether it's an M&E project, a data analysis brief, or a partnership for Hope for Kibera — I'd love to hear from you."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-up">
            <Card className="p-6 md:p-8 border-border">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Project enquiry, collaboration, etc." required maxLength={150} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell me a bit about your project or idea..." required rows={6} maxLength={2000} />
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Card className="p-6 border-border hover-lift">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href="mailto:bshpkelvin@gmail.com" className="font-semibold text-foreground hover:text-primary">bshpkelvin@gmail.com</a>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-border hover-lift">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a href="tel:+254798592946" className="font-semibold text-foreground hover:text-primary">+254 798 592 946</a>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-border hover-lift">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-border bg-[var(--gradient-hero)] text-primary-foreground">
              <p className="text-xs uppercase tracking-wider opacity-80">Connect</p>
              <p className="mt-1 font-semibold">Find me online</p>
              <div className="mt-4 flex gap-3">
                <a href="https://linkedin.com" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://wa.me/254798592946" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="mailto:bshpkelvin@gmail.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
