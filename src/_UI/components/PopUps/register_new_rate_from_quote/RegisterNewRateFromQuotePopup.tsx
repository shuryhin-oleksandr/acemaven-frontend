import React, {useEffect} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//material ui
import {IconButton} from "@material-ui/core";
//moment
import moment from "moment";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//types
import {getShippingTypesSelector} from "../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {QuoteType, RateQuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
import {CarrierType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";
//BLL
import { getShippingTypes} from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {addNewSurchargeForRate, registerNewFreightRateThunk} from "../../../../_BLL/thunks/rates&surcharge/rateThunks";
//components
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import QuoteAgentExpirationDate from "../../../Pages/quotes/agent/dates/QuoteAgentExpirationDate";
import RatesForQuotesTable from "./RatesForQuotesTables";
import SurchargesForQuotesTables from "./surcharge_tables/SurchargesForQuotesTables";
//styles
import {
    FormButton,
    FormButtonsWrapper, FormCancelButton,
    HeaderControllers,
    RegisterRateContent,
    RegisterRateInner,
    RegisterRateWrapper
} from "./register-new-rate-from-quote-styles";
import {GeneralTitle} from "../../../Pages/quotes/agent/table/agent-quotes-styles";
//icons
import close_icon from '../../../../_UI/assets/icons/close-icon.svg'
import { useHistory } from 'react-router-dom';
import {SurchargeInfoType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import AgentSurchargesTable from "../../../Pages/quotes/agent/table/surcharge/AgentSurchargesTable";
import GeneralCustomCheckbox from "../../_commonComponents/customCheckbox/GeneralCustomCheckbox";
import {AppStateType} from "../../../../_BLL/store";
import FormField from "../../_commonComponents/Input/FormField";


type PropsType = {
    openCreatePopup: (value: boolean) => void,
    carrier_field: any,
    quote: QuoteType | null,
    carriers: CarrierType[],
    existing_rate_for_quote: RateQuoteType | null,
    existing_surcharge_for_quote:  SurchargeInfoType | null,
    setIsTemporaryPopup: (value: boolean) => void,
    save_rate_result: boolean,
    isCheck: boolean,
    setIsCheck: (value: boolean) => void
}

const RegisterNewRateFromQuotePopup:React.FC<PropsType> = ({openCreatePopup, carrier_field, carriers, quote, existing_rate_for_quote, ...props}) => {

    const history = useHistory()
    const {handleSubmit, errors, control, register, setValue} = useForm({
        reValidateMode: 'onBlur', mode: 'onSubmit'
    })
    const onSubmit = (values: any) => {
        //temporal surcharge registration
        if(!props.existing_surcharge_for_quote) {
            let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
            let fees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null

            let usageFees_array = fees_array?.map(f => f.charge && {container_type: f.container_type,currency: f.currency, charge: f.charge}
                || !f.charge && {container_type: f.container_type, currency: f.currency}
            )

            let data = {
                carrier: carrier_field,
                direction: quote?.origin.is_local === true ? 'export' : 'import',
                shipping_mode: quote?.shipping_mode.id,
                start_date: quote?.date_from,
                expiration_date: moment(values.date_to).format('DD/MM/YYYY'),
                charges: charges_array,
                usage_fees: usageFees_array,
                location: quote?.origin.is_local === true ? quote?.origin.id : quote?.destination.id,
                temporary: true
            }

            let data_without_fees = {
                start_date: quote?.date_from,
                expiration_date: moment(values.date_to).format('DD/MM/YYYY'),
                carrier: carrier_field,
                direction: quote?.origin.is_local === true ? 'export' : 'import',
                shipping_mode: quote?.shipping_mode.id,
                charges: charges_array,
                location: quote?.origin.is_local === true ? quote?.origin.id : quote?.destination.id,
                temporary: true
            }
            usageFees_array !== null ? dispatch(addNewSurchargeForRate(data)) : dispatch(addNewSurchargeForRate(data_without_fees))
        }

        //temporal rate registration
        let rates_array;
        if (values.rates.length > 1) {
            let full_rates = values.rates.filter((r: any) => r !== null);
            rates_array = full_rates.map((r: any) => (r !== null && r.rate
                && {container_type: r.container_type, currency: r.currency, rate: r.rate, start_date: quote?.date_from, expiration_date: moment(values.date_to).format('DD/MM/YYYY')})
                || (r !== null && !r.rate && {container_type: r.container_type, currency: r.currency})
            );
            let data = {
                carrier: carrier_field,
                carrier_disclosure: values.carrier_disclosure,
                shipping_mode: quote?.shipping_mode.id,
                transit_time: Number(values.transit_time),
                origin: Number(quote?.origin.id),
                destination: Number(quote?.destination.id),
                rates: rates_array,
                temporary: true
            };
            dispatch(registerNewFreightRateThunk(data, history));
        } else {
            let data_without_containers = {
                carrier: carrier_field,
                carrier_disclosure: values.carrier_disclosure,
                shipping_mode: quote?.shipping_mode.id,
                transit_time: Number(values.transit_time),
                origin: Number(quote?.origin.id),
                destination: Number(quote?.destination.id),
                temporary: true,
                rates: [
                    {
                        currency: values.rates.currency,
                        rate: values.rates.rate,
                        start_date: quote?.date_from,
                        expiration_date: moment(values.date_to).format('DD/MM/YYYY')
                    },
                ],
            };
            dispatch(registerNewFreightRateThunk(data_without_containers, history));
        }

    }

    //data from store
    const shipping_types = useSelector(getShippingTypesSelector)
    const shippingModeOptions = (quote?.shipping_type === ShippingTypesEnum.AIR) ? shipping_types[0]?.shipping_modes : shipping_types[1]?.shipping_modes
    const usageFees = shippingModeOptions?.find(m => m.id === quote?.shipping_mode.id)?.container_types || []
    const additional = shippingModeOptions?.find(m => m.id === quote?.shipping_mode.id)?.additional_surcharges || []
    const additionalTableName = (quote?.shipping_type === ShippingTypesEnum.AIR) ? 'USAGE FEES' : 'HANDLING'
    const additionalType = (quote?.shipping_type === ShippingTypesEnum.AIR) ? 'ULD TYPES' : 'CONTAINER TYPE'
    const finded_first = useSelector((state: AppStateType) => state.agent_quotes.finded_first)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getShippingTypes(''))
    }, [dispatch])

    useEffect(() => {
        if(existing_rate_for_quote && props.save_rate_result) {
            openCreatePopup(false)
        }
    }, [existing_rate_for_quote, props.save_rate_result])

    return(

            <RegisterRateWrapper onSubmit={handleSubmit(onSubmit)}>
                <RegisterRateInner>
                    <IconButton onClick={() => openCreatePopup(false)}
                                style={{position: 'absolute', top: '20px', right: '20px'}}>
                        <img src={close_icon} alt=""/>
                    </IconButton>
                    <RegisterRateContent>
                        <HeaderControllers>
                            <div style={{display: "flex", flexDirection: 'column', maxWidth: '350px', width: '100%',marginRight: '35px'}}>
                                <GeneralTitle margin_bottom='10px'>CARRIER</GeneralTitle>
                                <Controller name='carrier'
                                            control={control}
                                            defaultValue={carrier_field}
                                            disabled={true}
                                            rules={{
                                                required: 'Field is required'
                                            }}
                                            as={
                                                <SurchargeRateSelect placeholder='Carrier company name'
                                                                     error={errors?.carrier?.message}
                                                                     options={carriers}
                                                                     margin_right='35px'
                                                />
                                            }
                                />
                                <GeneralCustomCheckbox inputRef={register}
                                                       name='carrier_disclosure'
                                                       setValue={setValue}
                                                       isCheck={props.isCheck}
                                                       setIsCheck={props.setIsCheck}
                                                       value={props.isCheck}
                                                       span_text='I want to disclose the carrier info to the customers'

                                />
                            </div>
                            <div style={{display: "flex", flexDirection: 'column', maxWidth: '300px', width: '100%',marginRight: '35px'}}>
                                <GeneralTitle margin_bottom='15px'>EXPIRATION DATE</GeneralTitle>
                                <QuoteAgentExpirationDate control={control}
                                                          setValue={setValue}
                                                          before_date={String(quote?.date_to)}
                                />
                            </div>
                            <div style={{display: "flex", flexDirection: 'column', maxWidth: '300px', width: '100%',marginRight: '35px'}}>
                                <GeneralTitle margin_bottom='15px'>TRANSIT TIME</GeneralTitle>
                                    <FormField name='transit_time'
                                               error={errors?.transit_time}
                                               inputRef={register({required: 'Field is required'})}
                                               marginBottom='25px'
                                               placeholder='0 days'
                                    />
                            </div>
                        </HeaderControllers>
                        <RatesForQuotesTable usageFees={usageFees}
                                             quote_shipping_mode_id={Number(quote?.shipping_mode.id)}
                                             control={control}
                                             register={register}
                                             setValue={setValue}
                        />
                        {props.existing_surcharge_for_quote && finded_first
                            ? <AgentSurchargesTable surcharges={props.existing_surcharge_for_quote}
                            />
                            : <SurchargesForQuotesTables containers={usageFees}
                                                         additional={additional}
                                                         quote_shipping_mode_id={Number(quote?.shipping_mode.id)}
                                                         additionalTableName={additionalTableName}
                                                         additional_type={additionalType}
                                                         control={control}
                                                         register={register}
                                                         setValue={setValue}
                            />
                        }

                        <FormButtonsWrapper>
                            <FormButton type='submit'>SEND</FormButton>
                            <FormCancelButton type={'button'} onClick={() => openCreatePopup(false)}>CANCEL</FormCancelButton>
                        </FormButtonsWrapper>
                    </RegisterRateContent>
                </RegisterRateInner>
            </RegisterRateWrapper>
    )
}

export default RegisterNewRateFromQuotePopup