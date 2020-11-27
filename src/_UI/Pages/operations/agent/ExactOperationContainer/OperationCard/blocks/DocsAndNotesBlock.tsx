import React, { useState } from "react";
import { SectionTitle, SectionWrapper } from "../operation-card-style";
import { IconButton } from "@material-ui/core";
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import {
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";

type PropsType = {
    notes: any,
    docs: {release_type: any, number_of_documents: any}
}

const DocsAndNotesBlock:React.FC<PropsType> = ({notes, docs}) => {
  const [isHidden, setHidden] = useState(false);
  return (
    <SectionWrapper
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <IconButton
        style={{
          padding: "0px",
          height: "35px",
          width: "35px",
          position: "absolute",
          right: "20px",
        }}
        onClick={() => (isHidden ? setHidden(false) : setHidden(true))}
      >
        <img
          src={isHidden ? down_arrow : up_arrow}
          alt=""
          style={{ width: "14px" }}
        />
      </IconButton>
        {docs.release_type &&
            <div style={{width: "45%"}}>
            <SectionTitle>DOCUMENTS</SectionTitle>
            {!isHidden && (
                <div style={{display: "flex"}}>
                    <div style={{width: "40%", display: "flex", flexDirection: "column",}}>
                        <InfoRow>
                            <InfoRowLabel>Release type</InfoRowLabel>
                            <InfoRowValue>{docs.release_type}</InfoRowValue>
                        </InfoRow>
                    </div>
                    <div
                        style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <InfoRow>
                            <InfoRowLabel>No. of Documents</InfoRowLabel>
                            <InfoRowValue>{docs.number_of_documents}</InfoRowValue>
                        </InfoRow>
                    </div>
                </div>
            )}
        </div>
        }
        {notes.length > 0
            && <div style={{ width: "45%" }}>
            <SectionTitle>NOTES</SectionTitle>
             {!isHidden && (
            <InfoRow>
                <InfoRowLabel>Your comment to the client</InfoRowLabel>
                <InfoRowValue>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet int. Velit officia consequat duis enim velit mollit.
                </InfoRowValue>
             </InfoRow>
            )}
            </div>
        }
    </SectionWrapper>
  );
};

export default DocsAndNotesBlock;
