import { createCrudRouter } from "../lib/crudRouter.js";
import { initiativeInputSchema } from "../types.js";

export const initiativesRouter = createCrudRouter("synbe_initiatives", initiativeInputSchema);
