"use client";

import { Fragment } from "react";
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
import { ShaderAnimation } from "@/components/ui/ShaderAnimation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

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
    image: "/perk_knowledge.png",
    glowClass: "from-blue-500/15",
    borderClass: "group-hover:border-blue-500/30",
    textHoverClass: "group-hover:text-blue-400",
  },
  {
    title: "Network",
    description: "Connect with other industry leaders, experts, and bright minds in our exclusive network.",
    image: "/perk_network.png",
    glowClass: "from-teal-500/15",
    borderClass: "group-hover:border-teal-500/30",
    textHoverClass: "group-hover:text-teal-400",
  },
  {
    title: "Earn Rewards",
    description: "Get compensated for your time while making a tangible impact on students' careers.",
    image: "/perk_rewards.png",
    glowClass: "from-emerald-500/15",
    borderClass: "group-hover:border-emerald-500/30",
    textHoverClass: "group-hover:text-emerald-400",
  },
  {
    title: "Build Brand",
    description: "Establish yourself as a thought leader and subject matter expert in your domain.",
    image: "/perk_brand.png",
    glowClass: "from-purple-500/15",
    borderClass: "group-hover:border-purple-500/30",
    textHoverClass: "group-hover:text-purple-400",
  },
];

const steps = [
  {
    title: "Apply Online",
    description: "Fill out the application form with your details and area of expertise.",
    step: "01",
    image: "/step_apply.png",
    glowClass: "from-indigo-500/15",
    borderClass: "group-hover:border-indigo-500/30",
    textHoverClass: "group-hover:text-indigo-400",
  },
  {
    title: "Profile Review",
    description: "Our team reviews your profile to match it with our curriculum requirements.",
    step: "02",
    image: "/step_review.png",
    glowClass: "from-amber-500/15",
    borderClass: "group-hover:border-amber-500/30",
    textHoverClass: "group-hover:text-amber-400",
  },
  {
    title: "Discussion",
    description: "A brief interaction to understand your teaching style, availability, and goals.",
    step: "03",
    image: "/step_discussion.png",
    glowClass: "from-sky-500/15",
    borderClass: "group-hover:border-sky-500/30",
    textHoverClass: "group-hover:text-sky-400",
  },
  {
    title: "Onboarding",
    description: "Welcome aboard! Get access to our resources and start mentoring.",
    step: "04",
    image: "/step_onboarding.png",
    glowClass: "from-emerald-500/15",
    borderClass: "group-hover:border-emerald-500/30",
    textHoverClass: "group-hover:text-emerald-400",
  },
];

const testimonials = [
  {
    name: "Kavita Mehta",
    role: "Senior Data Scientist",
    text: "NxtGen Academy gave me a fantastic platform to share my knowledge. The students are incredibly eager to learn, and the support team handles all the logistics flawlessly.",
    avatar: "/avatar_sarah.png",
    glowClass: "from-cyan-500/15",
    borderClass: "group-hover:border-cyan-500/30",
    textHoverClass: "group-hover:text-cyan-400",
    roleHoverClass: "group-hover:text-cyan-500/80",
    avatarBorderClass: "group-hover:border-cyan-500/50",
  },
  {
    name: "Rohan Deshmukh",
    role: "Cloud Architect",
    text: "I love the flexibility. I can schedule sessions around my full-time job. It's rewarding to see mentees land their dream jobs after our sessions.",
    avatar: "/avatar_mike.png",
    glowClass: "from-amber-500/15",
    borderClass: "group-hover:border-amber-500/30",
    textHoverClass: "group-hover:text-amber-400",
    roleHoverClass: "group-hover:text-amber-500/80",
    avatarBorderClass: "group-hover:border-amber-500/50",
  },
  {
    name: "Ananya Rao",
    role: "Product Manager",
    text: "The curriculum structure provided by NxtGen Academy allows me to focus purely on teaching and mentoring. A great community to be a part of.",
    avatar: "/avatar_ananya.png",
    glowClass: "from-purple-500/15",
    borderClass: "group-hover:border-purple-500/30",
    textHoverClass: "group-hover:text-purple-400",
    roleHoverClass: "group-hover:text-purple-500/80",
    avatarBorderClass: "group-hover:border-purple-500/50",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
} as const;

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
      <div className="relative min-h-screen overflow-hidden bg-black w-full">
        {/* Shader Animation Background */}
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
          {/* Overlay gradient for depth & readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 z-[5] bg-zinc-950/40 backdrop-blur-md pointer-events-none" />

        <section className="relative pt-32 pb-24 px-6 z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left side: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left p-8 md:p-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary mb-6 tracking-wide"
            >
              <span>Join Our Mission</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]"
            >
              Shape the <br className="hidden md:block" /><span className="text-primary">next generation</span><br className="hidden md:block" /> of tech leaders
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-8"
            >
              Join NxtGen Academy as a mentor and share your industry expertise with eager learners. Help bridge the gap between academia and industry.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-sm text-zinc-500 font-medium"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs">M{i}</span>
                  </div>
                ))}
              </div>
              <p>Join 50+ expert mentors</p>
            </motion.div>
          </motion.div>

          {/* Right side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.25 }}
            className="w-full max-w-xl mx-auto lg:mx-0 p-6 md:p-8 mt-12 lg:mt-0"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">Ready to join us?</h2>
            <p className="text-sm text-zinc-400 mb-6">Fill out the form below to start your journey.</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-zinc-300 text-xs">Full Name</Label>
                  <Input id="fullName" {...register("fullName")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50" placeholder="John Doe" />
                  {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300 text-xs">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50" placeholder="john@example.com" />
                  {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300 text-xs">Phone Number</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50" placeholder="+91 98765 43210" />
                  {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-zinc-300 text-xs">LinkedIn Profile</Label>
                  <Input id="linkedin" type="url" {...register("linkedin")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50" placeholder="https://linkedin.com/in/johndoe" />
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
                        <SelectTrigger className="w-full bg-black/50 border-zinc-800 text-white focus:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50">
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
                  <Input id="experience" type="number" min="0" {...register("experience", { valueAsNumber: true })} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 h-10 text-sm transition-all duration-300 focus:border-primary/50" placeholder="e.g. 5" />
                  {errors.experience && <p className="text-destructive text-xs">{errors.experience.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals" className="text-zinc-300 text-xs">Mentorship goals</Label>
                <Textarea id="goals" rows={3} {...register("goals")} className="bg-black/50 border-zinc-800 text-white focus-visible:ring-primary/50 resize-none text-sm transition-all duration-300 focus:border-primary/50" placeholder="I want to help students understand practical system design..." />
                {errors.goals && <p className="text-destructive text-xs">{errors.goals.message}</p>}
              </div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full rounded-lg h-11 font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
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
                </motion.div>
              </div>
            </form>
          </motion.div>

          {/* Smooth Fade to Next Section */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-zinc-950/30 via-zinc-950/10 to-transparent pointer-events-none" />
        </section>
      </div>

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 lg:gap-10"
          >
            {benefits.map((benefit, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  style={{
                    willChange: "transform, opacity, filter",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                  className={`group relative rounded-[32px] border border-white/[0.08] bg-zinc-950/80 hover:bg-zinc-950 ${benefit.borderClass} transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between pt-10 px-8 sm:px-10`}
                >
                  {/* Subtle top/left gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col items-start mb-8">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                      {benefit.title}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-semibold tracking-tight text-white mb-4 leading-snug ${benefit.textHoverClass} transition-colors duration-300`}>
                      {benefit.description}
                    </h3>
                  </div>

                  {/* Simulated Workspace Window Container */}
                  <div className="mt-auto overflow-hidden rounded-t-[20px] border-t border-x border-zinc-800/80 bg-zinc-900/30">
                    {/* Simulated Window Titlebar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50 select-none">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                      </div>
                      <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        WORKSPACE
                      </div>
                      <div className="w-10" /> {/* Balance spacer */}
                    </div>

                    {/* Window Content / Mock Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-stretch justify-between w-full gap-4 lg:gap-3"
          >
            {steps.map((step, idx) => (
              <Fragment key={idx}>
                {/* Step Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  style={{
                    willChange: "transform, opacity, filter",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                  className={`flex-1 group relative rounded-3xl border border-white/[0.08] bg-zinc-950/80 hover:bg-zinc-950 ${step.borderClass} transition-all duration-500 overflow-hidden shadow-2xl flex flex-col p-6`}
                >
                  {/* Subtle top/left gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Step Image at the Top */}
                  <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 mb-5 aspect-[16/10]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Step Info at the Bottom */}
                  <div className="relative z-10 flex flex-col items-start text-left mt-auto">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                      Step {step.step}
                    </span>
                    <h3 className={`text-lg font-bold text-white mb-2 ${step.textHoverClass} transition-colors duration-300`}>
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Connecting Arrow (drawn in between steps) */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center lg:rotate-0 rotate-90 my-2 lg:my-0 flex-shrink-0 self-center z-20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-sm shadow-lg text-primary/60 hover:text-primary transition-colors duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </motion.div>
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  willChange: "transform, opacity, filter",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
                className={`group relative p-8 sm:p-10 rounded-[32px] border border-white/[0.08] bg-zinc-950/80 hover:bg-zinc-950 ${t.borderClass} transition-all duration-500 flex flex-col h-full shadow-2xl overflow-hidden`}
              >
                {/* Dynamic Inside Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="absolute top-8 right-8 text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 pointer-events-none">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                </div>

                <div className="relative z-10 flex-1">
                  <p className="text-zinc-300 leading-relaxed mb-10 text-base font-medium">&quot;{t.text}&quot;</p>
                </div>

                <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-white/[0.06]">
                  {/* Portrait Avatar */}
                  <div className={`h-12 w-12 rounded-full overflow-hidden border border-white/10 ${t.avatarBorderClass} transition-all duration-500 shadow-md flex-shrink-0`}>
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <p className={`text-xs text-zinc-500 font-medium mt-0.5 ${t.roleHoverClass} transition-colors duration-300`}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
