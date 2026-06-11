import api from "./axios";

export const meetingsApi = {
  getAll:          (params)       => api.get("/meetings", { params }),
  getOne:          (id)           => api.get(`/meetings/${id}`),
  create:          (data)         => api.post("/meetings", data),
  update:          (id, data)     => api.put(`/meetings/${id}`, data),
  toggleActionItem:(id, index)    => api.put(`/meetings/${id}/action-item`, { index }),
  delete:          (id)           => api.delete(`/meetings/${id}`),
};