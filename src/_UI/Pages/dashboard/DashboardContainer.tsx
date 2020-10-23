import React, {useState} from "react";
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";
import SearchCardsContainer from "./search/SearchCardsContainer";
import RatingInfoPopup from "../../components/PopUps/rating_info_popup/RatingInfoPopup";


const DashboardContainer:React.FC = () => {
    const search_result = true
    const [isRatingPopup, showRatingPopup] = useState(false)

    return (
        <Layout>
            {search_result
                ? (isRatingPopup ? <RatingInfoPopup showRatingPopup={showRatingPopup} /> : <SearchCardsContainer showRatingPopup={showRatingPopup}/> )
                :  <DashboardPage />}
        </Layout>
    )
}

export default DashboardContainer