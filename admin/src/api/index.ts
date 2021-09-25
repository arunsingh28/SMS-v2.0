const Production = false;

const Call = {
  Production: {
    URI: Production
      ? "https://sms-rest-api-v1.herokuapp.com/admin/v1"
      : "http://localhost:8080/admin/v1",
  },
};

export default Call;
