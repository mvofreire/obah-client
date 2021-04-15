import request from "util/request";

export const checkIfEmailExists = (email) => {
  return request.post("/store/email-exists", { email });
};

export const updateClient = async ({ logo }) => {
  const formData = new FormData();
  
  formData.append('image', logo)

  return request.postFormData("/user/image", formData);
};
