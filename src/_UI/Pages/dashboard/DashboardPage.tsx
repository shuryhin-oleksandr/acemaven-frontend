import React, {useState} from "react";
//react-hook-form
import {useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {searchActions} from "../../../_BLL/reducers/search_client/searchClientReducer";
//types
import {
    CargoGroupType,
    ChoiceType,
    SearchResultType,
} from "../../../_BLL/types/search/search_types";
import {
    ContainerType,
    PortType,
    ShippingTypeType,
} from "../../../_BLL/types/rates&surcharges/ratesTypes";
import {CurrentShippingType, ShippingTypesEnum} from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {PackagingType} from "../../../_BLL/types/rates&surcharges/surchargesTypes";
import {OperationType} from "../../../_BLL/types/operations/operationsTypes";
//components
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";
import MapComponent from "./MapComponent/MapComponent";
import ClientBookingPopUp from "../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import ModalWindow from "../../components/_commonComponents/ModalWindow/ModalWindow";
import SearchContainer from "./search/SearchContainer";
import Search from "./Widgets/SearchWidget/Search";
//styles
import {
    WidgetButton,
    DashboardWrapper,
    SearchBox,
    MultiWidgetBox,
    ButtonBox,
    MapWrapper,
    Back,
} from "./dashboard-styles";


type PropsType = {
    setWidgetsVisible: any;
    widgetsVisible: boolean;
    search_result: SearchResultType[];
    shippingValue: number;
    right?: string;
    bottom?: string;
    shippingTypes: ShippingTypeType[];
    setOpenCalcPopup: (value: boolean) => void;
    setShippingValue: (value: number) => void;
    mode: CurrentShippingType;
    setMode: (value: CurrentShippingType) => void;
    cargo_groups: CargoGroupType[] | null;
    packaging_types: PackagingType[] | null;
    disabled: any;
    search_success: boolean;
    setDuplicatedCargoError: (value: string) => void;
    duplicatedCargoError: string;
    origin_ports: PortType[];
    destination_ports: PortType[];
    frozen_choices: ChoiceType[];
    origin_port_value: PortType | null;
    container_types: ContainerType[];
    operations_list: OperationType[]
};

const DashboardPage: React.FC<PropsType> = ({
                                                setWidgetsVisible,
                                                widgetsVisible,
                                                search_result,
                                                shippingValue,
                                                setOpenCalcPopup,
                                                setShippingValue,
                                                setMode,
                                                mode,
                                                cargo_groups,
                                                packaging_types,
                                                container_types,
                                                search_success,
                                                duplicatedCargoError,
                                                setDuplicatedCargoError,
                                                shippingTypes,
                                                origin_ports,
                                                destination_ports,
                                                frozen_choices,
                                                origin_port_value, ...props
                                            }) => {
    const dispatch = useDispatch();

    const [dates, setDates] = useState([]);
    const currentBookingRate = useSelector(
        (state: AppStateType) => state.booking.current_booking_freight_rate
    );
    const [bookingPopupVisible, setBookingPopupVisible] = useState(false); //switch to false!!!
    const auth_user = useSelector((state: AppStateType) => state.profile.authUserInfo
    );

    const {
        handleSubmit,
        register,
        control,
        reset,
        errors,
        getValues,
        setValue,
        watch,
    } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            shipping_mode: "",
            origin: "",
            destination: "",
            cargo_groups: [
                {
                    container_type: "",
                    volume: 0,
                    frozen: "",
                    dangerous: false,
                },
            ],
        },
    });

    let newSearch = () => {
        dispatch(searchActions.setSearchSuccess(false));
        dispatch(searchActions.clearCargoList([]));
        dispatch(searchActions.setSearchResult([]))
        setShippingValue(0);
        reset();
        setDates([]);
    };

    let operations_with_auto_tracking = props.operations_list.filter(o => o.tracking.length > 0 && o)


    let events = operations_with_auto_tracking.map(o => ({
        ...o.tracking_initial,
        locations: o.shipping_type === ShippingTypesEnum.AIR
            ? o.tracking?.map((ot: any) => ot?.data?.events.map((e: any) => ({
                lat: e.ecefLatitude,
                lng: e.ecefLongitude
            })))[0]
            : o.tracking?.map((ot: any) => ot?.data?.data.length > 0 && ot.data.data.locations.filter((l: any) => (l && {
                lat: l.lat,
                lng: l.lng
            })))[0]
    }))


    return (
        <DashboardWrapper>
            {bookingPopupVisible && currentBookingRate &&
            <ModalWindow isOpen={bookingPopupVisible && !!currentBookingRate}>
                <ClientBookingPopUp
                    shippingValue={shippingValue}
                    setBookingPopupVisible={setBookingPopupVisible}
                    currentFreightRate={currentBookingRate}
                    setWidgetsVisible={setWidgetsVisible}
                    newSearch={newSearch}
                    quotes_mode={false}
                />
            </ModalWindow>
            }
            <MapComponent
                isMarkerShown={false}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<MapWrapper/>}
                mapElement={<div style={{height: `100%`}}/>}
                events={events}
            />
            {search_success && <Back/>}
            <SearchBox widgetsVisible={widgetsVisible}>
                {auth_user?.companies && auth_user.companies[0].type === "client" && (
                    <Search
                        setOpenCalcPopup={setOpenCalcPopup}
                        shippingValue={shippingValue}
                        setShippingValue={setShippingValue}
                        setMode={setMode}
                        mode={mode}
                        cargo_groups_list={cargo_groups}
                        packaging_types={packaging_types}
                        container_types={container_types}
                        disabled={search_success}
                        search_result={search_result}
                        search_success={search_success}
                        duplicatedCargoError={duplicatedCargoError}
                        setDuplicatedCargoError={setDuplicatedCargoError}
                        shippingTypes={shippingTypes}
                        origin_ports={origin_ports}
                        destination_ports={destination_ports}
                        frozen_choices={frozen_choices}
                        origin_port_value={origin_port_value}
                        handleSubmit={handleSubmit}
                        register={register}
                        control={control}
                        reset={reset}
                        errors={errors}
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        dates={dates}
                        setDates={setDates}
                    />
                )}
                {search_success && (
                    <SearchContainer
                        search_result={search_result}
                        shippingValue={shippingValue}
                        setBookingPopupVisible={setBookingPopupVisible}
                        setWidgetsVisible={setWidgetsVisible}
                    />
                )}
            </SearchBox>
            {!search_success && (
                <MultiWidgetBox widgetsVisible={widgetsVisible}>
                    <FeePaymentWidget/>
                    <LatestQuotesWidget/>
                    <RackingStatusWidget/>
                </MultiWidgetBox>
            )}

            <ButtonBox>
                <WidgetButton onClick={() => setWidgetsVisible(!widgetsVisible)}>
                    {widgetsVisible ? "Hide widgets" : "Show widgets"}
                </WidgetButton>
            </ButtonBox>
        </DashboardWrapper>
    );
};

export default DashboardPage;
