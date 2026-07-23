import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, useCallback } from "react";
import { Lock, Loader2, LogOut, Eye, EyeOff, Trash2, Save } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  adminLogin,
  adminLogout,
  adminCheck,
  adminListAllComments,
  adminUpdateComment,
  adminDeleteComment,
} from "@/lib/comments.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Guestbook Moderation" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private admin panel." },
    ],
  }),
  component: AdminPage,
});

type AdminComment = {
  id: string;
  created_at: string;
  sender_name: string;
  email: string | null;
  message_text: string;
  reply_text: string | null;
  is_visible: boolean;
};

function AdminPage() {
  const check = useServerFn(adminCheck);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const listAll = useServerFn(adminListAllComments);
  const update = useServerFn(adminUpdateComment);
  const del = useServerFn(adminDeleteComment);

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [items, setItems] = useState<AdminComment[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = (await listAll()) as AdminComment[];
      setItems(data);
      setDrafts(Object.fromEntries(data.map((c) => [c.id, c.reply_text ?? ""])));
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [listAll]);

  useEffect(() => {
    (async () => {
      const { isAdmin } = await check();
      setAuthed(isAdmin);
      if (isAdmin) refresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await login({ data: { password } });
      if (!res.ok) {
        toast.error("Incorrect password");
        return;
      }
      setPassword("");
      setAuthed(true);
      refresh();
    } finally {
      setLoggingIn(false);
    }
  };

  const onLogout = async () => {
    await logout();
    setAuthed(false);
    setItems([]);
  };

  const saveReply = async (id: string) => {
    try {
      await update({ data: { id, reply_text: drafts[id] ?? "" } });
      toast.success("Reply saved");
      refresh();
    } catch {
      toast.error("Failed to save reply");
    }
  };

  const toggleVisible = async (c: AdminComment) => {
    try {
      await update({ data: { id: c.id, is_visible: !c.is_visible } });
      refresh();
    } catch {
      toast.error("Failed to update visibility");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    try {
      await del({ data: { id } });
      toast.success("Deleted");
      refresh();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (authed === null) {
    return (
      <PageLayout>
        <section className="section-pad">
          <div className="container-prose text-center text-muted-foreground">Loading…</div>
        </section>
      </PageLayout>
    );
  }

  if (!authed) {
    return (
      <PageLayout>
        <section className="section-pad">
          <div className="container-prose max-w-md">
            <SectionHeading
              eyebrow="Admin"
              title={<>Sign <span className="gradient-text">in</span></>}
              description="Enter the admin password to moderate the guestbook."
            />
            <Card className="mt-8 p-6 border-border">
              <form onSubmit={onLogin} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    autoFocus
                    required
                  />
                </div>
                <Button type="submit" disabled={loggingIn} className="w-full">
                  {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="section-pad">
        <div className="container-prose max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Admin"
              title={<>Guestbook <span className="gradient-text">moderation</span></>}
              description={`${items.length} total · ${items.filter((i) => i.is_visible).length} visible`}
            />
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>

          {loading ? (
            <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
          ) : items.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">No comments yet.</p>
          ) : (
            <ul className="mt-8 space-y-4">
              {items.map((c) => (
                <Card key={c.id} className="p-5 border-border">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {c.sender_name}
                        {c.email && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            &lt;{c.email}&gt;
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(c.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full ${
                        c.is_visible
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.is_visible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed">
                    {c.message_text}
                  </p>

                  <div className="mt-4">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Reply (public)
                    </label>
                    <Textarea
                      rows={2}
                      value={drafts[c.id] ?? ""}
                      onChange={(e) =>
                        setDrafts((d) => ({ ...d, [c.id]: e.target.value }))
                      }
                      placeholder="Write a public reply…"
                      className="mt-1"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => saveReply(c.id)}>
                      <Save className="h-3.5 w-3.5 mr-1.5" /> Save reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleVisible(c)}>
                      {c.is_visible ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5 mr-1.5" /> Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5 mr-1.5" /> Approve
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => remove(c.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
