import { Deta } from "deta";
const deta = new Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base("links");

export default db;
