import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history'; 
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
   orderHistoryList: OrderHistory[]= [];
   storage: Storage =sessionStorage;
  constructor(private OrderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
  }
  handleOrderHistory(){
    const theEmail = JSON.stringify(this.storage.getItem('userEmail'));
    this.OrderHistoryService.getOrderHistory(theEmail).subscribe(
      data =>{
        this.orderHistoryList = data._embedded.Orders;
      }
    )
  }
}
