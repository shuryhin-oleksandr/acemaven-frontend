import React from 'react'
import { SkeletonWrapper } from '../rates&surcharges/rates/sekelton-styles'
import Skeleton from "@material-ui/lab/Skeleton";

const QuotesTableSkeleton:React.FC = () => {
    return (
        <SkeletonWrapper>
            <Skeleton variant="text" height={57} style={{ marginBottom: '40px'}}/>

            <Skeleton variant="rect" width={1450} height={420} />
        </SkeletonWrapper>
    )
}

export default QuotesTableSkeleton