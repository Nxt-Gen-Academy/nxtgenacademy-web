"use client";

import { Fragment } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  UserCheck,
  BookOpen,
  Network,
  Trophy
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShaderAnimation } from "@/components/ui/ShaderAnimation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "motion/react";

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
    icon: BookOpen,
    tag: "Share Knowledge",
    title: "Shape Future Talent",
    description: "Give back to the tech community by guiding the next generation of engineers, analysts, and product leaders.",
  },
  {
    icon: Network,
    tag: "Elite Network",
    title: "Exclusive Community",
    description: "Connect with fellow senior leaders, domain directors, and industry pioneers across global tech companies.",
  },
  {
    icon: Trophy,
    tag: "Earn Rewards",
    title: "Competitive Honorarium",
    description: "Get handsomely compensated for your time and expertise with transparent, high-tier hourly honorariums.",
  },
  {
    icon: Sparkles,
    tag: "Build Brand",
    title: "Thought Leadership",
    description: "Establish yourself as a recognized subject matter authority, keynote mentor, and hiring partner.",
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
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
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
      const response = await axios.post("/api/apply-mentor", data);
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

  const scrollToApply = () => {
    const el = document.getElementById("apply-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = document.getElementById("fullName");
      if (input) input.focus();
    }
  };

  const scrollToPerks = () => {
    const el = document.getElementById("perks");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Nav />

      {/* ── Public.com Inspired Split Hero Section ── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 sm:pt-32 pb-16 lg:pb-12 overflow-hidden bg-background">
        
        {/* Full-Height Shader Background on Right Side (Stretches full height, hidden on smaller screens) */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[45%] xl:w-[48%] h-full z-0 overflow-hidden pointer-events-none">
          <ShaderAnimation />
          {/* Subtle soft gradient fade into the left side for clean edge blending */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* ── LEFT HALF: Clean Editorial Text & CTAs ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-10 pr-0 lg:pr-4 py-4 lg:py-10"
          >
            {/* Eyebrow Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary mb-6 tracking-wide shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Join Our Mission • NxtGen Mentor Network</span>
            </motion.div>

            {/* Giant Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Shape the <br />
              <span className="text-primary font-medium">next generation</span> <br />
              of tech leaders
            </motion.h1>

            {/* Subtitle Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed mb-8 font-normal"
            >
              Join NxtGen Academy as a mentor and share your industry expertise with eager learners. Guide aspiring product managers, business analysts, and data specialists while earning competitive honorariums.
            </motion.p>

            {/* Action Buttons (Matching Public.com Hero Buttons) */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={scrollToApply}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 font-semibold text-sm bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span>Apply as Mentor</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToPerks}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/90 hover:border-primary/50 bg-card hover:bg-muted text-foreground px-7 py-3.5 text-sm font-semibold shadow-xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Perks</span>
              </button>
            </motion.div>

            {/* Mentor Social Proof Counter */}
            <motion.div variants={itemVariants} className="w-full pt-6 border-t border-border/70 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  KA
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  RD
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  AR
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Joined by <strong className="text-foreground font-semibold">50+ Senior Leaders &amp; Specialists</strong>
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT HALF: Application Form Card positioned over full-height shader ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            id="apply-form"
            className="lg:col-span-6 xl:col-span-6 relative w-full z-10 my-4 lg:my-0"
          >
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-card/95 backdrop-blur-xl border border-white/80 dark:border-border/80 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              {/* Form Card Header */}
              <div className="mb-5 sm:mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary mb-2.5">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Mentor Application</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
                  Ready to Join Us?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Share your expertise with eager learners. We will review your profile within 24 hours.
                </p>
              </div>

              {/* Form Fields */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input 
                      id="fullName" 
                      {...register("fullName")} 
                      className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 h-10 text-sm transition-all focus:border-primary" 
                      placeholder="e.g. John Doe" 
                    />
                    {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      Work or Personal Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...register("email")} 
                      className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 h-10 text-sm transition-all focus:border-primary" 
                      placeholder="john@example.com" 
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Row 2: Phone & LinkedIn */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      Phone / WhatsApp
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      {...register("phone")} 
                      className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 h-10 text-sm transition-all focus:border-primary" 
                      placeholder="+91 98765 43210" 
                    />
                    {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="linkedin" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      LinkedIn Profile URL
                    </Label>
                    <Input 
                      id="linkedin" 
                      type="url" 
                      {...register("linkedin")} 
                      className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 h-10 text-sm transition-all focus:border-primary" 
                      placeholder="https://linkedin.com/in/username" 
                    />
                    {errors.linkedin && <p className="text-destructive text-xs">{errors.linkedin.message}</p>}
                  </div>
                </div>

                {/* Row 3: Expertise & Experience */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      Area of Expertise
                    </Label>
                    <Controller
                      control={control}
                      name="expertise"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full bg-background/90 border-input text-foreground focus:ring-primary/50 h-10 text-sm transition-all focus:border-primary">
                            <SelectValue placeholder="Select primary domain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AI Product Management">AI Product Management</SelectItem>
                            <SelectItem value="AI Business Analysis">AI Business Analysis</SelectItem>
                            <SelectItem value="Data Science & Machine Learning">Data Science &amp; Machine Learning</SelectItem>
                            <SelectItem value="Data Analytics & BI">Data Analytics &amp; BI</SelectItem>
                            <SelectItem value="GenAI & Prompt Engineering">GenAI &amp; Prompt Engineering</SelectItem>
                            <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                            <SelectItem value="Cloud & DevOps">Cloud &amp; DevOps</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.expertise && <p className="text-destructive text-xs">{errors.expertise.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="experience" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                      Years of Experience
                    </Label>
                    <Input 
                      id="experience" 
                      type="number" 
                      min="0" 
                      {...register("experience", { valueAsNumber: true })} 
                      className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 h-10 text-sm transition-all focus:border-primary" 
                      placeholder="e.g. 5" 
                    />
                    {errors.experience && <p className="text-destructive text-xs">{errors.experience.message}</p>}
                  </div>
                </div>

                {/* Row 4: Mentorship Goals */}
                <div className="space-y-1.5">
                  <Label htmlFor="goals" className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
                    Mentorship Goals &amp; Availability
                  </Label>
                  <Textarea 
                    id="goals" 
                    rows={2} 
                    {...register("goals")} 
                    className="bg-background/90 border-input text-foreground focus-visible:ring-primary/50 resize-none text-sm transition-all focus:border-primary" 
                    placeholder="Preferred topics, availability, or how you want to guide learners..." 
                  />
                  {errors.goals && <p className="text-destructive text-xs">{errors.goals.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full rounded-full h-11 font-semibold text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/35"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Mentor Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-0.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Protected by our privacy and mentor network guidelines.</span>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section id="perks" className="py-24 px-6 relative z-10 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-5 tracking-widest uppercase">
              Why Join
            </div>
            <WordStaggerHeading
              as="h2"
              className="block w-full text-3xl sm:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-foreground mb-4 leading-tight"
            >
              Perks of Mentorship
            </WordStaggerHeading>
            <p className="text-muted-foreground text-base sm:text-lg">
              Join a community of elite professionals and unlock exclusive benefits while shaping the future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="card-hover-primary group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] cursor-pointer bg-card text-foreground border border-border/80 shadow-xs"
                >
                  {/* Top Row: Icon & Circular Action Arrow */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="card-icon w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs transition-colors duration-200">
                        <Icon className="h-6 w-6 stroke-[1.8]" />
                      </div>

                      <div className="card-arrow w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary shadow-xs transition-all duration-200 group-hover:scale-105">
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Benefit Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight mb-2.5 text-foreground transition-colors duration-200">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground transition-colors duration-200">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom Metadata Pill */}
                  <div className="pt-6 mt-auto">
                    <span className="card-badge inline-block text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-border/70 bg-muted/70 text-muted-foreground transition-colors duration-200">
                      {benefit.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="py-24 px-6 relative z-10 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-5 tracking-widest uppercase">
              Process
            </div>
            <WordStaggerHeading
              as="h2"
              className="block w-full text-3xl sm:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-foreground mb-4 leading-tight"
            >
              How to Get Started
            </WordStaggerHeading>
            <p className="text-muted-foreground text-base sm:text-lg">
              Four simple steps to begin your journey as a NxtGen Academy mentor.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
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
                  className={`flex-1 group relative rounded-3xl border border-border bg-card hover:bg-card/90 ${step.borderClass} transition-all duration-500 overflow-hidden shadow-sm flex flex-col p-6`}
                >
                  {/* Subtle top/left gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Step Image at the Top */}
                  <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-border bg-muted/40 mb-5 aspect-[16/10]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Step Info at the Bottom */}
                  <div className="relative z-10 flex flex-col items-start text-left mt-auto">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                      Step {step.step}
                    </span>
                    <h3 className={`text-lg font-bold text-foreground mb-2 ${step.textHoverClass} transition-colors duration-300`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Connecting Arrow */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center lg:rotate-0 rotate-90 my-2 lg:my-0 flex-shrink-0 self-center z-20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card/80 backdrop-blur-sm shadow-sm text-primary/60 hover:text-primary transition-colors duration-300">
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

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 relative z-10 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary mb-5 tracking-widest uppercase">
              Wall of Love
            </div>
            <WordStaggerHeading
              as="h2"
              className="block w-full text-3xl sm:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-foreground mb-4 leading-tight"
            >
              Hear From Our Mentors
            </WordStaggerHeading>
            <p className="text-muted-foreground text-base sm:text-lg">
              Discover what our community has to say about their mentoring experience.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
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
                className={`group relative p-8 sm:p-10 rounded-[32px] border border-border bg-card hover:bg-card/90 ${t.borderClass} transition-all duration-500 flex flex-col h-full shadow-sm overflow-hidden`}
              >
                {/* Dynamic Inside Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="absolute top-8 right-8 text-foreground/[0.04] group-hover:text-foreground/[0.08] transition-colors duration-500 pointer-events-none">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
                </div>

                <div className="relative z-10 flex-1">
                  <p className="text-foreground/90 leading-relaxed mb-10 text-base font-medium">&quot;{t.text}&quot;</p>
                </div>

                <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-border">
                  {/* Portrait Avatar */}
                  <div className={`h-12 w-12 rounded-full overflow-hidden border border-border ${t.avatarBorderClass} transition-all duration-500 shadow-sm flex-shrink-0`}>
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                    <p className={`text-xs text-muted-foreground font-medium mt-0.5 ${t.roleHoverClass} transition-colors duration-300`}>{t.role}</p>
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
