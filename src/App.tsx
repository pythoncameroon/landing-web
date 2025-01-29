import {About} from "./components/About";
import {FAQ} from "./components/FAQ";
import {Footer} from "./components/Footer";
import {Hero} from "./components/Hero";
import {HowItWorks} from "./components/HowItWorks";
import {Navbar} from "./components/Navbar";
import {Newsletter} from "./components/Newsletter";
import {ScrollToTop} from "./components/ScrollToTop";
import {Services} from "./components/Services";
import {Sponsors} from "./components/Sponsors";
import {Team} from "./components/Team";
import {Testimonials} from "./components/Testimonials";
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
      <Testimonials/>
      <Team/>
      <Newsletter/>
      <FAQ/>
      <Footer/>
      <ScrollToTop/>
    </>
  );
}

export default App;
