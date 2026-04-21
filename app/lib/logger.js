import { Axiom } from "@axiomhq/js";

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
});

const logger = {
  info: (message, fields = {}) => {
    axiom.ingest("casillero", [{ message, level: "info", ...fields }]);
    console.log(message, fields);
  },
  warn: (message, fields = {}) => {
    axiom.ingest("casillero", [{ message, level: "warn", ...fields }]);
    console.warn(message, fields);
  },
  error: (message, fields = {}) => {
    axiom.ingest("casillero", [{ message, level: "error", ...fields }]);
    console.error(message, fields);
  },
};

export default logger;
