import apiClient from "../api/apiClient";

export async function endSession(sessionId, checkOutAt) {
  const res = await apiClient.put(`/sessions/${sessionId}`, {
    checkOutAt: checkOutAt.toISOString(),
  });

  return res.data;
}

export async function startSession(userId, userName) {
  const res = await apiClient.post("/sessions", {
    userId: userId,
    userName: userName,
    open: true,
  });

  return res.data;
}
