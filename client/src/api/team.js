import api from "./axios";

export const teamApi = {
  getMembers:   ()              => api.get("/team/members"),
  invite:       (data)          => api.post("/team/invite", data),
  acceptInvite: (data)          => api.post("/team/accept-invite", data),
  updateRole:   (id, role)      => api.put(`/team/members/${id}/role`, { role }),
  remove:       (id)            => api.delete(`/team/members/${id}`),
};