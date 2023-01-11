import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-deatils',
  templateUrl: './cart-deatils.component.html',
  styleUrls: ['./cart-deatils.component.css']
})
export class CartDeatilsComponent implements OnInit {
  CartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.CartItem = this.CartService.CartItem;


    this.CartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.CartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.CartService.computCartTotal();
  }
  incrementQuantity(theCartItem: CartItem){
    this.CartService.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem :CartItem){
    this.CartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem :CartItem){
    this.CartService.remove(theCartItem);
  }

}
