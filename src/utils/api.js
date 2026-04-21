import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("qr_tokens") || "{}");
  if (tokens.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const tokens  = JSON.parse(localStorage.getItem("qr_tokens") || "{}");
        const refresh = await axios.post(`${BASE_URL}/api/auth/refresh/`, {
          refresh: tokens.refresh,
        });
        const newTokens = { ...tokens, access: refresh.data.access };
        localStorage.setItem("qr_tokens", JSON.stringify(newTokens));
        original.headers.Authorization = `Bearer ${refresh.data.access}`;
        return api(original);
      } catch {
        localStorage.removeItem("qr_tokens");
        localStorage.removeItem("qr_user");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth endpoints ────────────────────────────────────────────────────────────
export const authAPI = {
  register:      (data)   => api.post("/api/auth/register/",    data),
  login:         (data)   => api.post("/api/auth/login/",       data),
  logout:        (refresh) => api.post("/api/auth/logout/",     { refresh }),
  profile:       ()       => api.get("/api/auth/profile/"),
  updateProfile: (data)   => api.put("/api/auth/profile/",      data),
  switchRole:    (role)   => api.put("/api/auth/switch-role/",  { role }),
};

// ── Items endpoints ───────────────────────────────────────────────────────────
export const itemsAPI = {
  getAll:  (params) => api.get("/api/items/",       { params }),
  getOne:  (id)     => api.get(`/api/items/${id}/`),
  create:  (data)   => api.post("/api/items/",      data),
  update:  (id, data) => api.put(`/api/items/${id}/`, data),
  delete:  (id)     => api.delete(`/api/items/${id}/`),
  myItems: ()       => api.get("/api/items/my/"),

  // Upload up to 4 photos — sends as multipart/form-data
  uploadImages: (id, files) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("images", f));
    return api.post(`/api/items/${id}/images/`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteImage:    (id, imgId) => api.delete(`/api/items/${id}/images/${imgId}/`),
  toggleWishlist: (id)        => api.post(`/api/items/${id}/wishlist/`),
  getWishlist:    ()          => api.get("/api/items/wishlist/"),
};

// ── Rentals endpoints ─────────────────────────────────────────────────────────
export const rentalsAPI = {
  create:           (data)        => api.post("/api/rentals/",              data),
  myRentals:        ()            => api.get("/api/rentals/my/"),
  receivedRequests: ()            => api.get("/api/rentals/received/"),
  getOne:           (id)          => api.get(`/api/rentals/${id}/`),
  updateStatus:     (id, status)  => api.put(`/api/rentals/${id}/status/`,  { status }),
};

// ── Payment endpoints ─────────────────────────────────────────────────────────
export const paymentsAPI = {
  createOrder:   (rental_id) => api.post("/api/payments/create-order/",       { rental_id }),
  verifyPayment: (data)      => api.post("/api/payments/verify/",             data),
  getReceipt:    (rental_id) => api.get(`/api/payments/${rental_id}/receipt/`),
};

export default api;