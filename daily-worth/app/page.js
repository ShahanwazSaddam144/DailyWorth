import Auth from "./Auth/Auth";
import FeaturesShowcase from "./components/FeaturesShowcase";
import FinancialLiteracyHub from "./components/FinancialLiteracyHub";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Auth />
      <FeaturesShowcase />
      <FinancialLiteracyHub />
      <Footer />
    </>
  );
}
