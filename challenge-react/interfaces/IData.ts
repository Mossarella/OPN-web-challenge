import { IFoundation } from "./IFoundation";
import { IPayment } from "./IPayment";

export interface Idata {
  charities: IFoundation[];
  payments: IPayment[];
}
