import React from "react";
import { Container, Heading } from "./baseWidgett-styles";

interface IProps {
  heading: string;
  children?: any;
}

const BaseWidget: React.FC<IProps> = ({ heading, children }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      {children}
    </Container>
  );
};

export default BaseWidget;
