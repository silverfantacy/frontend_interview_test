import { fetchWrapper } from "../api";

export default {
    getAds: () => fetchWrapper.get(`adData`),
    getAd: (id: number) => fetchWrapper.get(`adData/${id}`),
    createAd: (data: any) => fetchWrapper.post(`adData`, data),
    updateAd: (id: number, data: any) => fetchWrapper.put(`adData/${id}`, data),
    deleteAd: (id: number) => fetchWrapper.delete(`adData/${id}`),
}
