
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const PageLayout = ({ children, fullWidth = false }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-trans-blue/5 via-white to-trans-pink/5">
      <Navbar />
      <main className={`flex-grow pt-16 w-full max-w-full overflow-x-hidden ${fullWidth ? "" : "container mx-auto px-4 sm:px-6 lg:px-8"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
