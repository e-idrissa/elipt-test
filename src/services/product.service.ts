import { api } from "@/lib/axios";

export const productsService = {
  getMyProducts: async () => {
    const response = await api.get("/Product/getProduct");
    return response.data;
  },

  getOtherProducts: async () => {
    const response = await api.get("/Product/getOtherProduct");
    return response.data;
  },

  // 3. Upload product image
  uploadProductImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/AppUsers/UploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url || response.data.url;
  },

  // 4. Create product
  createProduct: async (data: { title: string; description: string; image: string; price: number }) => {
    const response = await api.post("/Product/Create", data);
    return response.data;
  },

  // 5. Delete product
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/Product/delete/${id}`);
    return response.data;
  },
};