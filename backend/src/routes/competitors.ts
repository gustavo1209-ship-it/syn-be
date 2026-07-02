import { createCrudRouter } from "../lib/crudRouter.js";
import { competitorInputSchema } from "../types.js";

export const competitorsRouter = createCrudRouter("synbe_competitors", competitorInputSchema);
