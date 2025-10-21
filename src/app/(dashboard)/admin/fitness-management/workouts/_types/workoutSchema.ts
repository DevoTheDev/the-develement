import { z } from "zod"; // Import Zod for schema validation

// Define workoutSchema to match Prisma Workout model
const workoutSchema = z.intersection(
    z.object({
        name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"), // Required string, 1–255 chars
        caloriesBurned: z.number().int().min(0, "Calories burned must be non-negative"), // Required non-negative integer
        stress: z.enum(["STRENGTH", "SIZE", "ENDURANCE"], {
            errorMap: () => ({ message: "Stress must be STRENGTH, SIZE, or ENDURANCE" }),
        }), // Required enum from WorkoutStress
    }),
    z.discriminatedUnion("action", [ // Discriminated union for action
        z.object({ action: z.literal("create") }), // Create: no id
        z.object({ action: z.literal("update"), id: z.number().min(1, "ID must be a positive number") }), // Update: requires id
    ])
);

// Infer TypeScript type from schema
type WorkoutSchema = z.infer<typeof workoutSchema>;

// Default values for WorkoutSchema
const workoutDefaultValues: WorkoutSchema = {
    action: "create", // Default to create action
    name: "", // Empty name
    caloriesBurned: 0, // Default to 0 calories
    stress: "STRENGTH", // Default to STRENGTH
};

// Export schema, type, and default values
export { workoutSchema, workoutDefaultValues, type WorkoutSchema };