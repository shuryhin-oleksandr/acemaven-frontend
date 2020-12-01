import React, {useEffect, useState} from "react";
import { SectionTitle, SectionWrapper } from "../operation-card-style";
import { IconButton } from "@material-ui/core";
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import {
    EditButtonsWrapper,
    FormOperationButton, GeneralBookingContentForm,
    InfoRowLabel
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import CargoGroupsTable from "./Tables/CargoGroupsTable";
import {CargoGroupQuoteType} from "../../../../../../../_BLL/types/quotes/quotesTypes";
import edit_icon from '../../../../../../assets/icons/profile/editCard.svg'
import close_icon from "../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../assets/icons/profile/add.svg";
import FormField from "../../../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import {editOperationByAgentThunk} from "../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {useDispatch, useSelector} from "react-redux";
import {getEditOperationSuccessSelector} from "../../../../../../../_BLL/selectors/operations/agentOperationsSelector";

type PropsType = {
    operation_shipping_type: string,
    operation_cargo_groups: CargoGroupQuoteType[],
    operation_shipping_mode: {id: number, title: string},
    free_time?: number,
    status: string,
    shipment_id: number
}

const CargoBlock: React.FC<PropsType> = ({operation_shipping_type, operation_cargo_groups, operation_shipping_mode, free_time, status, ...props}) => {
  const [isHidden, setHidden] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

    let edit_success = useSelector(getEditOperationSuccessSelector)

    const dispatch = useDispatch()
    const {register, handleSubmit, errors, setValue} = useForm()
   const onSubmit = (values: any) => {
       dispatch(editOperationByAgentThunk(values, props.shipment_id as number))
   }

    useEffect(() => {
        if(edit_success) {
            setIsEdit(false)
        }
    }, [edit_success])

  return (
   <GeneralBookingContentForm onSubmit={handleSubmit(onSubmit)}>
    <SectionWrapper style={{position: "relative"}}>
        {status === "Booking Confirmed" && (
            !isEdit
            ? <IconButton onClick={() => setIsEdit(true)} style={{position: 'absolute', right: '18px', top: '65px'}}>
            <img src={edit_icon} alt=""/>
            </IconButton>
            :  <EditButtonsWrapper top='65px' right='18px'>
            <FormOperationButton type='button' onClick={() => setIsEdit(false)} style={{padding: '5px'}}>
            <img src={close_icon} alt=""/>
            </FormOperationButton>
            <FormOperationButton type='submit' style={{padding: '5px'}}>
            <img src={save_icon} alt="" />
            </FormOperationButton>
            </EditButtonsWrapper>
            )
        }

      <IconButton style={{padding: "0px", height: "35px", width: "35px", position: "absolute", right: "20px"}}
                  onClick={() => (isHidden ? setHidden(false) : setHidden(true))}>
        <img src={isHidden ? down_arrow : up_arrow} alt="" style={{ width: "14px" }}/>
      </IconButton>
      <div>
        <SectionTitle>CARGO</SectionTitle>
        {!isHidden && (
            <>
            {operation_shipping_type === 'sea' && status === "Booking Confirmed" &&
                <div style={{ display: "flex", marginBottom: '20px' }}>
                    <InfoRowLabel style={{marginRight: '5px'}}>CONTAINER FREE TIME:</InfoRowLabel>
                    {isEdit
                        ? <FormField name='container_free_time'
                                     defaultValue={free_time ? free_time : '0'}
                                     error={errors?.container_free_time}
                                     type='number'
                                     inputRef={register({
                                         required: 'Field is required'
                                     })}
                                     placeholder='0 Days'
                                     maxW='80px'
                                     height='30px'
                                     marginBottom='0px'
                        />
                        : <span style={{ marginLeft: "5px" }}>{free_time} DAYS</span>
                    }

                </div>
            }
                <CargoGroupsTable cargo_groups={operation_cargo_groups}
                                  object_shipping_mode={operation_shipping_mode}
                />
            </>
        )}
      </div>
    </SectionWrapper>
   </GeneralBookingContentForm >
  );
};

export default CargoBlock;
