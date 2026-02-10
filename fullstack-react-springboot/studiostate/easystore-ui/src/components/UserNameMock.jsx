import React, { useState, useEffect } from "react";
import { use } from "react";

export default function UserNameMock({ onSubmitUser }) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitUser({
      name,
      userId: Number(userId),
    });
  }

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: name, userId: userId }),
    );
    console.log("useEffect was used-----------------");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user is:                    mmm ", user.userId);
  }, [userId]);

  return (
    <div className="max-w-[1152px] mx-auto">
      <form
        className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-row bg-purple-500 w-1/4 mb-4 h-12  rounded-3">
          <div className="basis-1/3 px-5 self-center ">UserName:</div>
          <input
            className="basis-2/3 bg-purple-200 w-2/5 h-12 px-4 rounded-3"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="bg-purple-500 w-1/4 mb-4 h-12 rounded flex items-center">
          <div className="basis-1/3 px-5">UserId:</div>
          <input
            className="basis-2/3 bg-purple-200 w-2/5 h-12 px-4 rounded"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-purple-500 w-1/4 mb-4 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
