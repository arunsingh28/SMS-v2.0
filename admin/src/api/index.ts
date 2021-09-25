const Production = true;

const Call = {
  Production: {
    URI: Production
      ? "https://sms-rest-api-v1.herokuapp.com"
      : "http://localhost:8080",
  },
};

export default Call;
