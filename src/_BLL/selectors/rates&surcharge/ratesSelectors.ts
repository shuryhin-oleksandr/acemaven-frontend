import {AppStateType} from "../../store";

export const getOriginPorts = ((state: AppStateType) => state.rate.origin_ports)
export const getDestinationPorts = ((state: AppStateType) => state.rate.destination_ports)