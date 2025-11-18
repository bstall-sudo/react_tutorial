import products from "../data/products";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings"
import EazyButtonDynamic from "./EazyButtonDynamic";
import BootstrapButton from "./BootstrapButton";
import DeveloperImage from "../assets/stickers/developer.png"
import BreakImage from "../assets/stickers/break.png"
/* 
            <PageHeading>  
                Add a touch of creativity to your space using some of our fun and unique stickers.
            </PageHeading>
Here we can see, that the text is passed to the child component <PageHeading>. In PageHeading.jsx the text
is received like that <p>{props.children}</p> and of course by accepting the props argument: function PageHeading(props)
the <p> tag can accept the children. But not all tag types accept children.
we could also export the text together with the <p> Add a touch...</p> and then import by only using {props.children}


this here is a way of internal css:



 */

const h1Styling = {
    backgroundColor: "black",
    color: "white",
}

/* background-color: ${(props)=>(props.$primary ? "#5B21B6" : "#295191")}; in 
import EazyButtonDynamic from "./EazyButtonDynamic";
makes the 
button in this file
"<EazyButtonDynamic $primary>Submit</EazyButtonDynamic>" 
dynamic, so
if primary is true, the button will be purple, otherwise, blue.
don't forget the dollar sign. */

/* btn-primary wurde in index.css überschrieben auf aquamarine */

export default function Home(){
    const isActive = Math.random()>0.5;
    return (

        <div className="home-container">  
            <button type="button" className="btn btn-danger">Bootstrap Button</button>
            <EazyButtonDynamic $primary>Submit</EazyButtonDynamic>


            <h1 style={h1Styling}> Hi This is a test</h1>

            <h1 style={{backgroundColor: "yellow", color: "purple"}}> Hi This is a test</h1>

            <h1 style={isActive?{backgroundColor: "yellow", color: "purple"}:{backgroundColor: "purple", color: "yellow"}}>condition based styling</h1>
            <h1 style = {{textAlign: "center", color: isActive? "blue" : "purple"}}> only color changes</h1>
            <h1 
                className = {`header ${
                    isActive ? "primary-color" : "secondary-color"
                    }`}>
                        classname is dynamic
            </h1>
            <h1>bootstrap alerts</h1>
            <div className="d-grid gap-2 col-8 mx-auto">
                <div className="alert alert-primary text-center" role="alert">
                A simple primary alert—check it out!
                </div>
                <div className="alert alert-secondary" role="alert">
                A simple secondary alert—check it out!
                </div>
                <div className="alert alert-success" role="alert">
                A simple success alert—check it out!
                </div>
                <div className="alert alert-danger" role="alert">
                A simple danger alert—check it out!
                </div>
                <div className="alert alert-warning" role="alert">
                A simple warning alert—check it out!
                </div>
                <div className="alert alert-info" role="alert">
                A simple info alert—check it out!
                </div>
                <div
                    className="alert alert-warning alert-dismissible fade show text-center"
                    role="alert"
                >
                    <strong>Warning!</strong> This is a warning alert!
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    ></button>
                </div>   
            </div>

           

            <div className="container d-flex gap-4 justify-content-center align-items-center">
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={DeveloperImage} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={BreakImage} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

            </div>

            <div className="row justify-content-center text-center mt-3 gap-3">
                <div className="row">
                    <div className="col-3 border p-3 bg-danger">
                    One of three columns
                    </div>
                    <div className="col-3 border p-3 bg-warning">
                    One of three columns
                    </div>
                    <div className="col-3 border p-3 bg-success">
                    One of three columns
                    </div>
                </div>
            </div>
            <div className="container mt-3 col-8 justify-content-center bg-light border rounded">
                <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
            <h1>Bootstrap self-created Buttons as React components</h1>

            <div className="container col-6">
                
                <BootstrapButton text="primary" type="primary" />
                <BootstrapButton text="secondary" type="secondary" />
                <BootstrapButton text="light" type="light" />
                <BootstrapButton text="danger" type="danger" />
                <BootstrapButton text="dark" type="dark" />

            </div>
            <PageHeading title = "Explore Eazy Stickers">  
                Add a touch of creativity to your space using some of our fun and unique stickers.
            </PageHeading>
            
            <ProductListings products={products}/>
            
        </div>

    );
}

/*                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    ></button>
                </div> 

this code, to close the alert, needs the bootstrap javascript import in the App.jsx*/