import React from 'react'
import {ListEmpty, Subtitle, UpperTitle} from "./empty-list-styles";

const EmptyList:React.FC = () => {
    return (
        <ListEmpty>
            <UpperTitle>Add a new user</UpperTitle>
            <Subtitle>Fulfill the form at the left</Subtitle>
        </ListEmpty>
    )
}

export default EmptyList