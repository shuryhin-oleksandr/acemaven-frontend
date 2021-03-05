import { PortType } from "../rates&surcharges/ratesTypes";
import { ChargeCalculationType, RateQuoteType } from "../quotes/quotesTypes";
import {
  InitialTrackingType,
  TrackingBackendType,
} from "../operations/operationsTypes";
import { TransactionType } from "../bookingTypes";

export type ExchangeCurrenciesType = {
  id: number;
  rate: string;
  spread: string;
  currency: number | string;
};

export type ExchangeRateType = {
  id: number;
  date: string;
  rates: Array<ExchangeCurrenciesType>;
};

export type BillingOperationType = {
  id: number;
  aceid: string;
  booking_number: string;
  origin: PortType;
  destination: PortType;
  shipping_type: string;
  shipping_mode: string;
  payment_due_by: string;
  status: string;
  carrier: string;
  charges: ChargeCalculationType;
  vessel: string;
  client: string;
  dates?: string;
  date_created?: string;
  tracking: TrackingBackendType[];
  tracking_initial?: InitialTrackingType | null;
  automatic_tracking?: boolean;
  transactions: TransactionType[];
  number_of_documents?: number;
};
