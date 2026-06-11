import api from "./axios";

export const paymentsApi = {
  getAll:       (params)    => api.get("/payments", { params }),
  getOne:       (id)        => api.get(`/payments/${id}`),
  create:       (data)      => api.post("/payments", data),
  update:       (id, data)  => api.put(`/payments/${id}`, data),
  updateStatus: (id, status)=> api.put(`/payments/${id}/status`, { status }),
  delete:       (id)        => api.delete(`/payments/${id}`),
};