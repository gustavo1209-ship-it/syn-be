import { createCrudRouter } from "../lib/crudRouter.js";
import { researchNoteInputSchema } from "../types.js";

export const researchNotesRouter = createCrudRouter("research_notes", researchNoteInputSchema);
