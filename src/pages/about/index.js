import React, { useState } from "react";
import ContentSection from "./../../components/ContentSection";
import TeamBiosSection from "./../../components/TeamBiosSection";
import "./styles.scss";

function AboutPage(props) {
  const [showTeam, setShowTeam] = useState(false)
  return (
    <>
      <ContentSection
        color="primary"
        size="large"
        title="We help you get and send Ethereum to your friends."
        subtitle="Powered by the Torus app framework, BankShare offers the ability to create cryptocurrency wallets and send Ethereum to anyone with a gmail address."
      />
      {showTeam && <TeamBiosSection
        color="white"
        size="medium"
        title="Meet the Team"
        subtitle=""
      />}
    </>
  );
}

export default AboutPage;
