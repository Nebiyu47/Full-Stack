package com.example.ecommercebackend.Controller;

import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;
import com.example.ecommercebackend.service.CheckoutService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService=checkoutService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse= checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
}
