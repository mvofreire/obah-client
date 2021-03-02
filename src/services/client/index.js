import request from "util/request";

export const checkIfEmailExists = (email) => {
  return request.post("/client/email-exists", { email });
};

export const updateClient = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return request.postFormData('/client/update', formData);
};
