package com.example.ecommercebackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="state")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private  String name;
    @ManyToOne
    @JoinColumn(name = "country_id")
    @JsonIgnore
    private Country country;

}
