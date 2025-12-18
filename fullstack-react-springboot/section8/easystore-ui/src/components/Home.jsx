import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useState, useEffect } from "react";

/* 
            <PageHeading>  
                Add a touch of creativity to your space using some of our fun and unique stickers.
            </PageHeading>
Here we can see, that the text is passed to the child component <PageHeading>. In PageHeading.jsx the text
is received like that <p>{props.children}</p> and of course by accepting the props argument: function PageHeading(props)
the <p> tag can accept the children. But not all tag types accept children.
we could also export the text together with the <p> Add a touch...</p> and then import by only using {props.children}


 */

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Run once when the component mounts
  // Mounting is the process of creating and adding the component into DOM
  useEffect(() => {
    fetchProducts();
  }, []);

  //await only works, if it is a async - function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/products"); //Axios GET Request
      setProducts(response.data); // Update products state with fetched data
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch products. Please try again."
      );
    } finally {
      setLoading(false);
    }
    const response = await apiClient.get("/products"); //Axios GET Request
    setProducts(response.data); // Update products state with fetched data
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Explore Eazy Stickers">
        Add a touch of creativity to your space using some of our fun and unique
        stickers.
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
}
