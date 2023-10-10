import { createConsumer } from "@rails/actioncable";

const wsUrl =
  process.env.NODE_ENV !== "production"
    ? "wss://concordia.naimmiah.com/cable"
    : "wss://concordia.naimmiah.com/cable";

export default createConsumer(wsUrl);
