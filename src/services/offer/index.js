import request from "util/request";

export const loadMyOffers = async () => {
  return request.get("/client/offer");
};

export const createOffer = (data) => {
  console.log(data);
  const { images, ...offer } = data;

  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  Object.keys(offer).forEach((key) => formData.append(key, offer[key]));
  return request.postFormData("/client/offer", formData);
};

export const updateOffer = (id, data) => {
  return request.put(`/client/offer/${id}`, data);
};

export const removeOffer = (id) => {
  return request.delete(`/client/offer/${id}`);
};
