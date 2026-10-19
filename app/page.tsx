import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestCollection from "./components/LatestCollection";
import RichLegacy from "./components/RichLegacy";
import LovedTrusted from "./components/LovedTrusted";
import Celebrities from "./components/Celebrities";
import CraftRevival from "./components/CraftRevival";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ScrollReveal>
          <LatestCollection />
        </ScrollReveal>
        <ScrollReveal>
          <RichLegacy />
        </ScrollReveal>
        <ScrollReveal>
          <LovedTrusted />
        </ScrollReveal>
        <ScrollReveal>
          <Celebrities />
        </ScrollReveal>
        <ScrollReveal>
          <CraftRevival />
        </ScrollReveal>
        <ScrollReveal>
          <Instagram />
        </ScrollReveal>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
