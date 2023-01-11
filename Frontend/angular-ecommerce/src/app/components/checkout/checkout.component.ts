import { Purchase } from './../../common/purchase';
import { OrdrItem } from './../../common/ordr-item';
import { Order } from './../../common/order';
import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from './../../services/cart.service';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { ShopFormService } from './../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 1;
  totalQuantity: number = 0;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  countries: Country[] = [];
  shippingAdressStates: State[] = [];
  BillingAdressState: State[] = [];
  constructor(private formBuilder: FormBuilder,
    private ShopFormService: ShopFormService, private cartService: CartService, private CheckoutService: CheckoutService, private router: Router) { }

  ngOnInit(): void {
    this.reviewCartDeatils();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl(' ', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        country: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipcode: new FormControl('', [Validators.required, Validators.minLength(2)])
      }),
      bilingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        country: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required, Validators.minLength(2)]],
        nameONCard: ['', [Validators.required, Validators.minLength(2)]],
        cardNumber: ['', [Validators.pattern('[0-9]{16}'), Validators.required]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expirationMonth: ['', [Validators.required, Validators.minLength(2)]]
      })
    })
    const strartMonth: number = new Date().getMonth() + 1;
    console.log("startmonth:" + strartMonth);
    this.ShopFormService.getCreditCardMonth(strartMonth).subscribe(
      data => {
        console.log("Retrvied credit card month :" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    )
    this.ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrvied Credit Card Year : " + JSON.stringify(data));
        this.creditCardYear = data;
      }
    )
    this.ShopFormService.getCountries().subscribe(
      data => {
        console.log("retrived countries " + JSON.stringify(data))
        this.countries = data;
      }
    )
  }
  reviewCartDeatils() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const CartItem = this.cartService.CartItem;
    let OrderItem: OrdrItem[] = [];
    for (let i = 0; i < CartItem.length; i++) {
      OrderItem[i] = new OrdrItem(CartItem[i])
    }
    let orderItems: OrdrItem[] = CartItem.map(tempCartItem => new OrdrItem(tempCartItem));

    let purchase = new Purchase();
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    purchase?.shippingAddress?.state != shippingState.name;
    purchase.shippingAddress?.country != shippingCountry.name

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
    purchase?.billingAddress?.state != billingState.name;
    purchase.billingAddress?.country != billingCountry.name


    purchase.order = order;
    purchase.orderItems = orderItems;
    this.CheckoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`your order has been recived .\nOrder tracking number: ${response.orderTrackingNumber}`)
        this.restCart();
      },
      error: err => {
        alert(`There was an error : ${err.message}`)
      }
    })
    console.log("Handling the Submite buton");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("the shiiping adresss" + this.checkoutFormGroup.get('shippingAdress')?.value.Country.name)
    console.log("the shiiping adresss" + this.checkoutFormGroup.get('shippingAdress')?.value.state.name)
  }
  restCart() {
    this.cartService.CartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
  }
  get firstName() { return this.checkoutFormGroup.get('customer.firstName') }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName') }
  get email() { return this.checkoutFormGroup.get('customer.email') }

  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country') }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street') }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city') }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state') }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street') }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city') }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state') }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode') }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.Country') }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType') }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard') }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber') }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securitycode') }
  // copyShippingAddressToBillingAddress(event: any){
  //   if(event.target.checked){
  //     this.checkoutFormGroup.controls['bilingAddress'].setValue(this.checkoutFormGroup.shippingAddress)
  //   }
  // }
  HandleMonthAndYear() {
    const creditCardFromGroup = this.checkoutFormGroup.get('creditCard')!;
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFromGroup.value.expirationYear);
    let startMonth: number;
    if (currentYear == selectYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.ShopFormService.getCreditCardMonth(startMonth).subscribe(
      data => {
        console.log("retrive Credit Card Mont :" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    )
  }
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countrycode = formGroup?.value.country.code;
    const countryName = formGroup?.value.Country.name;
    console.log(`${formGroupName} country code: ${countrycode}`)
    console.log(`${formGroupName} country name : ${countryName}`)
    this.ShopFormService.getStates(countrycode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAdressStates = data;
        } else {
          this.BillingAdressState = data;
        }
        formGroup?.get('state')?.setValue(data[0]);
      }
    )

  }

}

