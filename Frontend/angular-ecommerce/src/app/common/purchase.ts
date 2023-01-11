import { Order } from './order';
import { Address } from './address';
import { Customer } from './customer';
import { OrdrItem } from './ordr-item';
export class Purchase {
 
    Customer?:Customer;
     shippingAddress?:Address;
     billingAddress?:Address;
     order?:Order;
     orderItems?:OrdrItem[]; 
}
