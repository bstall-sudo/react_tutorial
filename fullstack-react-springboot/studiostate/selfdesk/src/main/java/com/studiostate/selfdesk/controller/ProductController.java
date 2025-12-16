package com.studiostate.selfdesk.controller;

import com.studiostate.selfdesk.dto.ProductDto;
import com.studiostate.selfdesk.entity.Product;
import com.studiostate.selfdesk.repository.ProductRepository;
import com.studiostate.selfdesk.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final IProductService iProductService;

    @GetMapping
    public List<ProductDto> getProducts(){
        List<ProductDto> productList = iProductService.getProducts();
        return productList;
    }
}
