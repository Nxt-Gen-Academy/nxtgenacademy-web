import Curriculum from "./components/Curriculum";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Nav from "./components/Nav";
import AlumniNetwork from "./components/AlumniNetwork";
import Pricing from "./components/Pricing";
import Programs from "./components/Programs";
import Projects from "./components/Projects";
import OutcomeRecipe from "./components/OutcomeRecipe";
import Stories from "./components/Stories";
import Trust from "./components/Trust";
import WhyUs from "./components/WhyUs";
import HearFromLearners from "./components/HearFromLearners";
import Faculty from "./components/Faculty";
import AISkillGap from "./components/AISkillGap";

export default function Home() {
  return (
    <div className="bg-background text-foreground noise">
      <Nav />
      <Hero />
      <Trust />
      <OutcomeRecipe />
      <Programs />
      <WhyUs />
      <HearFromLearners />
      <AISkillGap />
      <Faculty />
      <Journey />
      <Projects />
      <Stories />
      <AlumniNetwork />
      <Curriculum />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

