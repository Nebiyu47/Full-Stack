import { OrderHistory } from './../common/order-history';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
   private orderUrl = 'http://localhost:8080/api/orders';
   
  constructor(private HttpClient: HttpClient) { }
  getOrderHistory(theEmail: string) :Observable<GetResponseOrderHistory>{



    const OrderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;

    return this.HttpClient.get<GetResponseOrderHistory>(OrderHistoryUrl);
  }
}
interface GetResponseOrderHistory {
  _embedded : {
    Orders: OrderHistory[];
  }
}