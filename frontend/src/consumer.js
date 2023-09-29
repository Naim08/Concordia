import { createConsumer } from "@rails/actioncable";

const wsUrl =
  process.env.NODE_ENV !== "production"
    ? "wss://api.naimmiah.com/cable"
    : "wss://api.naimmiah.com/cable";

export default createConsumer(wsUrl);
