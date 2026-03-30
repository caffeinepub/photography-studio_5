import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
