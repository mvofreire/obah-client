const isProd = process.env.NODE_ENV === "production";

export default {
  userSessionKey: `obah-web-session-key-${isProd ? "" : "-local"}`,
  baseUrl: process.env.REACT_APP_API_URL,
};
