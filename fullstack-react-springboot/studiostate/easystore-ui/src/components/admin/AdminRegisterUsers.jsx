import React from "react";
import PageTitle from "../PageTitle";
import { Form } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export default function AdminRegisterUsers() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post" }); // Proceed with form submission
    } else {
      toast.info("Form submission cancelled.");
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
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter First Name, Last Name"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.name}
            </p>
          )}
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
              placeholder="Enter Email"
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
        
              pattern="^(\+|00|0)\d{5,15}"
              title="Mobile number must be exactly 10 digits"
              placeholder="Enter Mobile Number"
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
              placeholder="Enter Street"
              className={textFieldStyle}
              minLength={3}
              maxLength={30}
            
            />
            {actionData?.errors?.street && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.street}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="houseNumber" className={labelStyle}>
              House Number
            </label>
            <input
              id="houseNumber"
              name="houseNumber"
              type="number"
              
              pattern="^\d{1,5}$"
              title="House Number must be exactly 1-5 digits"
              placeholder="House Number"
              className={textFieldStyle}
            />
            {actionData?.errors?.houseNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.houseNumber}
              </p>
            )}
          </div>

                    {/* Mobile Field */}
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
              placeholder="Postal Code"
              className={textFieldStyle}
            />
            {actionData?.errors?.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.postalCode}
              </p>
            )}
          </div>

                    {/* Mobile Field */}
          <div>
            <label htmlFor="City" className={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              title="City must have 3-30 characters"
              placeholder="City"
              minLength={3}
              maxLength={30}
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
            placeholder="Experience, special agreements, etc. "
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

export async function contactAction({ request, params }) {
  const data = await request.formData();

  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    comments: data.get("comments"),
  };
  try {
    await apiClient.post("/admin/create/user", contactData);
    return { success: true };
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