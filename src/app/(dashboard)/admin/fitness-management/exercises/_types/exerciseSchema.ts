import { patterns } from "@/lib/regexp-patterns";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchema";
import { z } from "zod"; // Import Zod for schema validation

// Define exerciseSchema to match Prisma Exercise model
const exerciseSchema = z.intersection(
    z.object({
        name: requiredStringSchema,
        description: requiredStringSchema,
        sets: regexSchema(patterns.zeroTo9999),
        reps: regexSchema(patterns.zeroTo9999),
    }),
    z.discriminatedUnion("action", [ // Discriminated union for action
        z.object({ action: z.literal("create") }), // Create: no id
        z.object({ action: z.literal("update"), id: z.number() }), // Update: requires id
    ])
);

// Infer TypeScript type from schema
type ExerciseSchema = z.infer<typeof exerciseSchema>;

// exerciseSchema.ts
const exerciseDefaultValues: ExerciseSchema = {
    action: "create",
    name: "",
    description: "",
    sets: "",
    reps: "",
};

// Export schema, type, and default values
export { exerciseSchema, exerciseDefaultValues, type ExerciseSchema };