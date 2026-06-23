"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, User } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9]+$/, "Phone must contain only numbers"),
  qualification: z.string().optional(),
  profession: z.string().optional(),
  course: z.string().min(1, "Please select a course"),
  source: z.string().optional(),
  message: z.string().optional(),
  whatsAppUpdates: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm({ idPrefix = "" }: { idPrefix?: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      qualification: "",
      profession: "",
      course: "",
      source: "",
      message: "",
      whatsAppUpdates: true,
    },
  });

  const currentPhone = watch("phone");
  const currentCourse = watch("course");
  const currentWhatsApp = watch("whatsAppUpdates");
  const currentName = watch("name");

  // Pre-fill fields when user is logged in, restoring cached choices if any
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setValue("name", session.user.name);
      if (session.user.email) setValue("email", session.user.email);

      if (typeof window !== "undefined") {
        const flag = localStorage.getItem("pending_enquiry_flag");
        if (flag === "true") {
          // Clear flag immediately to prevent double detection
          localStorage.removeItem("pending_enquiry_flag");

          const cachedPhone = localStorage.getItem("pending_enquiry_phone");
          const cachedCourse = localStorage.getItem("pending_enquiry_course");
          const cachedWhatsApp = localStorage.getItem("pending_enquiry_whatsapp");

          if (cachedPhone) setValue("phone", cachedPhone);
          if (cachedCourse) setValue("course", cachedCourse);
          if (cachedWhatsApp) setValue("whatsAppUpdates", cachedWhatsApp !== "false");

          // Clean up cache
          localStorage.removeItem("pending_enquiry_phone");
          localStorage.removeItem("pending_enquiry_course");
          localStorage.removeItem("pending_enquiry_whatsapp");
        }
      }
    }
  }, [session, setValue]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    // Cache current form choices so they persist across the redirect
    if (typeof window !== "undefined") {
      localStorage.setItem("pending_enquiry_phone", currentPhone || "");
      localStorage.setItem("pending_enquiry_course", currentCourse || "");
      localStorage.setItem("pending_enquiry_whatsapp", String(currentWhatsApp));
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/save-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success) {
          setSubmitted(true);
        } else {
          setError(resData.error || "Failed to submit enquiry. Please try again.");
        }
      } else {
        let errorMsg = "Failed to submit enquiry. Please try again.";
        try {
          const resData = await response.json();
          if (resData.error) errorMsg = resData.error;
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
          Thank you, <strong>{currentName}</strong>. Your interest in <em>{currentCourse}</em> has been registered. We will contact you shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            if (!session?.user) {
              setValue("name", "");
              setValue("email", "");
            }
            setValue("phone", "");
            setValue("qualification", "");
            setValue("profession", "");
            setValue("course", "");
            setValue("source", "");
            setValue("message", "");
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
                <path d="M23.49 12.27c0-.86-.07-1.49-.22-2.14H12v4.03h6.81c-.14 1-.9 2.51-2.58 3.52l-.02.14 3.56 2.76.25.03c2.34-2.16 3.47-5.34 3.47-8.34z" fill="#4285F4" />
                <path d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.79-2.94c-1.01.7-2.37 1.2-4.16 1.2-3.17 0-5.85-2.08-6.81-4.96l-.13.01-3.69 2.85-.04.12C3.3 21.16 7.38 24 12 24z" fill="#34A853" />
                <path d="M5.19 14.39a7.4 7.4 0 0 1-.38-2.39c0-.83.15-1.63.36-2.39l-.01-.16-3.74-2.9-.12.06A11.99 11.99 0 0 0 0 12c0 1.94.47 3.77 1.3 5.39l3.89-2.99z" fill="#FBBC05" />
                <path d="M12 4.75c2.33 0 3.9 1 4.8 1.84l3.51-3.42C17.95 1 15.24 0 12 0 7.38 0 3.3 2.83 1.3 6.61l3.86 2.99c.96-2.88 3.64-4.85 6.84-4.85z" fill="#EA4335" />
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}name`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Name
            </Label>
            <Input
              id={`${idPrefix}name`}
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              disabled={!!session?.user || isSubmitting}
              className={`h-auto px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed ${errors.name ? 'border-red-500' : 'border-border'}`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}email`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Email
            </Label>
            <Input
              id={`${idPrefix}email`}
              type="email"
              placeholder="Enter Email"
              {...register("email")}
              disabled={!!session?.user || isSubmitting}
              className={`h-auto px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-border'}`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}phone`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Phone Number
            </Label>
            <div className={`flex items-center rounded-xl border bg-card/60 px-3 py-2.5 text-sm focus-within:ring-2 focus-within:ring-primary/50 transition ${errors.phone ? 'border-red-500' : 'border-border'}`}>
              <span className="text-muted-foreground">+91</span>
              <span className="mx-2 h-5 w-px bg-border" />
              <Input
                id={`${idPrefix}phone`}
                type="tel"
                placeholder="Enter Phone Number"
                {...register("phone")}
                disabled={isSubmitting}
                className="h-auto p-0 border-0 bg-transparent rounded-none focus-visible:ring-0 focus-visible:border-transparent text-sm text-foreground w-full disabled:opacity-70"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}qualification`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Qualification
            </Label>
            <Input
              id={`${idPrefix}qualification`}
              type="text"
              placeholder="Enter Qualification"
              {...register("qualification")}
              disabled={isSubmitting}
              className="h-auto px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}profession`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Profession
            </Label>
            <Input
              id={`${idPrefix}profession`}
              type="text"
              placeholder="Enter Profession"
              {...register("profession")}
              disabled={isSubmitting}
              className="h-auto px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}course`} className="text-xs text-muted-foreground uppercase tracking-wider">
              Course Interested In
            </Label>
            <Controller
              control={control}
              name="course"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <SelectTrigger className={`h-auto px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus:ring-2 focus:ring-primary/50 w-full disabled:opacity-70 disabled:cursor-not-allowed ${errors.course ? 'border-red-500' : 'border-border'}`}>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-card">
                    <SelectItem value="Business analytics with AI">Business analytics with AI</SelectItem>
                    <SelectItem value="Data Analytics with AI">Data Analytics with AI</SelectItem>
                    <SelectItem value="AI Product Management">AI Product Management</SelectItem>
                    <SelectItem value="Data Engineering & DevOps Career Program">Data Engineering & DevOps Career Program</SelectItem>
                    <SelectItem value="Cyber Security & Ethical Hacking Program">Cyber Security & Ethical Hacking Program</SelectItem>
                    <SelectItem value="Software Engineering Specialization Program">Software Engineering Specialization Program</SelectItem>
                    <SelectItem value="Data Science, ML & AI Program">Data Science, ML & AI Program</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.course && <p className="text-xs text-red-500">{errors.course.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}source`} className="text-xs text-muted-foreground uppercase tracking-wider">
            How did you hear about us?
          </Label>
          <Controller
            control={control}
            name="source"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                <SelectTrigger className="h-auto px-3 py-2.5 rounded-xl border bg-card/60 border-border text-sm focus:ring-2 focus:ring-primary/50 w-full disabled:opacity-70 disabled:cursor-not-allowed">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-card">
                  <SelectItem value="Google">Google Search</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Instagram">Instagram / Facebook</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Referral">Friend / Colleague</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}message`} className="text-xs text-muted-foreground uppercase tracking-wider">
            Your Message (Optional)
          </Label>
          <Textarea
            id={`${idPrefix}message`}
            placeholder="Enter Message"
            {...register("message")}
            disabled={isSubmitting}
            className="h-24 px-3 py-2.5 rounded-xl border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground w-full disabled:opacity-70 disabled:cursor-not-allowed border-border resize-none"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Controller
            control={control}
            name="whatsAppUpdates"
            render={({ field }) => (
              <Checkbox 
                id={`${idPrefix}whatsapp`}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            )}
          />
          <Label 
            htmlFor={`${idPrefix}whatsapp`}
            className="text-xs text-muted-foreground font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Send me updates on WhatsApp
          </Label>
        </div>

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
