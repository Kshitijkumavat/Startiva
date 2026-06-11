import api from "./axios";

export const leadsApi = {
  getAll:  (params) => api.get("/leads", { params }),
  getOne:  (id)     => api.get(`/leads/${id}`),
  create:  (data)   => api.post("/leads", data),
  update:  (id, data) => api.put(`/leads/${id}`, data),
  delete:  (id)     => api.delete(`/leads/${id}`),
  assign:  (id, assignedTo) => api.put(`/leads/${id}/assign`, { assignedTo }),
};