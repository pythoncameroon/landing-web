import {About} from "@/containers/About";
import {FAQ} from "@/containers/FAQ";
import {Footer} from "@/layouts/Footer";
import {Hero} from "@/containers/Hero";
import {HowItWorks} from "@/containers/HowItWorks";
import {Navbar} from "@/layouts/Navbar";
import {ScrollToTop} from "@/components/ScrollToTop";
import {Services} from "@/containers/Services";
import {Sponsors} from "@/containers/Sponsors";
import {Team} from "@/containers/Team";
import {Applications} from "@/containers/Applications";
import "./App.css";


function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Sponsors/>
      <About/>
      <HowItWorks/>
      <Services/>
      <Applications/>
      <Team/>
      {/* Newsletter masquée : pas de backend réel derrière le formulaire, voir AUDIT.md B3 */}
      <FAQ/>
      <Footer/>
      <ScrollToTop/>
    </>
  );
}

export default App;
