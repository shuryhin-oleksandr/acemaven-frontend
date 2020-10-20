import React, {useEffect} from "react";
import Layout from "../../../../../components/BaseLayout/Layout";
import Rate from "./Rate";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../../../_BLL/store";
import { withRouter } from "react-router";
import {
    ActivateRateThunk,
    getRateInfoThunk,
    getSurchargeForExactRateThunk
} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {useForm} from "react-hook-form";

const ExactRateContainer = ({...props}) => {
    //useForm
    const { handleSubmit, errors, setValue, control, getValues } = useForm<any>({
        reValidateMode: "onBlur",
    });

    //data from store
    const rate = useSelector((state: AppStateType) => state.rate.rate_info);
    let existing_surcharge = useSelector((state: AppStateType) => state.rate.existing_surcharge)
    const is_active = rate?.is_active
    let id = props.match.params.id;

    //get freight rate info by id
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRateInfoThunk(id));
    }, [dispatch]);

    //thunk for activate or inactivate freight rate
    let activateRateHandler = (id: number, value: boolean) => {
        dispatch(ActivateRateThunk(id, value))
    }
    //ASYNC get surcharges for current rate by click on it
    let getSurchargeForRate = (start_date: Date, expiration_date: Date) => {
        let rate_data = {
            carrier: rate.carrier.id,
            shipping_mode: rate.shipping_mode.id,
            transit_time: rate.transit_time,
            origin: rate.origin.id,
            destination: rate.destination.id,
            start_date: start_date,
            expiration_date: expiration_date

        }
        dispatch(getSurchargeForExactRateThunk(rate_data))
    }

    return (
    <Layout>
      <Rate rate={rate}
            is_active={is_active}
            id={id}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            control={control}
            getValues={getValues}
            activateRateHandler={activateRateHandler}
            getSurchargeForRate={getSurchargeForRate}
            existing_surcharge={existing_surcharge}
      />
    </Layout>
  );
};

export default withRouter(ExactRateContainer);
