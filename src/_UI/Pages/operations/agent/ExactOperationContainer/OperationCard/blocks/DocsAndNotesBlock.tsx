import React, {useState} from "react";
//material ui
import {IconButton} from "@material-ui/core";
//types
import {ShipmentDetailsType} from "../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {
    InfoRow,
    InfoRowLabel,
    InfoRowValue,
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {SectionTitle, SectionWrapper} from "../operation-card-style";
//icons
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import {useTranslation} from "react-i18next";


type PropsType = {
    notes: ShipmentDetailsType[],
    docs: { release_type: any, number_of_documents: any }
}

const DocsAndNotesBlock: React.FC<PropsType> = ({notes, docs}) => {
    const [isHidden, setHidden] = useState(false);
    const {t} = useTranslation();
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
                    style={{width: "14px"}}
                />
            </IconButton>
            {docs.release_type &&
            <div style={{width: "45%"}}>
                <SectionTitle>{t("Bookings/DOCUMENTS")}</SectionTitle>
                {!isHidden && (
                    <div style={{display: "flex"}}>
                        <div style={{width: "40%", display: "flex", flexDirection: "column",}}>
                            <InfoRow>
                                <InfoRowLabel>{t("Bookings/RELEASE TYPE")}</InfoRowLabel>
                                <InfoRowValue>{docs.release_type.title}</InfoRowValue>
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
                                <InfoRowLabel>{t("Bookings/NO. OF PACKS")}</InfoRowLabel>
                                <InfoRowValue>{docs.number_of_documents}</InfoRowValue>
                            </InfoRow>
                        </div>
                    </div>
                )}
            </div>
            }
            {notes.length > 0
            && <div style={{width: "45%"}}>
                <SectionTitle>{t("Operations/NOTES")}</SectionTitle>
                {!isHidden && (
                    <InfoRow>
                        <InfoRowLabel>{t("Operations/Your comment to the client")}</InfoRowLabel>
                        <InfoRowValue>
                            {notes[0].booking_notes}
                        </InfoRowValue>
                    </InfoRow>
                )}
            </div>
            }
        </SectionWrapper>
    );
};

export default DocsAndNotesBlock;
