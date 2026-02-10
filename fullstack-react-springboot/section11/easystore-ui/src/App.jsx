import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import React from "react"; // needed for the React Fragment
import { useNavigation } from "react-router-dom";

/*the React.Fragment prevents the dummy div to be created (in the return statement, there can
be only one Element, if we create a <div> to hold the other elements, the holder div is an
unnecessary dummy element. instead of "<React.Fragment>" we can use "<>" empty tag.) */

function App() {
  const naviation = useNavigation();

  return (
    <React.Fragment>
      <Header />
      {naviation.state === "loading" ? (
        <div className="flex items-center justify-center min-h-[852] ">
          <span className="text-4xl font-semibold text-primary dark:text-light">
            Loading...
          </span>
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </React.Fragment>
  );
}

export default App;
