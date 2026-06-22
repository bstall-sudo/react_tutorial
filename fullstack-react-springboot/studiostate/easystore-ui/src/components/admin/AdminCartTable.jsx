import React from "react";
import { useCart } from "../../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  calculateDuration,
  calcSecondsFromString,
  formatDateTime,
} from "../../utils/time";
import AdminCartTableStudioTime from "./AdminCartTableStudioTime";

import { useEffect, useState } from "react";

export default function AdminCartTable() {
  const { cart, removeItem, updateMerchQty, updateFiringWeight } = useCart();

  const studioTimeInCart = cart.some((item) => item.type === "STUDIOTIME");

  const [passInCart, setPassInCart] = useState(
    cart.some((item) => item.type === "PASS"),
  );

  useEffect(() => {
    setPassInCart(cart.some((item) => item.type === "PASS"));
    console.log("passInCart:", passInCart);
  }, [cart]);

  const calcLineTotal = (item) => {
    if (item.type === "MERCH") return item.price * item.quantity;

    if (item.type === "PASS") return item.price;

    if (item.type === "STUDIOTIME") {
      const totalCents =
        item.allocations?.reduce((sum, allocation) => {
          if (passInCart) {
            return 0;
          } else {
            return sum + (allocation.amountCents ?? 0);
          }
        }, 0) ?? 0;

      return totalCents / 100;
    }

    // FIRING:
    // Annahme: item.price ist Preis pro Kilo
    return (item.price * item.weight) / 1000;
  };

  const subtotal = cart
    .reduce((acc, item) => acc + calcLineTotal(item), 0)
    .toFixed(2);

  return (
    <div className="min-h-80 max-w-4xl mx-auto my-8 w-full font-primary">
      <table className="w-full ">
        <thead>
          <tr className="uppercase text-sm text-primary dark:text-light border-b border-primary dark:border-light">
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Details</th>
            <th className="px-6 py-4">Line Total</th>
            <th className="px-6 py-4">Remove</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-primary dark:divide-light">
          {cart.map((item) => (
            <tr
              key={item.cartItemId}
              className="text-sm sm:text-base text-primary dark:text-light text-center"
            >
              <td className="px-4 sm:px-6 py-4 flex items-center">
                {item.productId ? (
                  <Link
                    to={`/products/${item.productId}`}
                    state={{ product: item }}
                    className="flex items-center"
                  >
                    {item.type === "FIRING" && item.photo ? (
                      <img
                        src={item.photo}
                        alt="Scale"
                        className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                      />
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                      />
                    )}

                    <span className="text-primary dark:text-light hover:underline">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="px-4 py-4 mr-4 text-primary dark:text-red-400 border border-primary dark:border-red-400 p-2 rounded hover:bg-lighter dark:hover:bg-gray-700"
                    />

                    <span className="px-2 text-primary dark:text-light hover:underline">
                      StudioTime
                    </span>
                  </div>
                )}
              </td>

              <td className="px-4 sm:px-6 py-4">
                {item.type === "MERCH" ? (
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateMerchQty(
                        item.cartItemId,
                        parseInt(e.target.value, 10) || 1,
                      )
                    }
                    className="w-16 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                ) : item.type === "PASS" ? (
                  <div></div>
                ) : item.type === "FIRING" ? (
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      value={item.weight}
                      onChange={(e) =>
                        updateFiringWeight(
                          item.cartItemId,
                          parseInt(e.target.value, 10) || 1,
                        )
                      }
                      className="w-24 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-xs opacity-80">grams</span>
                  </div>
                ) : (
                  <AdminCartTableStudioTime
                    item={item}
                    lineTotal={calcLineTotal(item)}
                    passInCart={passInCart}
                  />
                )}
              </td>

              <td className="px-4 sm:px-6 py-4 text-base font-light">
                €{calcLineTotal(item).toFixed(2)}
              </td>

              <td className="px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  onClick={() => removeItem(item.cartItemId)}
                  className="text-primary dark:text-red-400 border border-primary dark:border-red-400 p-2 rounded hover:bg-lighter dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}

          {cart.length > 0 && (
            <tr className="text-center ">
              <td></td>
              <td className="align-top text-base text-gray-600 dark:text-gray-300 font-semibold uppercase px-4 sm:px-6 py-4">
                <>
                  <p>Subtotal</p>
                </>
              </td>
              <td className="align-top text-lg text-primary dark:text-blue-400 font-medium px-4 sm:px-6 py-4">
                {studioTimeInCart && passInCart ? (
                  <>
                    <p>€{subtotal}</p>
                    <p className="text-sm text-green-600">
                      The Walk In session fee is substracted, because you have a
                      monthly pass in your cart.
                    </p>
                  </>
                ) : (
                  <>
                    <p>€{subtotal}</p>
                  </>
                )}
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
