import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter"; // optional

export default function AdminLayout() {
  const navigation = useNavigation();

  return (
    <>
      <AdminHeader />
      {navigation.state === "loading" ? (
        <div className="flex items-center justify-center min-h-[852px]">
          <span className="text-4xl font-semibold text-primary dark:text-light">
            Loading...
          </span>
        </div>
      ) : (
        <Outlet />
      )}
      <AdminFooter />
    </>
  );
}
