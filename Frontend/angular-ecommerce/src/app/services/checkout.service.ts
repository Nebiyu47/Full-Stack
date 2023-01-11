import { Observable } from 'rxjs';
import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private HttpClient: HttpClient) { }

  placeOrder(Purchase: Purchase): Observable<any> {
    return this.HttpClient.post<Purchase>(this.purchaseUrl, Purchase);
  }

}

