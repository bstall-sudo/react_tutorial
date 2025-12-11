import React from 'react'
import ProductCard from './ProductCard'


/*
if the statement "products.length > 0" is true,
execute this "(
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        )"
else, execute this: 
        (
          <p className="product-listings-empty">No products found</p>
        )

this "<ProductCard key={product.productId} product={product} />" passes props to the ProductCard.jsx and
displays the ProductCard component

this "key={product.productId}" helps react to improve performance, because, in case of product updates, it knows,
which products to update, and which not. 

*/

export default function ({products}) {
  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">No products found</p>
        )}
      </div>
    </div>
  )
}
