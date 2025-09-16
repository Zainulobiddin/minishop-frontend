import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createApi = (resource: string) => ({
  getAll: () => api.get(`/${resource}`).then(res => res.data),
  getOne: (id: number) => api.get(`/${resource}/${id}`).then(res => res.data),
  create: (data: any) => api.post(`/${resource}`, data).then(res => res.data),
  update: (id: number, data: any) => api.patch(`/${resource}/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete(`/${resource}/${id}`).then(res => res.data),
});
