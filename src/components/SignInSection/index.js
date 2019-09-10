import React from "react";
import Section from "./../Section";
import SectionHeader from "./../SectionHeader";
import SignIn from "./../SignIn";
import { useRouter } from "./../../util/router.js";
import "./styles.scss";

import logo from '../../assets/bankshare_icon.png'

function SignInSection(props) {
  const router = useRouter();

  // Go to page after signin
  const onSignin = () => {
    router.push("/dashboard");
  };

  return (
    <div color={props.color} size={props.size}>
      <div className="container">
        <div className='image-block'>
          <img src={logo} className='centered image-block'/>
        </div>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <SignIn
          buttonText={props.buttonText}
          parentColor={props.color}
          onSignin={onSignin}
        />
      </div>
    </div>
  );
}

export default SignInSection;
