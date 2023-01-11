package com.example.ecommercebackend.dto;

import com.example.ecommercebackend.Entity.Address;
import com.example.ecommercebackend.Entity.Customer;
import com.example.ecommercebackend.Entity.Order;
import com.example.ecommercebackend.Entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
  private Customer customer;
  private Address shippingAddress;
  private Address billingAddress;
  private Order order;
  private Set<OrderItem> orderItems;

}
