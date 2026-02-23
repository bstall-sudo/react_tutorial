import React from "react";
import PageTitle from "../PageTitle";
import { Form } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export default function AdminRegisterUser() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success(`New user ${actionData.firstName}, ${actionData.lastName} with ID '${actionData.userId}' has been saved successfully!`);
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to save this new User?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post", action: "/admin/users/register"  }); // Proceed with form submission
    } else {
      toast.info("User registration cancelled.");
    }
  };



  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
 const textFieldStyle_small =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
 
    return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      {/* Page Title */}
      <PageTitle title="Register New User" />
      {/* Contact Info */}
      <p className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        Please check if User has been registered before.
      </p>

      {/* Contact Form */}
      <Form
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-[768px] mx-auto"
      >

                {/* First and Last Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name Field */}

        <div>
          <label htmlFor="firstName" className={labelStyle}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter First Name (required)"
            className={textFieldStyle}
            required
            minLength={1}
            maxLength={20}
          />
          {actionData?.errors?.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.firstName}
            </p>
          )}
        </div>

                          {/* Last Name Field */}

        <div>
          <label htmlFor="lastName" className={labelStyle}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter Last Name (required)"
            className={textFieldStyle}
            required
            minLength={1}
            maxLength={20}
          />
          {actionData?.errors?.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.lastName}
            </p>
          )}
        </div>

        </div>


   

        {/* Email and mobile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={30}
              placeholder="Enter Email (required) "
              className={textFieldStyle}
              required
            />
            {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.email}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              maxLength={20}
              pattern="^(\+|00|0)\d{5,15}"
              title="Mobile number must start with '+' or '0' or '00' and can not be longer then 20 digits"
              placeholder="(optional)"
              className={textFieldStyle}
            />
            {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )}
          </div>
        </div>



{/* Street Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Street Field */}
          <div>
            <label htmlFor="Street" className={labelStyle}>
              Street
            </label>
            <input
              id="street"
              name="street"
              type="text"
              placeholder="(optional)"
              className={textFieldStyle}
              title="Street must have less then 30 characters."
              maxLength={30}
            
            />
            {actionData?.errors?.street && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.street}
              </p>
            )}
          </div>

                              {/* Postal Code Field */}
          <div>
            <label htmlFor="postalCode" className={labelStyle}>
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="number"
              pattern="^\d{3,7}$"
              title="Postal Code must be 3-7 digits"
              placeholder="(optional)"
              className={textFieldStyle}
            />
            {actionData?.errors?.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.postalCode}
              </p>
            )}
          </div>

          {/* Country Field */}
          <div>
            <label htmlFor="country" className={labelStyle}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              title="Country must have less then 20 characters and at least 3 people living there."
              placeholder="(optional)"
              maxLength={20}
            
              className={textFieldStyle}
            />
            {actionData?.errors?.houseNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.houseNumber}
              </p>
            )}
          </div>



                    {/* City Field */}
          <div>
            <label htmlFor="City" className={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              title="City must less than 20 characters"
              placeholder="(optional)"
             
              maxLength={20}
              className={textFieldStyle}
            />
            {actionData?.errors?.city && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.city}
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
            placeholder="(optional) Experience, special interests, agreements, etc. "
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

export async function registerUserAction({ request, params }) {
  const data = await request.formData();

  const contactData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    comments: data.get("comments"),
    street: data.get("street"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
    city: data.get("city"),
  };
  try {
    const response = await apiClient.post("/admin/users/register", contactData);
    console.log("create user response:", response);
console.log("response.data:", response.data);
    return { 
      userId : response.data.userId,
      firstName : response.data.firstName,
      lastName : response.data.lastName,
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
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}