import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { MessageCircle, Send, Loader2, Reply } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { submitComment, listVisibleComments } from "@/lib/comments.functions";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: "Guestbook — Kelvin Wambua" },
      { name: "description", content: "Leave a message or read what visitors are saying about Kelvin Wambua's M&E and data work." },
      { property: "og:title", content: "Guestbook — Kelvin Wambua" },
      { property: "og:description", content: "Sign the guestbook and share a note." },
    ],
  }),
  component: GuestbookPage,
});

type PublicComment = {
  id: string;
  created_at: string;
  sender_name: string;
  message_text: string;
  reply_text: string | null;
};

function GuestbookPage() {
  const submit = useServerFn(submitComment);
  const list = useServerFn(listVisibleComments);
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ sender_name: "", email: "", message_text: "" });

  const load = async () => {
    setLoading(true);
    try {
      const data = await list();
      setComments(data as PublicComment[]);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.sender_name.trim().length < 2 || form.message_text.trim().length < 3) {
      toast.error("Please add your name and a message.");
      return;
    }
    setSending(true);
    try {
      await submit({ data: form });
      toast.success("Thanks! Your message is pending review.");
      setForm({ sender_name: "", email: "", message_text: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageLayout>
      <section className="section-pad">
        <div className="container-prose max-w-3xl">
          <SectionHeading
            eyebrow="Guestbook"
            title={<>Leave a <span className="gradient-text">message</span></>}
            description="Say hi, share feedback, or drop a note. Messages appear once reviewed."
          />

          <Card className="mt-10 p-6 md:p-8 border-border">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name *"
                  value={form.sender_name}
                  onChange={(e) => setForm((f) => ({ ...f, sender_name: e.target.value }))}
                  maxLength={80}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  maxLength={200}
                />
              </div>
              <Textarea
                placeholder="Your message *"
                value={form.message_text}
                onChange={(e) => setForm((f) => ({ ...f, message_text: e.target.value }))}
                rows={5}
                maxLength={1500}
                required
              />
              <Button type="submit" disabled={sending} size="lg" className="w-full sm:w-auto">
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Sign the Guestbook
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div className="mt-14">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-accent" />
              Recent messages
            </h3>

            {loading ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
            ) : comments.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                No messages yet. Be the first to sign the guestbook!
              </p>
            ) : (
              <ul className="mt-6 space-y-4">
                {comments.map((c) => (
                  <Card key={c.id} className="p-5 border-border hover-lift">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{c.sender_name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(c.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed">
                      {c.message_text}
                    </p>
                    {c.reply_text && (
                      <div className="mt-4 rounded-xl border-l-2 border-accent bg-muted/40 p-3">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                          <Reply className="h-3 w-3" /> Kelvin replied
                        </p>
                        <p className="mt-1.5 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                          {c.reply_text}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
