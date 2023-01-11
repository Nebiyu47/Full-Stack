import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product!:Product;
  constructor(private ProductService:ProductService , private route: ActivatedRoute, private CartService : CartService) { }

  ngOnInit(): void {
  
  this.route.paramMap.subscribe(()=>{
    this.handleProductDetails();
  })
  }
  handleProductDetails(): void {
  const theProductId:number|any = this.route.snapshot.paramMap.get('id');
  this.ProductService.getProduct(theProductId).subscribe(
    data=> {
      this.product=data;
    }
  )
  }
  addToCart(){
console.log(`Adding to cart : ${this.product.name},${this.product.name}`)
const theCartItem = new CartItem(this.product);
this.CartService.addToCart(theCartItem);
  }

}
