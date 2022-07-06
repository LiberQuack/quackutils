import {Dictionary} from "../../../../types";
import {PaymentProduct} from "../../../payment/types";
import {GtagProduct} from "../tracking-types";

export type GoogleTrackingBaseOpts = {

    /**
     * Also known as gaClientId
     */
    clientId: string;

    /**
     * 3 digits currency code
     * https://en.wikipedia.org/wiki/ISO_4217#Active_codes
     */
    fallbackCurrency: string,

    debug?: boolean,
    fixedDimensions?: Dictionary<string>,
    productTrackerEnhancer?: <P extends PaymentProduct>(product: P) => GtagProduct
};