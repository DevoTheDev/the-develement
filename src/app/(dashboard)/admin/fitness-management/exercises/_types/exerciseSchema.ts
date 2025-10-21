import { z } from "zod"; // Import Zod for schema validation

// Define exerciseSchema to match Prisma Exercise model
const exerciseSchema = z.intersection(
    z.object({
        name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"), // Required string, 1–255 chars
        description: z.string().min(1, "Description is required"), // Required string, min 1 char
        sets: z.number().int().min(1, "Sets must be at least 1"), // Required positive integer
        reps: z.number().int().min(1, "Reps must be at least 1"), // Required positive integer
    }),
    z.discriminatedUnion("action", [ // Discriminated union for action
        z.object({ action: z.literal("create") }), // Create: no id
        z.object({ action: z.literal("update"), id: z.number().min(1, "ID must be a positive number") }), // Update: requires id
    ])
);

// Infer TypeScript type from schema
type ExerciseSchema = z.infer<typeof exerciseSchema>;

// exerciseSchema.ts
const exerciseDefaultValues: Extract<ExerciseSchema, { action: "create" }> = {
    action: "create",
    name: "",
    description: "",
    sets: 1,
    reps: 1,
};

// Export schema, type, and default values
export { exerciseSchema, exerciseDefaultValues, type ExerciseSchema };