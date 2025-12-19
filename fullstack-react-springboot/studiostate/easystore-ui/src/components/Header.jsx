import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <a className={navLinkClass} href="/">
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Ceramic Kingdom</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className={navLinkClass}>
                Home
              </a>
            </li>
            <li>
              <a href="/Firing" className={navLinkClass}>
                Firing
              </a>
            </li>
            <li>
              <a href="/Passes" className={navLinkClass}>
                Passes
              </a>
            </li>
            <li>
              <a href="/login" className={navLinkClass}>
                Login
              </a>
            </li>
            <li>
              <a href="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
