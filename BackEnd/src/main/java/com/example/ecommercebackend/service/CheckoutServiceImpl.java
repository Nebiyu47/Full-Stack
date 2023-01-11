package com.example.ecommercebackend.service;

import com.example.ecommercebackend.Entity.Customer;
import com.example.ecommercebackend.Entity.Order;
import com.example.ecommercebackend.Entity.OrderItem;
import com.example.ecommercebackend.dao.CustomerRepository;
import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{
    private CustomerRepository customerRepository;
    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase){

        Order order= purchase.getOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);


        Set<OrderItem> orderItem =purchase.getOrderItems();
        orderItem.forEach(item -> order.add(item));
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        Customer customer = purchase.getCustomer();
        customer.add(order);
        String theEmail= customer.getEmail();
        Customer customer1=customerRepository.findByEmail(theEmail);

        if(customer1!=null){
            customer=customer1;
        }
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
       return UUID.randomUUID().toString();
    }

}

