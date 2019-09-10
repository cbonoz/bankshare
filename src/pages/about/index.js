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
        title="We help you get and send your money"
        subtitle="BankShare offers secure payments and crypto storage with minimal overhead."
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
