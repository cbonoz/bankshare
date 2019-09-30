import React from "react";
import HeroSection from "./../../components/HeroSection";
import FeaturesSection from "./../../components/FeaturesSection";
import TestimonialsSection from "./../../components/TestimonialsSection";
import NewsletterSection from "./../../components/NewsletterSection";
import { useRouter } from "./../../util/router.js";
import "./styles.scss";

const SUBTITLE = "BankShare is a platform for sending Ethereum to your friends using just  email addresses."

function HomePage(props) {
  const router = useRouter();

  return (
    <>
      <HeroSection
        color="white"
        size="medium"
        title="Microlending amongst friends"
        subtitle={SUBTITLE}
        buttonText="Get Started"
        image="https://uploads.divjoy.com/undraw-japan_ubgk.svg"
        buttonOnClick={() => {
          router.push("/signin");
        }}
      />

      <FeaturesSection
        color="white"
        size="medium"
        title="Features"
      />
    </>
  );
}

export default HomePage;
