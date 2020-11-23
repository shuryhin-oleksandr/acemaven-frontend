import React from 'react'
import { SkeletonWrapper } from '../rates&surcharges/rates/sekelton-styles'
import Skeleton from "@material-ui/lab/Skeleton";

const TableSkeleton:React.FC = () => {
    return (
        <SkeletonWrapper>
            <Skeleton variant="text" height={150} style={{ marginBottom: '20px', marginTop: '20px'}}/>
            <Skeleton variant="rect" width={1450} height={420} />
        </SkeletonWrapper>
    )
}

export default TableSkeleton