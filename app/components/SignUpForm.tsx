"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, User } from "lucide-react";

export default function SignUpForm({ idPrefix = "" }: { idPrefix?: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Business analytics with AI");
  const [whatsAppUpdates, setWhatsAppUpdates] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill fields when user is logged in, restoring cached choices if any
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");

      if (typeof window !== "undefined") {
        const flag = localStorage.getItem("pending_enquiry_flag");
        if (flag === "true") {
          // Clear flag immediately to prevent double detection
          localStorage.removeItem("pending_enquiry_flag");

          const cachedPhone = localStorage.getItem("pending_enquiry_phone");
          const cachedCourse = localStorage.getItem("pending_enquiry_course");
          const cachedWhatsApp = localStorage.getItem("pending_enquiry_whatsapp");

          if (cachedPhone) setPhone(cachedPhone);
          if (cachedCourse) setCourse(cachedCourse);
          if (cachedWhatsApp) setWhatsAppUpdates(cachedWhatsApp !== "false");

          // Clean up cache
          localStorage.removeItem("pending_enquiry_phone");
          localStorage.removeItem("pending_enquiry_course");
          localStorage.removeItem("pending_enquiry_whatsapp");
        }
      }
    }
  }, [session]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    // Cache current form choices so they persist across the redirect
    if (typeof window !== "undefined") {
      localStorage.setItem("pending_enquiry_phone", phone);
      localStorage.setItem("pending_enquiry_course", course);
      localStorage.setItem("pending_enquiry_whatsapp", String(whatsAppUpdates));
      localStorage.setItem("pending_enquiry_flag", "true");
    }

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // Redirect back to dashboard on success
      });
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Authentication failed. Please try again.");
      // Clear storage on failure
      if (typeof window !== "undefined") {
        localStorage.removeItem("pending_enquiry_flag");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/save-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          course,
          whatsAppUpdates,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
        } else {
          setError(data.error || "Failed to submit enquiry. Please try again.");
        }
      } else {
        let errorMsg = "Failed to submit enquiry. Please try again.";
        try {
          const data = await response.json();
          if (data.error) errorMsg = data.error;
        } catch (_) {}
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center p-6 text-center border border-border bg-card/60 rounded-3xl space-y-4">
        <CheckCircle className="h-12 w-12 text-primary animate-bounce" />
        <h3 className="font-heading text-lg font-medium text-foreground">
          Enquiry Submitted!
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank you, <strong>{name}</strong>. Your interest in <em>{course}</em> has been registered. We will contact you shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            if (!session?.user) {
              setName("");
              setEmail("");
            }
            setPhone("");
          }}
          variant="outline"
          className="mt-2 rounded-xl text-xs"
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5">
      {error && (
        <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
          {error}
        </div>
      )}

      {/* User Status / Google Login */}
      {session?.user ? (
        <div className="w-full rounded-xl bg-card/40 border border-border/80 p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border/80 shrink-0">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Signed in as</div>
              <div className="text-sm font-semibold text-foreground truncate">{session.user.name}</div>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="rounded-lg h-auto py-1.5 px-3 text-xs hover:bg-primary/10 hover:text-primary font-medium shrink-0 border-border/80"
          >
            Dashboard
          </Button>
        </div>
      ) : (
        <>
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isSubmitting}
            variant="outline"
            className="w-full rounded-xl bg-card/60 hover:bg-card h-auto py-3 font-medium transition text-foreground flex items-center justify-center gap-2.5 border-border/80"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M23.49 12.27c0-.86-.07-1.49-.22-2.14H12v4.03h6.81c-.14 1-.9 2.51-2.58 3.52l-.02.14 3.56 2.76.25.03c2.34-2.16 3.47-5.34 3.47-8.34z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.79-2.94c-1.01.7-2.37 1.2-4.16 1.2-3.17 0-5.85-2.08-6.81-4.96l-.13.01-3.69 2.85-.04.12C3.3 21.16 7.38 24 12 24z"
                  fill="#34A853"
                />
                <path
                  d="M5.19 14.39a7.4 7.4 0 0 1-.38-2.39c0-.83.15-1.63.36-2.39l-.01-.16-3.74-2.9-.12.06A11.99 11.99 0 0 0 0 12c0 1.94.47 3.77 1.3 5.39l3.89-2.99z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c2.33 0 3.9 1 4.8 1.84l3.51-3.42C17.95 1 15.24 0 12 0 7.38 0 3.3 2.83 1.3 6.61l3.86 2.99c.96-2.88 3.64-4.85 6.84-4.85z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            {isLoading ? "Signing in..." : "Sign up with Google"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground py-1">
            <span className="h-px flex-1 bg-border" />
            OR
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      {/* Enquiry Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor={`${idPrefix}name`}
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Name
          </Label>
          <Input
            id={`${idPrefix}name`}
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            disabled={!!session?.user || isSubmitting}
            onChange={(e) => setName(e.target.value)}
            className="h-auto px-3 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`${idPrefix}email`}
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Email
          </Label>
          <Input
            id={`${idPrefix}email`}
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            disabled={!!session?.user || isSubmitting}
            onChange={(e) => setEmail(e.target.value)}
            className="h-auto px-3 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`${idPrefix}phone`}
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Phone Number
          </Label>
          <div className="flex items-center rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm focus-within:ring-2 focus-within:ring-primary/50 transition">
            <span className="text-muted-foreground">+91</span>
            <span className="mx-2 h-5 w-px bg-border" />
            <Input
              id={`${idPrefix}phone`}
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              disabled={isSubmitting}
              onChange={(e) => setPhone(e.target.value)}
              className="h-auto p-0 border-0 bg-transparent rounded-none focus-visible:ring-0 focus-visible:border-transparent text-sm text-foreground w-full disabled:opacity-70"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Your Course of Interest
          </div>
          <div className="grid gap-2 text-sm text-foreground">
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <input
                type="radio"
                name={`${idPrefix}course`}
                checked={course === "Business analytics with AI"}
                disabled={isSubmitting}
                onChange={() => setCourse("Business analytics with AI")}
                className="accent-primary"
              />
              Business analytics with AI
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <input
                type="radio"
                name={`${idPrefix}course`}
                checked={course === "Data Analytics with AI"}
                disabled={isSubmitting}
                onChange={() => setCourse("Data Analytics with AI")}
                className="accent-primary"
              />
              Data Analytics with AI
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <input
                type="radio"
                name={`${idPrefix}course`}
                checked={course === "AI Product Management"}
                disabled={isSubmitting}
                onChange={() => setCourse("AI Product Management")}
                className="accent-primary"
              />
              AI Product Management
            </Label>
          </div>
        </div>

        <Label className="flex items-center gap-2 text-xs text-muted-foreground font-normal cursor-pointer">
          <input
            type="checkbox"
            checked={whatsAppUpdates}
            disabled={isSubmitting}
            onChange={(e) => setWhatsAppUpdates(e.target.checked)}
            className="accent-primary"
          />
          Send me updates on WhatsApp
        </Label>

        {/* Form Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          size="lg"
          className="w-full rounded-xl h-auto py-3 text-sm font-medium hover:shadow-[0_0_40px_oklch(0.62_0.22_258/0.5)] transition mt-2"
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </form>
    </div>
  );
}
