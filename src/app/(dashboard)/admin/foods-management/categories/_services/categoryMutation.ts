"use server"; // Marks file as Server Actions for Next.js server-side execution

import { CategorySchema } from "../_types/categorySchema"; // Import Zod schema and type for category validation
import db from "@/lib/db"; // Import database client (e.g., Prisma)
import { executeAction } from "@/lib/executeAction"; // Import utility for executing DB actions

// Create a new category using validated CategorySchema
const createCategory = async (data: CategorySchema) => {
    await executeAction({
        actionFn: () => db.category.create({ // Create DB entry
            data: { name: data.name }, // Use validated name
        }),
    });
};

// Update existing category if action is "update"
const updateCategory = async (data: CategorySchema) => {
    if (data.action === "update") { // Check for update action
        await executeAction({
            actionFn: () => db.category.update({ // Update DB entry
                where: { id: data.id }, // Match by id
                data: { name: data.name }, // Update with validated name
            }),
        });
    }
};

// Delete category by ID
const deleteCategory = async (id: number) => {
    await executeAction({
        actionFn: () => db.category.delete({ where: { id } }), // Delete DB entry
    });
};

// Fetch all categories
const getCategories = async () => {
    return await db.category.findMany(); // Return list of categories
};

// Fetch single category by ID, format as CategorySchema
const getCategory = async (id: number): Promise<CategorySchema> => {
    const res = await db.category.findFirst({ where: { id } }); // Find category
    return {
        ...res,
        action: "update", // Set action for update form
        name: res?.name ?? "", // Use name or fallback
        id, // Include ID
    };
};

// Export server actions for use in API routes or forms
export { createCategory, getCategory, getCategories, deleteCategory, updateCategory };