import { Axiom } from "@axiomhq/js";

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
});

const logger = {
  info: async (message, fields = {}) => {
    try {
      await axiom.ingest("casillero", [{ message, level: "info", ...fields }]);
    } catch (e) {
      console.log("Axiom error:", e.message);
    }
    console.log(message, fields);
  },
  warn: async (message, fields = {}) => {
    try {
      await axiom.ingest("casillero", [{ message, level: "warn", ...fields }]);
    } catch (e) {
      console.warn("Axiom error:", e.message);
    }
    console.warn(message, fields);
  },
  error: async (message, fields = {}) => {
    try {
      await axiom.ingest("casillero", [{ message, level: "error", ...fields }]);
    } catch (e) {
      console.error("Axiom error:", e.message);
    }
    console.error(message, fields);
  },
};

export default logger;
