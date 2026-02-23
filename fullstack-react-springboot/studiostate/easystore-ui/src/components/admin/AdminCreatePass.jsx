import React from "react";
import PageTitle from "../PageTitle";
import { Form } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AdminCreatePass() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success(`New Pass with ID '${actionData.passId}' for ${actionData.firstName}, ${actionData.lastName} has been saved successfully!`);
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      `Are you sure you want to create this pass for ${actionData.firstName}, ${actionData.lastName}?`
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post", action: "/admin/passes/"  }); // Proceed with form submission
    } else {
      toast.info("Pass Creation cancelled.");
    }
  };

  //hier suchdaten einfügen
    //Seachbar Useeffect
  const [searchInput, setSearchInput]= useState("");

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

    const textFieldStyleReadOnly =
    "cursor-not-allowed w-full  py-1 text-base rounded-md transition dark:border-light dark:focus:ring-lighter focus:outline-none text-gray-600 dark:text-lighter <bg-gray-1></bg-gray-1>00 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300";

 const textFieldStyle_small =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-darkbg placeholder-gray-800 dark:placeholder-gray-300";
 
    return (

    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      {/* Page Title */}
      <PageTitle title="Create Pass" />
      {/* Create Pass Info */}
      <p className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        Please check if User already has a valid pass.
      </p>

      {/* Search Field */}
      <div className=" max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center  ">
          <label htmlFor="expiryDateTime" className="block text-lg font-semibold text-primary dark:text-light mb-2">
            Search User
          </label>
            <div className="flex items-center gap-2 border rounded-md bg-white dark:bg-gray-600 transition border-primary dark:border-light focus-within:ring focus-within:ring-dark dark:focus-within:ring-lighter px-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="h-4 text-primary dark:text-light shrink-0"
              />

              <input
                className="flex-1 py-2 bg-transparent focus:outline-none text-gray-800 dark:text-lighter placeholder-gray-400 dark:placeholder-gray-300 min-w-0"
                placeholder="Search…"
              />
            </div>
      </div>


      {/* Create Pass Form */}
      <Form
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-[768px] mx-auto"
      >
                       {/* First and Last Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 flex gap-6">
                  {/* First Name Field */}


        <div>

          <input
            id="firstName"
            name="firstName"
            type="text"
            readOnly
            placeholder="NO INPUT, READ ONLY!"
            className={textFieldStyleReadOnly }
            required
            value={searchInput ?? ""}

          />
          {actionData?.errors?.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.firstName}
            </p>
          )}
        </div>

                          {/* Last Name Field */}

        <div>

          <input
            id="lastName"
            name="lastName"
            type="text"
            readOnly
            placeholder="NO INPUT, READ ONLY!"
            className={textFieldStyleReadOnly }
            required
            value={searchInput ?? ""}
          />
          {actionData?.errors?.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.lastName}
            </p>
          )}
        </div>

                <div>

          <input
            id="userId"
            name="userId"
            type="text"
            readOnly
            placeholder="NO INPUT, READ ONLY!"
            className={textFieldStyleReadOnly }
            required
            value={searchInput ?? ""}
          />
          {actionData?.errors?.userId && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.userId}
            </p>
          )}
        </div>

        </div>


                {/* Expiry Date Time and Pass Type Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Expiry Date Time Field */}

        <div>
          <label htmlFor="expiryDateTime" className={labelStyle}>
            Expiry Date and Time
          </label>
          <input
            id="expiryDateTime"
            name="expiryDateTime"
            type="text"
            placeholder="DD:MM:YYYY hh:mm:ss (required)"
            className={textFieldStyle}
            required
            minLength={1}
            maxLength={20}
          />
          {actionData?.errors?.expiryDateTime && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.expiryDateTime}
            </p>
          )}
        </div>

                          {/* Pass Type */}

        <div>
          <label htmlFor="pass Type" className={labelStyle}>
            Pass Type
          </label>
          <input
            id="passType"
            name="passType"
            type="text"
            placeholder="hh:mm:ss (required)"
            className={textFieldStyle}
            required
            minLength={1}
            maxLength={20}
          />
          {actionData?.errors?.passType && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.passType}
            </p>
          )}
        </div>

        </div>

        {/* Comments Field */}
        <div>
          <label htmlFor="comments" className={labelStyle}>
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            type="text"
            rows="4"
            placeholder="(optional) Special agreements for extensions due to disease, etc. "
            className={textFieldStyle}
            
            minLength={5}
            maxLength={500}
          ></textarea>
          {actionData?.errors?.message && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function createPassAction({ request, params }) {
  const data = await request.formData();

  const contactData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    userId: data.get("userId"),
    comments: data.get("comments"),
    passType: data.get("passType"),
 
  };
  try {
    const response = await apiClient.post("/admin/passes/create", contactData);
    console.log("create pass response:", response);
    console.log("response.data:", response.data);
    return { 
      userId : response.data.userId,
      firstName : response.data.firstName,
      lastName : response.data.lastName,
      passType: response.data.passType,
      comments: response.data.comments,
      success: true
      
    };
    // return redirect("/home");
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to create the pass. Please try again.",
      { status: error.status || 500 }
    );
  }
}