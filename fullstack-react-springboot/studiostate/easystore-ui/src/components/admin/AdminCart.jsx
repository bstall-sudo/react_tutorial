import React, { useState, useEffect, useMemo } from "react";
import PageTitle from "../PageTitle";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";
import emptyCartImage from "../../assets/util/emptycart.png";
import { useCart } from "../../store/cart-context";
import SearchUserBar from "../SearchUserBar";
import AdminCartTable from "./AdminCartTable";
import { endSession } from "../../utils/sessions";

export default function AdminCart() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [unpaidSessions, setUnpaidSessions] = useState([]);
  const [openSessions, setOpenSessions] = useState([]);
  const { cart, addStudioTimeToCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  async function getListSessionsPaymentStatusOpen(userId) {
    const res = await apiClient.get(
      `/sessions/payment/status/open/user/${userId}`,
    );
    return res.data;
  }

  async function getListOpenSessions(userId) {
    const res = await apiClient.get(`/sessions/open/user/${userId}`);
    return res.data;
  }

  async function loadUnpaidSessionsForUser(userId) {
    if (!userId) {
      setUnpaidSessions([]);
      setOpenSessions([]);
      return;
    }

    try {
      const data = await getListSessionsPaymentStatusOpen(userId);
      const openSessionData = await getListOpenSessions(userId);
      setOpenSessions(openSessionData);
      /*
      if (openSessions.length > 0) {
        alert(
          `There are open Sessions for user: ${selectedUser.userName}, please check out the user`,
        );
      }
      */

      console.log("unpaid sessions: ", data);
      setUnpaidSessions(data);
    } catch (error) {
      console.error("Failed to load open sessions:", error);
      setUnpaidSessions([]);
    }
  }

  useEffect(() => {
    if (!selectedUser?.userId) {
      setUnpaidSessions([]);
      return;
    }

    loadUnpaidSessionsForUser(selectedUser.userId);
  }, [selectedUser]);

  /*
  const currentOpenSession = useMemo(() => {
    return unpaidSessions.find((session) => session.open) ?? null;
  }, [unpaidSessions]);
  */

  const hasOpenSessions = openSessions.length > 0;

  async function handleCheckButton() {
    if (!selectedUser?.userId || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (hasOpenSessions) {
        const data = await endSession(openSessions[0].sessionId, new Date());
        /*
        addStudioTimeToCart(
          data.userName,
          data.checkInAt,
          data.checkOutAt,
          data.sessionId,
          data.allocations,
        );
        */
      } else {
        if (unpaidSessions.length >= 2) {
          for (let i = 0; i < unpaidSessions.length; i++) {
            addStudioTimeToCart(
              unpaidSessions[i].userName,
              unpaidSessions[i].checkInAt,
              unpaidSessions[i].checkOutAt,
              unpaidSessions[i].sessionId,
              unpaidSessions[i].allocations,
            );
          }
        }
        if (unpaidSessions.length === 1)
          addStudioTimeToCart(
            unpaidSessions[0].userName,
            unpaidSessions[0].checkInAt,
            unpaidSessions[0].checkOutAt,
            unpaidSessions[0].sessionId,
            unpaidSessions[0].allocations,
          );
      }

      await loadUnpaidSessionsForUser(selectedUser.userId);
    } catch (error) {
      console.error("Check in/out failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Cart" />

        <SearchUserBar
          onUserSelect={(user) => {
            setSelectedUser(user);
            console.log("selected:", user);
          }}
          onClear={() => {
            setSelectedUser(null);
            setUnpaidSessions([]);
            setOpenSessions([]);
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <textarea
            readOnly
            rows={1}
            className="h-flex cursor-not-allowed px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.userName ?? "") : ""}
          />

          <textarea
            readOnly
            rows={1}
            className="cursor-not-allowed px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.userId ?? "") : ""}
          />

          <button
            className={[
              "h-flex col-span-2 text-white font-bold py-2 px-4 rounded disabled:opacity-50",
              openSessions.length > 0
                ? "bg-red-500 hover:bg-red-700"
                : "bg-purple-500 hover:bg-purple-700",
            ].join(" ")}
            onClick={handleCheckButton}
            disabled={!selectedUser || isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : openSessions.length > 0
                ? `${selectedUser ? selectedUser.userName : "-"} Check Out!`
                : `Add  ${selectedUser ? selectedUser.userName + "'s" : ""} Time to Cart`}
          </button>
        </div>

        <div className="mb-4">
          <textarea
            readOnly
            rows={2}
            className="cursor-not-allowed w-full px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.comments ?? "") : ""}
          />
        </div>

        {!isCartEmpty ? (
          <>
            <AdminCartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/home"
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <button className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              to="/home"
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
