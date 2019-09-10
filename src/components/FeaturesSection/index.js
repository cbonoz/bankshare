import React from "react";
import Section from "./../Section";
import Features from "./../Features";
import "./styles.scss";

function FeaturesSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <Features
          items={[
            {
              title: "Expand your cryptocurrency network.",
              description: "Create an account just by connecting your email. No credit card, social security, address, or other personal information needed.",
              image: "https://uploads.divjoy.com/undraw-mind_map_cwng.svg"
            },
            {
              title: "Send cryptocurrencies instantly with just an email.",
              description: "Friend doesn't have a cryptocurrency account? Not a problem, with BankShare we'll automatically create an account for them if needed!",
              image: "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
            },
            {
              title: "Celebrate!",
              description: "You've got money! Invite more friends to the platform and start paying them back the easy way with cryptocurrency.",
              image: "https://uploads.divjoy.com/undraw-having_fun_iais.svg"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default FeaturesSection;
