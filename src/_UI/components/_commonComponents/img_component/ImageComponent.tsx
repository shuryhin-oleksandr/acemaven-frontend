import React, {Suspense} from 'react'
import { useImage} from "react-image";
import photo_alt from '../../../../_UI/assets/icons/profile/defaultUserPhoto.svg'

const ImageComponent = (img_url?: any) => {

    const {src} = useImage({
        srcList: img_url || []
    })

    return <img src={src} alt=''/>

}

export default function MyImageComponent (img_url: any) {
    return (
        <Suspense fallback={''}>
            <ImageComponent img_url={img_url} unloader={<img src={photo_alt} alt=""/>}/>
        </Suspense>
    )
}