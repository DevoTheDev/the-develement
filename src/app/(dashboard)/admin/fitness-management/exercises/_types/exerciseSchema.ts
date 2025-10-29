import { EquipmentAvailability, Grips, Joints, Muscles, WeightVariation } from "$/generated/prisma";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchema";
import { discriminatedUnion, z } from "zod"; // Import Zod for schema validation

// === Zod Enums (mirrored from Prisma) ===
const equipmentEnum = z.nativeEnum(EquipmentAvailability).optional();
const weightVariationEnum = z.nativeEnum(WeightVariation);
const gripEnum = z.nativeEnum(Grips).nullable().optional();
const musclesEnum = z.array(z.nativeEnum(Muscles)).default([]);
const jointsEnum = z.array(z.nativeEnum(Joints)).default([]);

// === Variation Schema ===
const variationSchema = z.object({
    weightVariation: weightVariationEnum,
    grip: gripEnum,
});

// === Base Exercise Schema ===
const baseExerciseSchema = z.object({
    name: requiredStringSchema,
    description: requiredStringSchema,
    equipment: equipmentEnum,
    targetMuscles: musclesEnum,
    targetJoints: jointsEnum,
    variations: z.array(variationSchema).default([]),
});

const exerciseSchema = z.intersection(
    baseExerciseSchema,
    z.discriminatedUnion("action", [
        z.object({ action: z.literal("create") }),
        z.object({
            action: z.literal("update"),
            id: z.number(),
        }),
    ])
);
// === TypeScript Type ===
type ExerciseSchema = z.infer<typeof exerciseSchema>;

// === Default Values (for forms) ===
const exerciseDefaultValues: ExerciseSchema = {
    action: "create",
    name: "",
    description: "",
    equipment: undefined,
    targetMuscles: [],
    targetJoints: [],
    variations: [],
};

// Export schema, type, and default values
export { exerciseSchema, exerciseDefaultValues, type ExerciseSchema };