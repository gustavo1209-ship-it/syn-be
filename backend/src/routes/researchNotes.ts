import { createCrudRouter } from "../lib/crudRouter.js";
import { researchNoteInputSchema } from "../types.js";

export const researchNotesRouter = createCrudRouter("synbe_research_notes", researchNoteInputSchema);
