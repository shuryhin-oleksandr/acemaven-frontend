import React from 'react'
import Skeleton from "@material-ui/lab/Skeleton";
import {SkeletonWrapper} from "../rates&surcharges/rates/sekelton-styles";


const QuoteBookingDetailsSkeleton:React.FC = () => {

    return (
        <SkeletonWrapper>
            <div style={{ width: '100%', marginBottom: '20px'}}>
                <Skeleton variant="text" height={200} />
            </div>
            <div style={{display: "flex", marginBottom: '40px', width: '100%'}}>
                <Skeleton variant="rect" width={'18%'} height={200} style={{marginRight: '35px'}}/>
                <Skeleton variant='rect' width={'82%'} height={200}/>
            </div>
            <Skeleton variant="rect" height={240} style={{ marginBottom: '20px'}}/>
            <Skeleton variant="rect" height={180} style={{ marginBottom: '20px'}}/>
            <Skeleton variant="rect" height={240} style={{ marginBottom: '20px'}}/>
            <Skeleton variant="rect" height={420} />
        </SkeletonWrapper>
    )
}

export default QuoteBookingDetailsSkeleton