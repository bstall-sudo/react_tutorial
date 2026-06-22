import React from "react";
import PageTitle from "../PageTitle";
import { Form } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

import SearchUserBar from "../SearchUserBar";

export default function AdminCreatePass() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success(
        `New Pass with ID '${actionData.passId}' for ${actionData.userName}has been saved successfully!`,
      );
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const passType = formData.get("passType");
    const userName = formData.get("userName"); // kommt aus readonly input
    const userConfirmed = window.confirm(
      `Are you sure you want to create this pass of type , '${passType}' for ${userName}?`,
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post", action: "/admin/passes/create" }); // Proceed with form submission
    } else {
      toast.info("Pass Creation cancelled.");
    }
  };

  const [selectedUser, setSelectedUser] = useState([]);

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  const textFieldStyleReadOnly =
    "cursor-not-allowed w-full text-wrap py-1 text-base rounded-md transition dark:border-light dark:focus:ring-lighter focus:outline-none text-gray-600 dark:text-lighter <bg-gray-1></bg-gray-1>00 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300";

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

      <SearchUserBar
        onUserSelect={(user) => {
          setSelectedUser(user);
          console.log("selected:", user);
        }}
        onClear={() => {
          setSelectedUser(null); //hier wird es zurückgesetzt
        }}
      />

      {/* Create Pass Form */}
      <Form
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-[768px] mx-auto"
      >
        {/* First and Last Name Row */}
        <div>
          <div>
            <textarea
              readOnly
              rows={4}
              className="cursor-not-allowed w-full px-2 py-1 text-base rounded-md transition
      focus:outline-none text-gray-600 dark:text-lighter
      bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300
      resize-none whitespace-pre-wrap break-words
       overflow-y-auto"
              value={selectedUser ? String(selectedUser.comments ?? "") : ""}
            />
          </div>
          <div>
            <textarea
              readOnly
              rows={4}
              className="cursor-not-allowed w-full px-2 py-1 text-base rounded-md transition
      focus:outline-none text-gray-600 dark:text-lighter
      bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300
      resize-none whitespace-pre-wrap break-words
       overflow-y-auto"
              value={selectedUser ? String(selectedUser.userId ?? "") : ""}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6  ">
          <div className=" items-end col-span-4">
            <div>
              <div className="flex">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  readOnly
                  className="
      cursor-not-allowed text-2xl font-extrabold rounded-md transition
      focus:outline-none text-purple-700 dark:text-lighter
      bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300
    "
                  value={selectedUser ? `${selectedUser.userName}` : ""}
                />
                {actionData?.errors?.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.userName}
                  </p>
                )}
              </div>

              <div className="flex">
                <label
                  htmlFor="passType"
                  className="  flex-end font-extrabold text-1xl rounded-md transition
      focus:outline-none text-gray-600 dark:text-lighter
      bg-gray-100 dark:bg-darkbg"
                >
                  {selectedUser ? "ID: " : ""}
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  readOnly
                  className="cursor-not-allowed px-2  flex-end font-extrabold text-1xl rounded-md transition
      focus:outline-none text-gray-600 dark:text-lighter
      bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300"
                  required
                  value={selectedUser ? `${selectedUser.userId}` : ""}
                />
                {actionData?.errors?.userId && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.userId}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pass Type */}
          <div className="col-span-1">
            <label htmlFor="passType" className={labelStyle}>
              Pass Type
            </label>

            <select
              id="passType"
              name="passType"
              className={textFieldStyle}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="6_hours">6 hours</option>
              <option value="10_hours">10 hours</option>
              <option value="15_hours">15 hours</option>
              <option value="infinite">Infinite</option>
            </select>

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
          {actionData?.errors?.comments && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.comments}
            </p>
          )}
        </div>

        {/* Expiry Date Time and remainingSeconds Row for test only delete later */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Expiry Date Time Field */}

          <div>
            <label htmlFor="expiryDateTime" className={labelStyle}>
              T after Seconds from Now
            </label>
            <input
              id="expiryDateTime"
              name="expiryDateTime"
              type="number"
              placeholder="expires in how many seconds? (required)"
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

          {/* valid for delete later test only*/}

          <div>
            <label htmlFor="remainingSeconds" className={labelStyle}>
              Test: remainingSeconds
            </label>

            <input
              id="remainingSeconds"
              name="remainingSeconds"
              type="number"
              placeholder="how many seconds on Pass?"
              className={textFieldStyle}
            />
            {actionData?.errors?.remainingSeconds && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.remainingSeconds}
              </p>
            )}
          </div>
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

  const passData = {
    userName: data.get("userName"),
    userId: data.get("userId"),
    comments: data.get("comments"),
    passType: data.get("passType"),
    //delete expiryDateTime and remainingSeconds after test phase
    expiryDateTime: data.get("expiryDateTime"),
    remainingSeconds: data.get("remainingSeconds")
      ? data.get("remainingSeconds")
      : 0,
  };
  try {
    const response = await apiClient.post("/admin/passes/create", passData);
    console.log("create pass response:", response);
    console.log("response.data:", response.data);
    return {
      userId: response.data.userId,
      passId: response.data.passId,
      userName: response.data.userName,
      passType: response.data.passType,
      comments: response.data.comments,
      success: true,
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
      { status: error.status || 500 },
    );
  }
}
