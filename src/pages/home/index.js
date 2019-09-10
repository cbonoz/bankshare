import React from "react";
import HeroSection from "./../../components/HeroSection";
import FeaturesSection from "./../../components/FeaturesSection";
import TestimonialsSection from "./../../components/TestimonialsSection";
import NewsletterSection from "./../../components/NewsletterSection";
import { useRouter } from "./../../util/router.js";
import "./styles.scss";

const SUBTITLE = "BankShare is a cryptocurrency banking and lending system backed by Layer 2 protocols, without the mess of managing private and public keys. Create an account with just your email."

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
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      />
      {/* <TestimonialsSection
        color="light"
        size="medium"
        title="Here's what people are saying"
        subtitle=""
      /> */}
      <NewsletterSection
        color="white"
        size="medium"
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      />
    </>
  );
}

export default HomePage;
