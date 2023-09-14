import { createConsumer } from "@rails/actioncable";

const wsUrl =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:5000/cable"
    : "/cable";

export default createConsumer(wsUrl);
