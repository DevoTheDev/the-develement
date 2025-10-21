import { z } from "zod"; // Import Zod for schema validation

// Define categorySchema using Zod
const categorySchema = z.intersection(
    z.object({
        name: z.string().min(1).max(255), // Name: non-empty string, max 255 chars
    }),
    z.discriminatedUnion("action", [ // Discriminated union for action type
        z.object({ action: z.literal("create") }), // Create action: no additional fields
        z.object({ action: z.literal("update"), id: z.number().min(1) }), // Update action: requires id (positive number)
    ]),
);

// Infer TypeScript type from schema
type CategorySchema = z.infer<typeof categorySchema>;

// Default values for CategorySchema
const categoryDefaultValues: CategorySchema = {
    action: "create", // Default action is "create"
    name: "", // Default empty name
};

// Export schema, default values, and type
export { categorySchema, categoryDefaultValues, type CategorySchema };