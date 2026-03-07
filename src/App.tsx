import {About} from "./components/About";
import {FAQ} from "./components/FAQ";
import {Footer} from "./layouts/Footer";
import {Hero} from "./components/Hero";
import {HowItWorks} from "./components/HowItWorks";
import {Navbar} from "./layouts/Navbar";
import {Newsletter} from "./components/Newsletter";
import {ScrollToTop} from "./components/ScrollToTop";
import {Services} from "./components/Services";
import {Sponsors} from "./components/Sponsors";
import {Team} from "./components/Team";
import {Applications} from "./components/Testimonials";
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
      <Newsletter/>
      <FAQ/> 
      <Footer/>
      <ScrollToTop/>
    </>
  );
}

export default App;
