import React, {useEffect, useState} from 'react'
import Layout from "../../../../../components/BaseLayout/Layout";
import Surcharge from "./Surcharge";
import {useForm} from "react-hook-form";
import {withRouter} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {
    getEditSurchargeSelector, getIsFetchingSelector,
    getSurcharge
} from "../../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {getSurchargeInfo} from "../../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {surchargeActions} from "../../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import SpinnerForAuthorizedPages from "../../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";


const ExactSurchargeContainer = ({...props}) => {
    //useForm
    const {handleSubmit, errors, setValue, control} = useForm<any>({
        reValidateMode: "onBlur",
    })

    //local state: open\close edit from
    const [formMode, setFormMode] = useState(false)

    //data from store
    let isFetching = useSelector(getIsFetchingSelector)
    let surcharge = useSelector(getSurcharge)
    let edit_success = useSelector(getEditSurchargeSelector)
    let id = props.match.params.id

    //unmount ---> set surcharge_info to null
    let unmountHandler = () => {
        dispatch(surchargeActions.setSurchargeInfo(null))
    }

    //ASYNC: get info about surcharge
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSurchargeInfo(id, props.history))
        return () => unmountHandler()
    }, [dispatch, id])

    //ASYNC: check available dates
    useEffect(() => {
        //surcharge && dispatch(checkSurchargeDates({location: surcharge.location.id,
            //direction: surcharge.direction, shipping_mode: surcharge.shipping_mode.id, carrier: surcharge.carrier.id}))
        if(surcharge) {
            setValue('start_date', surcharge.start_date)
            setValue('expiration_date', surcharge.expiration_date)
        }
    }, [setValue, surcharge, dispatch])

    //close edit from if success
    useEffect(() => {
        if(edit_success) {
            setFormMode(false)
            dispatch(surchargeActions.setEditSurchargeSuccess(''))
        }
    }, [edit_success, dispatch])


    return (
        <Layout>
            {isFetching && !surcharge
                ? <SpinnerForAuthorizedPages/>
                : <Surcharge handleSubmit={handleSubmit}
                       setValue={setValue}
                       surcharge={surcharge}
                       control={control}
                       errors={errors}
                       formMode={formMode}
                       setFormMode={setFormMode}
            />
            }


        </Layout>
    )
}

export default withRouter(ExactSurchargeContainer)