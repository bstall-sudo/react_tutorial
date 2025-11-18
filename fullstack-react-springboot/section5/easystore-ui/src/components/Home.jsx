import products from "../data/products";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings"
/* 
            <PageHeading>  
                Add a touch of creativity to your space using some of our fun and unique stickers.
            </PageHeading>
Here we can see, that the text is passed to the child component <PageHeading>. In PageHeading.jsx the text
is received like that <p>{props.children}</p> and of course by accepting the props argument: function PageHeading(props)
the <p> tag can accept the children. But not all tag types accept children.
we could also export the text together with the <p> Add a touch...</p> and then import by only using {props.children}


 */

export default function Home(){
    return (

        <div className="home-container">  
           

            <PageHeading title = "Explore Eazy Stickers">  
                Add a touch of creativity to your space using some of our fun and unique stickers.
            </PageHeading>
            <ProductListings products={products}/>
            
        </div>

    );
}