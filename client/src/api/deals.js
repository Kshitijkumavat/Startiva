import api from "./axios";

export const dealsApi = {
  getAll:       (params)       => api.get("/deals", { params }),
  getOne:       (id)           => api.get(`/deals/${id}`),
  create:       (data)         => api.post("/deals", data),
  update:       (id, data)     => api.put(`/deals/${id}`, data),
  updateStage:  (id, stage)    => api.put(`/deals/${id}/stage`, { stage }),
  delete:       (id)           => api.delete(`/deals/${id}`),
};