import React from "react";
import Section from "./../Section";
import SectionHeader from "./../SectionHeader";
import Testimonials from "./../Testimonials";
import "./styles.scss";

function TestimonialsSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Testimonials
          items={[
            {
              avatar: "https://uploads.divjoy.com/pravatar-150x-5.jpeg",
              name: "Sarah Kline",
              bio:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
              company: "Company"
            },
            {
              avatar: "https://uploads.divjoy.com/pravatar-150x-48.jpeg",
              name: "Shawna Murray",
              role: "Software Engineer",
              bio:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!",
              company: "Company"
            },
            {
              avatar: "https://uploads.divjoy.com/pravatar-150x-12.jpeg",
              name: "Blake Elder",
              role: "Designer",
              bio:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae.",
              company: "Company"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default TestimonialsSection;
