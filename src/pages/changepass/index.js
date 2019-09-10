import React from "react";
import ChangePassSection from "./../../components/ChangePassSection";
import "./styles.scss";

function ChangepassPage(props) {
  return (
    <ChangePassSection
      color="white"
      size="large"
      title="Choose a new password"
      subtitle=""
      buttonText="Change password"
    />
  );
}

export default ChangepassPage;
