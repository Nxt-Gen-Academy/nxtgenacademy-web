"use client";

import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { BookOpen, Trophy, Sparkles, ArrowRight, Network, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuroraBackground } from "@/components/ui/animated-background";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  linkedin: z.string().url("Must be a valid URL"),
  expertise: z.string().min(1, "Please select an expertise"),
  experience: z.number().min(0, "Invalid experience"),
  goals: z.string().min(10, "Please provide more detail"),
});
type FormValues = z.infer<typeof formSchema>;

const benefits = [
  {
    title: "Share Knowledge",
    description: "Give back to the community by guiding the next generation of tech professionals.",
    icon: BookOpen,
  },
  {
    title: "Network",
    description: "Connect with other industry leaders, experts, and bright minds in our exclusive network.",
    icon: Network,
  },
  {
    title: "Earn Rewards",
    description: "Get compensated for your time while making a tangible impact on students' careers.",
    icon: Trophy,
  },
  {
    title: "Build Brand",
    description: "Establish yourself as a thought leader and subject matter expert in your domain.",
    icon: Sparkles,
  },
];

const steps = [
  {
    title: "Apply Online",
    description: "Fill out the application form with your details and area of expertise.",
    step: "1",
  },
  {
    title: "Profile Review",
    description: "Our team reviews your profile to match it with our curriculum requirements.",
    step: "2",
  },
  {
    title: "Discussion",
    description: "A brief interaction to understand your teaching style, availability, and goals.",
    step: "3",
  },
  {
    title: "Onboarding",
    description: "Welcome aboard! Get access to our resources and start mentoring.",
    step: "4",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Data Scientist",
    text: "NxtGen Academy gave me a fantastic platform to share my knowledge. The students are incredibly eager to learn, and the support team handles all the logistics flawlessly.",
  },
  {
    name: "Mike Thompson",
    role: "Cloud Architect",
    text: "I love the flexibility. I can schedule sessions around my full-time job. It's rewarding to see mentees land their dream jobs after our sessions.",
  },
  {
    name: "Ananya Rao",
    role: "Product Manager",
    text: "The curriculum structure provided by NxtGen Academy allows me to focus purely on teaching and mentoring. A great community to be a part of.",
  },
];

export default function ApplyMentorPage() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      expertise: "",
      experience: 0,
      goals: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await axios.post("/api/api-mentor", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Application Sent!", {
        description: "Our team will contact you shortly.",
      });
      reset();
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      const message = error.response?.data?.error || "Failed to submit application. Please try again.";
      toast.error("Submission Failed", {
        description: message,
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-zinc-300 selection:bg-white/20 selection:text-white font-sans">
      <Nav />
      
      {/* Minimal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <AuroraBackground>
        <section className="relative pt-32 pb-24 px-6 z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left side: Text */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary mb-6 tracking-wide">
              <span>Join Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
              Shape the <br className="hidden md:block" /><span className="text-primary">next generation</span><br className="hidden md:block" /> of tech leaders
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-8">
              Join NxtGen Academy as a mentor and share your industry expertise with eager learners. Help bridge the gap between academia and industry.
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs">M{i}</span>
                  </div>
                ))}
              </div>
              <p>Join 50+ expert mentors</p>
            </div>
          </div>
          
          {/* Right side: Form */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl mt-12 lg:mt-0">
            <h2 className="text-2xl font-semibold text-white mb-2">Ready to join us?</h2>
            <p className="text-sm text-zinc-400 mb-6">Fill out the form below to start your journey.</p>
            
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-zinc-300 text-xs">Full Name</Label>
                  <Input id="fullName" {...register("fullName")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm" placeholder="John Doe" />
                  {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300 text-xs">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm" placeholder="john@example.com" />
                  {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300 text-xs">Phone Number</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm" placeholder="+91 98765 43210" />
                  {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-zinc-300 text-xs">LinkedIn Profile</Label>
                  <Input id="linkedin" type="url" {...register("linkedin")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm" placeholder="https://linkedin.com/in/johndoe" />
                  {errors.linkedin && <p className="text-destructive text-xs">{errors.linkedin.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs">Area of Expertise</Label>
                  <Controller
                    control={control}
                    name="expertise"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full bg-black/50 border-zinc-800 text-white focus:ring-primary/50 h-10 text-sm">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Data Science & AI">Data Science & AI</SelectItem>
                          <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                          <SelectItem value="Cloud & DevOps">Cloud & DevOps</SelectItem>
                          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="Product Management">Product Management</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.expertise && <p className="text-destructive text-xs">{errors.expertise.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-zinc-300 text-xs">Years of Experience</Label>
                  <Input id="experience" type="number" min="0" {...register("experience", { valueAsNumber: true })} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm" placeholder="e.g. 5" />
                  {errors.experience && <p className="text-destructive text-xs">{errors.experience.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals" className="text-zinc-300 text-xs">Mentorship goals</Label>
                <Textarea id="goals" rows={3} {...register("goals")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 resize-none text-sm" placeholder="I want to help students understand practical system design..." />
                {errors.goals && <p className="text-destructive text-xs">{errors.goals.message}</p>}
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={mutation.isPending} 
                  className="w-full rounded-lg h-11 font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Smooth Fade to Next Section */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-zinc-950/30 via-zinc-950/10 to-transparent pointer-events-none" />
        </section>
      </AuroraBackground>

      {/* Benefits Section */}
      <section className="py-24 px-6 relative z-10 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-6 tracking-widest uppercase">
              Why Join
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Perks of Mentorship
            </h2>
            <p className="text-zinc-400 text-lg">
              Join a community of elite professionals and unlock exclusive benefits while shaping the future.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_oklch(var(--primary)/0.3)] transition-all duration-500">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-6 tracking-widest uppercase">
              Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              How to Get Started
            </h2>
            <p className="text-zinc-400 text-lg">
              Four simple steps to begin your journey as a NxtGen Academy mentor.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group p-8 rounded-3xl border border-white/10 bg-zinc-950/80 hover:border-primary/40 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 font-mono select-none pointer-events-none">
                  {step.step}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-8 shadow-[0_0_15px_oklch(var(--primary)/0.4)] group-hover:scale-110 transition-transform duration-500">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-6 tracking-widest uppercase">
              Wall of Love
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Hear From Our Mentors
            </h2>
            <p className="text-zinc-400 text-lg">
              Discover what our community has to say about their mentoring experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="group relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-xl">
                <div className="absolute top-8 right-8 text-white/5 group-hover:text-primary/10 transition-colors duration-500 pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
                </div>
                <div className="relative z-10 flex-1">
                  <p className="text-zinc-300 leading-relaxed mb-10 text-lg font-medium">&quot;{t.text}&quot;</p>
                </div>
                <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/30 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_oklch(var(--primary)/0.2)]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{t.name}</h4>
                    <p className="text-sm text-primary font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </main>
  );
}
