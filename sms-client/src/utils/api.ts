const Production = false;

/**
 * @mode 
 * produnction is TRUE
 * development is FALSE
*/

const api = {
  production: {
    URI: Production
      ? "https://sms-rest-api-v1.herokuapp.com"
      : "http://localhost:8080",
  },
};

export default api;


