import Feature from "../components/Feature";
import About from "../components/About";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title='Streamline Landing Page' />
      <Layout>
        <Hero />
        <Feature />
        <About />
      </Layout>
    </>
  );
}
