export function safeParseUserURLFromLocalStorage() {
  const user = localStorage.getItem("user");
  console.log("userId from localStorage is: ", user);
  if (user === null) {
    return "/sessions";
  } else {
    try {
      const userObject = JSON.parse(user);
      return `/sessions/user/${userObject.userId}`;
    } catch (e) {
      console.warn(`Invalid JSON in localStorage for "${key}":`);
      return "/sessions";
    }
  }
}

export function safeParseUserIdFromLocalStorage() {
  const user = localStorage.getItem("user");
  console.log("userId from localStorage is: ", user);
  if (user === null) {
    return 12;
  } else {
    try {
      const userObject = JSON.parse(user);
      return userObject.userId;
    } catch (e) {
      console.warn(`Invalid JSON in localStorage for "${key}":`);
      return userObject.userId;
    }
  }
}
