export function formatTime(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "99:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatDate(d) {
  if (!(d instanceof Date) || Number.isNaN(d.getTime()))
    return "no date available";
  const dateList = d.toString().split(" ");
  return `${dateList[4]} ${dateList[1]} ${dateList[2]} ${dateList[3]}`;
}

export function msBetween(a, b = new Date()) {
  return b - a;
}

function safeParse(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Invalid JSON in localStorage for "${key}":`, raw);
    localStorage.removeItem(key); // optional but recommended
    return fallback;
  }
}

export function checkLocalStorageTimeVariable() {
  let startTime = safeParse("clientStartTime", 0);
  if (startTime !== null && startTime !== 0) {
    return formatTime(new Date().getTime() - Date.parse(startTime));
  } else {
    return;
  }
}

export function checkLocalStorageTimeDateVariable() {
  let startTime = safeParse("clientStartTime", 0);
  if (startTime !== null && startTime !== 0) {
    const dateTime = new Date(startTime);
    const date = dateTime.toDateString();
    const time = dateTime.toLocaleTimeString();
    return time + ", " + date;
  } else {
    return "checkLocalStorageTimeDateVariable not yet set";
  }
}

export function checkLocalStorageToggleState() {
  let toggleState = localStorage.getItem("toggleState");
  if (toggleState !== null) {
    return JSON.parse(localStorage.getItem("toggleState"));
  } else {
    return 0;
  }
}

export function checkLocalStorageSessionData() {
  const sessionDataFallback = {
    session_id: 0,
    server_start_time: 0,
    open: 0,
  };
  let sessionDataObject = safeParse("sessionData", 0);
  if (sessionDataObject !== 0) {
    return sessionDataObject;
  } else {
    localStorage.setItem("sessionData", JSON.stringify(sessionDataFallback));

    return sessionDataFallback;
  }
}

export function extractLocalDate(dateTimeFromServer, sessionId) {
  if (dateTimeFromServer === null) return "dateTime is Null";
  try {
    const dateTime = new Date(dateTimeFromServer);
    const date = dateTime.toDateString();
    const time = dateTime.toLocaleTimeString();
    return date;
  } catch (e) {
    console.warn(`No Date for Session with ID: "${sessionId}":`);
    return "dateTime is Null";
  }
}

export function extractLocalTime(dateTimeFromServer, sessionId) {
  if (dateTimeFromServer === null) return "dateTime is Null";
  try {
    const dateTime = new Date(dateTimeFromServer);
    const time = dateTime.toLocaleTimeString();
    return time;
  } catch (e) {
    console.warn(`No Date for Session with ID: "${sessionId}":`);
    return "dateTime is Null";
  }
}

export function calculateDuration(
  startTimeFromServer,
  endTimeFromServer,
  sessionId,
) {
  if (startTimeFromServer === null) return "startTimeFromServe is Null";
  if (endTimeFromServer === null) return "endTimeFromServer is Null";
  if (sessionId === null) return "sessionId is Null";
  try {
    const startTime = new Date(startTimeFromServer);
    const endTime = new Date(endTimeFromServer);
    const difference = endTime - startTime;

    return formatTime(difference);
  } catch (e) {
    console.warn(
      `calculateDuration Session with ID: "${sessionId}" has got a problem`,
    );
    return `calculateDuration Session with ID: "${sessionId}" has got a problem`;
  }
}
