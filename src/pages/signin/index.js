import React from "react";
import SignInSection from "./../../components/SignInSection";
import "./styles.scss";

function SigninPage(props) {
  return (
    <SignInSection
      color="white"
      size="large"
      title="Welcome to BankShare"
      subtitle="Send cryptocurrency to your friends using a free wallet attached to your email."
      buttonText="Sign in"
    />
  );
}

export default SigninPage;
