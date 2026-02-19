package com.studiostate.selfdesk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table (name="products")
public class Product extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "merchandise", nullable = true)
    private Integer merchandise;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "popularity", nullable = false)
    private Integer popularity;


    @Column(name = "category", nullable = true)
    private String category;


    @Column(name = "image_url", nullable = true)
    private String imageUrl;




}
