const isProd = process.env.NODE_ENV === "production";
const userSessionKey = isProd ? 'obah-web-session-key' : 'obah-web-session-key-local'
const baseUrl = process.env.REACT_APP_API_URL;

console.log(baseUrl, userSessionKey);

export default {
  userSessionKey,
  baseUrl
};
