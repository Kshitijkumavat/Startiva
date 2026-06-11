import api from "./axios";

export const proposalsApi = {
  getAll:   (params)   => api.get("/proposals", { params }),
  getOne:   (id)       => api.get(`/proposals/${id}`),
  create:   (data)     => api.post("/proposals", data),
  update:   (id, data) => api.put(`/proposals/${id}`, data),
  aiDraft:  (dealId)   => api.post("/proposals/ai-draft", { dealId }),
  send:     (id)       => api.post(`/proposals/${id}/send`),
};