package com.example.ecommercebackend.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "category_id" ,nullable = false)
    private ProductCategory category;
    @Column(name = "name")
    private String name;
    @Column(name = "sku")
    private String sku;
    @Column(name = "description")
    private String descreption;
    @Column(name = "unit_price")
    private int unitPrice;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "active")
    private boolean active;
    @Column(name="unitsInStock")
    private int unitsInStock;
    @Column(name="date_Created")
    private Date dateCreated;
    @Column(name="last_updated")
    private Date lastUpdated;
}
