import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/footer/Footer'
import React from 'react';  // needed for the React Fragment
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"; /* this javascript bootstrap library is necessary to make the
close alert function work*/


/*the React.Fragment prevents the dummy div to be created (in the return statement, there can
be only one Element, if we create a <div> to hold the other elements, the holder div is an
unnecessary dummy element. instead of "<React.Fragment>" we can use "<>" empty tag.) */

function App() {


  return (
    <React.Fragment>
    <Header />
    <Home />
    <Footer />
    
    </React.Fragment>
  );
}

export default App
