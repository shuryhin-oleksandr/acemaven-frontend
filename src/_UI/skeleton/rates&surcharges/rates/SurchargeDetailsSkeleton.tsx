import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import {SkeletonWrapper} from "./sekelton-styles";


const SurchargeDetailsSkeleton = () => {
    return (
        <SkeletonWrapper>
            <Skeleton variant="text" height={57} style={{ marginBottom: '40px'}}/>
            <div style={{display: "flex", marginBottom: '30px'}}>
                <Skeleton variant="rect" width={99} height={99} style={{marginRight: '35px'}}/>
                <Skeleton variant='rect' width={395} height={99}/>
            </div>
            <Skeleton variant="rect" width={1121} height={420} />
        </SkeletonWrapper>
    )
}

export default SurchargeDetailsSkeleton