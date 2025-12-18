import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2";
  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <a className={navLinkClass} href="/">
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Ceramic Kingdom</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
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
