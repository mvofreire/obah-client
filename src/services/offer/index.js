import request from "util/request";

export const loadMyOffers = async () => {
  return request.get("/promotion", { preload: "images,participants,tags" });
};

export const createOffer = async (data) => {
  const { images, ...offer } = data;
  const promotion = await request.post("/promotion", offer);

  const promises = [];
  images?.forEach((image) => {
    const formData = new FormData();
    formData.append("promotionId", promotion.id);
    formData.append("image", image);
    promises.push(request.postFormData("/promotion/attach-image", formData));
  });
  return await Promise.all(promises);
};

export const updateOffer = (id, data) => {
  return request.put(`/promotion/${id}`, data);
};

export const removeOffer = (id) => {
  return request.delete(`/promotion/${id}`);
};

export const loadPromotionTags = () => {
  return request.get("/tags");
};
