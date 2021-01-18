import React from "react";
import {Container, Heading} from "./baseWidget-styles";


interface IProps {
    heading: string;
    children?: any;
}

const BaseWidgetContainer: React.FC<IProps> = ({heading, children}) => {
    return (
        <Container>
            <Heading>{heading}</Heading>
            {children}
        </Container>
    );
};

export default BaseWidgetContainer;
