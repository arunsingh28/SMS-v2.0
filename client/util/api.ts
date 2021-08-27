const Production = true;

const api = {
  production: {
    URI: Production
      ? "http://localhost:8080"
       :"https://sms-rest-api-v1.herokuapp.com"
      ,
  },
};

export default api;
