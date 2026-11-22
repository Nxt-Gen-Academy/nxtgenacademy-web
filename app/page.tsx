import Accreditations from "./components/Accreditations";
import AISkillGap from "./components/AISkillGap";
import AlumniNetwork from "./components/AlumniNetwork";
import Curriculum from "./components/Curriculum";
import Faculty from "./components/Faculty";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Nav from "./components/Nav";
import OutcomeRecipe from "./components/OutcomeRecipe";
import Programs from "./components/Programs";
import Projects from "./components/Projects";
import Trust from "./components/Trust";
import WhyUs from "./components/WhyUs";
import CareerTransitionPlanner from "@/components/sections/career-transition-planner";

export default function Home() {
  return (
    <div className="bg-background text-foreground noise overflow-x-clip">
      <Nav />
      <Hero />
      <Trust />
      <Accreditations />
      <CareerTransitionPlanner />
      <OutcomeRecipe />
      <AISkillGap />
      <Programs />
      <WhyUs />
      <Faculty />
      <Journey />
      <Projects />
      <AlumniNetwork />
      <Curriculum />
      {/* <Pricing /> */}
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
