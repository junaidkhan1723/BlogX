import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-auto">
  {/* Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(circle at top center, rgba(59, 130, 246, 0.5),transparent 70%)
      `,
    }}
  />
  {/* Content */}
  <Navbar />
  <main className="z-10 flex-grow flex items-center justify-center">
    <Header />
  </main>
  <Footer />
</div>
  );
}

export default Home;

