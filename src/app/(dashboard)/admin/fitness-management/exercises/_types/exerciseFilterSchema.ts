// src/app/(dashboard)/admin/exercises-management/exercises/_types/exerciseFilterSchema.ts
import { EquipmentAvailability, Grips, Joints, Muscles } from "$/generated/prisma";
import { z } from "zod";

const equipmentEnum = z.nativeEnum(EquipmentAvailability);
const gripEnum = z.nativeEnum(Grips).nullable();
const musclesEnum = z.array(z.nativeEnum(Muscles));
const jointsEnum = z.array(z.nativeEnum(Joints));

export const exerciseFiltersSchema = z.object({
    searchTerm: z.string(),
    targetMuscles: musclesEnum,
    targetJoints: jointsEnum,
    equipment: equipmentEnum.optional(),
    hasBarbell: z.boolean().optional(),
    hasDumbbell: z.boolean().optional(),
    hasCable: z.boolean().optional(),
    hasBodyweight: z.boolean().optional(),
    grip: gripEnum,
    sortBy: z.enum(["name", "equipment"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.number(),
    pageSize: z.number().max(100),
});

/* ------------------------------------------------------------------ */
/*  This is the **exact** shape that the form will submit – required   */
/* ------------------------------------------------------------------ */
export type ExerciseFiltersFormValues = z.infer<typeof exerciseFiltersSchema>;

export const exerciseFiltersDefaultValues: ExerciseFiltersFormValues = {
    searchTerm: "",
    targetMuscles: [],
    targetJoints: [],
    equipment: undefined,
    hasBarbell: undefined,
    hasDumbbell: undefined,
    hasCable: undefined,
    hasBodyweight: undefined,
    grip: null,
    sortBy: "name",
    sortOrder: "asc",
    pageSize: 12,
    page: 1,
};