package com.studiostate.selfdesk.service;


import com.studiostate.selfdesk.dto.ProductDto;

import java.util.List;

public interface IProductService {

    List<ProductDto> getProducts();

    List<ProductDto> getProductsByCategory(String category);


}
