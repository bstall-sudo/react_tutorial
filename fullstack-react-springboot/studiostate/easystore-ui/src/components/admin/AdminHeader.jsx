import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminHeader() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-white dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Ceramic Kingdom</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/firings"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Firings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/passes"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Passes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Register User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/checkInOut"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Time
              </NavLink>
            </li>
            <li>
              <Link to="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
