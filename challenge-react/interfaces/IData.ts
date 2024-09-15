import { ICharity } from "./ICharity";
import { IPayment } from "./IPayment";

export interface Idata {
  charities: ICharity[];
  payments: IPayment[];
}
