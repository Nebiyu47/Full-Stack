package com.example.ecommercebackend.service;

import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
