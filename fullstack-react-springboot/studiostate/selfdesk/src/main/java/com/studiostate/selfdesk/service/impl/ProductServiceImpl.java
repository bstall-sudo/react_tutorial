package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.ProductDto;
import com.studiostate.selfdesk.entity.Product;
import com.studiostate.selfdesk.repository.ProductRepository;
import com.studiostate.selfdesk.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }


    private ProductDto transformToDTO (Product product){
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto); // this copies all data to the data transfer model, only works, if the property names are the same
        return productDto;

    }
}
