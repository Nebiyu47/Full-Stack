package com.example.ecommercebackend.dao;

import com.example.ecommercebackend.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
 Customer findByEmail(String theEmail);
}
