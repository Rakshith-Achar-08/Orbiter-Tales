import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveFacts from "../components/InteractiveFacts";

function FactsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <InteractiveFacts />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default FactsPage;
