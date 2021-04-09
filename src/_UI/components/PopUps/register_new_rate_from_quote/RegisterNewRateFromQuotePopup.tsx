import React, {useEffect} from 'react'
//react-hook-form
import {useForm} from "react-hook-form";
//material ui
import {IconButton} from "@material-ui/core";
//moment
import moment from "moment";
//lodash
import _ from "lodash";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {getShippingTypes} from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import { registerRateAndSurchargeToOfferThunk } from 'src/_BLL/thunks/quotes/agentQuotesThunk';
//types
import {getShippingTypesSelector} from "../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {QuoteType, RateQuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
import {CarrierType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import {SurchargeInfoType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {AppStateType} from "../../../../_BLL/store";
//components
import QuoteAgentExpirationDate from "../../../Pages/quotes/agent/dates/QuoteAgentExpirationDate";
import RatesForQuotesTable from "./RatesForQuotesTables";
import SurchargesForQuotesTables from "./surcharge_tables/SurchargesForQuotesTables";
import AgentSurchargesTable from "../../../Pages/quotes/agent/table/surcharge/AgentSurchargesTable";
import FormField from "../../_commonComponents/Input/FormField";
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
import {useTranslation} from "react-i18next";



type PropsType = {
    openCreatePopup: (value: boolean) => void,
    carrier_field: any,
    carrier_disclosure: string,
    quote: QuoteType | null,
    carriers: CarrierType[],
    existing_rate_for_quote: RateQuoteType | null,
    existing_surcharge_for_quote: SurchargeInfoType | null,
    setIsTemporaryPopup: (value: boolean) => void,
    save_rate_result: boolean,
    isCheck: boolean,
    setIsCheck: (value: boolean) => void
}

const RegisterNewRateFromQuotePopup: React.FC<PropsType> = ({openCreatePopup, carrier_field, carriers, quote, existing_rate_for_quote, ...props}) => {

    const {handleSubmit, errors, control, register, setValue} = useForm({
        reValidateMode: 'onBlur',
        mode: 'onSubmit'
    })
    const onSubmit = (values: any) => {
        let surcharge_data;
        let freight_data;

        //temporal surcharge registration
        if (!props.existing_surcharge_for_quote) {
            //additional charges
            let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
            let additional_charges_array = charges_array.map(a => {
                if (a.conditions) {
                    return {
                        additional_surcharge: a.additional_surcharge,
                        charge: a.charge ? _.ceil(a.charge,2) : 0,
                        conditions: a.conditions,
                        currency: a.currency
                    }
                } else if (!a.conditions) {
                    return {
                        charge: a.charge ? _.ceil(a.charge,2) : 0,
                        additional_surcharge: a.additional_surcharge,
                        currency: a.currency
                    }
                } else {
                    return a
                }
            })

            //containers & packaging charges
            let fees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null
            let usageFees_array = fees_array?.map(f => f.charge && {
                    container_type: f.container_type,
                    currency: f.currency,
                    charge: f.charge
                }
                || !f.charge && {container_type: f.container_type, currency: f.currency}
            )

            let data = {
                carrier: carrier_field,
                direction: quote?.origin.is_local === true ? 'export' : 'import',
                shipping_mode: quote?.shipping_mode.id,
                start_date: quote?.date_from,
                expiration_date: moment(values.date_to).format('DD/MM/YYYY'),
                charges: additional_charges_array,
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
                charges: additional_charges_array,
                location: quote?.origin.is_local === true ? quote?.origin.id : quote?.destination.id,
                temporary: true
            }
            //data for thunk
           surcharge_data =  usageFees_array !== null
               ? data
               : data_without_fees
        }

        //temporal rate registration
        let rates_array;
        let rate_data;
        let rate_data_without_containers;
        if (values.rates.length > 1) {
            let full_rates = values.rates.filter((r: any) => r !== null);
            rates_array = full_rates.map((r: any) => (r !== null && r.rate
                && {
                    container_type: r.container_type,
                    currency: r.currency,
                    rate: r.rate,
                    start_date: quote?.date_from,
                    expiration_date: moment(values.date_to).format('DD/MM/YYYY')
                })
                || (r !== null && !r.rate && {container_type: r.container_type, currency: r.currency})
            );
            rate_data = {
                carrier: carrier_field,
                carrier_disclosure: props.carrier_disclosure === 'true',
                shipping_mode: quote?.shipping_mode.id,
                transit_time: Number(values.transit_time),
                origin: Number(quote?.origin.id),
                destination: Number(quote?.destination.id),
                rates: rates_array,
                temporary: true
            };

        } else {
            rate_data_without_containers = {
                carrier: carrier_field,
                carrier_disclosure: props.carrier_disclosure === 'true',
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
        }

        freight_data = (values.rates.length > 1)
            ? rate_data
            : rate_data_without_containers

        //THUNK
        dispatch(registerRateAndSurchargeToOfferThunk(surcharge_data, freight_data))
    }

    
    //data from store
    const shipping_types = useSelector(getShippingTypesSelector)
    const shippingModeOptions = (quote?.shipping_type === ShippingTypesEnum.AIR) ? shipping_types[0]?.shipping_modes : shipping_types[1]?.shipping_modes
    const usageFees = shippingModeOptions?.find(m => m.id === quote?.shipping_mode.id)?.container_types || []
    const additional = shippingModeOptions?.find(m => m.id === quote?.shipping_mode.id)?.additional_surcharges || []
    const additionalTableName = (quote?.shipping_type === ShippingTypesEnum.AIR) ? 'USAGE FEES' : 'HANDLING'
    const additionalType = (quote?.shipping_type === ShippingTypesEnum.AIR) ? 'ULD TYPES' : 'CONTAINER TYPE'
    const finded_first = useSelector((state: AppStateType) => state.agent_quotes.finded_first)


    let quote_containers = quote?.cargo_groups.map(c => {
        return {
            id: c.container_type?.id,
            code: c.container_type?.code,
            shipping_mode: c.container_type?.shipping_mode,
            is_frozen: c.container_type?.is_frozen,
            can_be_dangerous: c.container_type?.can_be_dangerous
        }
    })
    let exact_usageFees = quote_containers && (_.intersectionWith(usageFees, quote_containers, _.isEqual))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getShippingTypes(''))
    }, [dispatch])

    useEffect(() => {
        if (existing_rate_for_quote && props.save_rate_result) {
            openCreatePopup(false)
        }
    }, [existing_rate_for_quote, props.save_rate_result])
    const {t} = useTranslation();
    return (
        <RegisterRateWrapper onSubmit={handleSubmit(onSubmit)}>
            <RegisterRateInner>
                <IconButton onClick={() => openCreatePopup(false)}
                            style={{position: 'absolute', top: '20px', right: '20px'}}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <RegisterRateContent>
                    <HeaderControllers>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            {/*<div style={{*/}
                            {/*    display: "flex",*/}
                            {/*    flexDirection: 'column',*/}
                            {/*    maxWidth: '350px',*/}
                            {/*    width: '100%',*/}
                            {/*    marginRight: '35px'*/}
                            {/*}}>*/}
                            {/*    <GeneralTitle margin_bottom='10px'>CARRIER</GeneralTitle>*/}
                            {/*    <Controller name='carrier'*/}
                            {/*                control={control}*/}
                            {/*                defaultValue={carrier_field}*/}
                            {/*                disabled={true}*/}
                            {/*                rules={{*/}
                            {/*                    required: 'Field is required'*/}
                            {/*                }}*/}
                            {/*                as={*/}
                            {/*                    <SurchargeRateSelect placeholder='Carrier company name'*/}
                            {/*                                         error={errors?.carrier?.message}*/}
                            {/*                                         options={carriers}*/}
                            {/*                                         margin_right='35px'*/}
                            {/*                                         margin_bottom='21px'*/}
                            {/*                    />*/}
                            {/*                }*/}
                            {/*    />*/}

                            {/*</div>*/}
                            <div style={{
                                display: "flex",
                                flexDirection: 'column',
                                maxWidth: '300px',
                                width: '100%',
                                marginRight: '35px'
                            }}>
                                <GeneralTitle margin_bottom='15px'>{t("Quote bid screen/EXPIRATION DATE")}</GeneralTitle>
                                <QuoteAgentExpirationDate control={control}
                                                          setValue={setValue}
                                                          date_to={String(quote?.date_to)}
                                                          error={errors.date_to}
                                />
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: 'column',
                                maxWidth: '300px',
                                width: '100%',
                                marginRight: '35px'
                            }}>
                                <GeneralTitle margin_bottom='15px'>{t("Bookings/TRANSIT TIME")}</GeneralTitle>
                                <FormField name='transit_time'
                                           error={errors?.transit_time}
                                           inputRef={register({required: 'Field is required'})}
                                           marginBottom='25px'
                                           placeholder='0 days'
                                />
                            </div>
                        </div>

                        {/*<GeneralCustomCheckbox inputRef={register}*/}
                        {/*                       name='carrier_disclosure'*/}
                        {/*                       setValue={setValue}*/}
                        {/*                       isCheck={props.isCheck}*/}
                        {/*                       setIsCheck={props.setIsCheck}*/}
                        {/*                       value={props.isCheck}*/}
                        {/*                       span_text='I want to disclose the carrier info to the customers'*/}

                        {/*/>*/}
                    </HeaderControllers>
                    <RatesForQuotesTable usageFees={exact_usageFees ? exact_usageFees : usageFees}
                                         quote_shipping_mode_id={Number(quote?.shipping_mode.id)}
                                         control={control}
                                         register={register}
                                         setValue={setValue}
                    />
                    {props.existing_surcharge_for_quote && finded_first
                        ? <AgentSurchargesTable surcharges={props.existing_surcharge_for_quote}
                        />
                        : <SurchargesForQuotesTables containers={exact_usageFees ? exact_usageFees : usageFees}
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
                        <FormButton type='submit'>{t("Quote bid screen/SEND")}</FormButton>
                        <FormCancelButton type={'button'}
                                          onClick={() => openCreatePopup(false)}>{t("Quote bid screen/CANCEL")}</FormCancelButton>
                    </FormButtonsWrapper>
                </RegisterRateContent>
            </RegisterRateInner>
        </RegisterRateWrapper>
    )
}

export default RegisterNewRateFromQuotePopup