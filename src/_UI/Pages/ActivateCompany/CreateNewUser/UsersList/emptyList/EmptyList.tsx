import React from 'react'
import {ListEmpty, Subtitle, UpperTitle} from "./empty-list-styles";

type PropsType = {
    text?: string
}

const EmptyList:React.FC<PropsType> = ({text}) => {
    return (
        <ListEmpty>
            <UpperTitle>Add a {text}</UpperTitle>
            <Subtitle>Fulfill the form at the left</Subtitle>
        </ListEmpty>
    )
}

export default EmptyList