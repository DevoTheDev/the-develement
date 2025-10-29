// app/_actions/exerciseActions.ts
"use server";

import { exerciseSchema, ExerciseSchema } from "../_types/exerciseSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { revalidatePath } from "next/cache";

// === CREATE ===
const createExercise = async (data: ExerciseSchema) => {
    const validated = exerciseSchema.parse(data);

    return await executeAction({
        actionFn: async () => {
            const exercise = await db.exercise.create({
                data: {
                    name: validated.name,
                    description: validated.description,
                    equipment: validated.equipment,
                    targetMuscles: { set: validated.targetMuscles },
                    targetJoints: { set: validated.targetJoints },
                    variations: {
                        create: validated.variations.map((v) => ({
                            weightVariation: v.weightVariation,
                            grip: v.grip,
                        })),
                    },
                },
                include: { variations: true },
            });
            revalidatePath("/exercises");
            return exercise;
        },
    });
};

// === READ ALL ===
const getExercises = async () => {
    return await db.exercise.findMany({
        include: { variations: true },
        orderBy: { name: "asc" },
    });
};

// === READ ONE ===
const getExercise = async (id: number): Promise<ExerciseSchema> => {
    const exercise = await db.exercise.findUnique({
        where: { id },
        include: { variations: true },
    });

    if (!exercise) {
        throw new Error(`Exercise with id ${id} not found`);
    }

    return {
        action: "update",
        id: exercise.id,
        name: exercise.name,
        description: exercise.description ?? "",
        equipment: exercise.equipment ?? undefined,
        targetMuscles: exercise.targetMuscles,
        targetJoints: exercise.targetJoints,
        variations: exercise.variations.map((v) => ({
            weightVariation: v.weightVariation,
            grip: v.grip,
        })),
    };
};

// === UPDATE ===
const updateExercise = async (data: ExerciseSchema) => {
    if (data.action !== "update") return;


    return await executeAction({
        actionFn: async () => {
            const validated = exerciseSchema.parse(data);
            const exercise = await db.exercise.update({
                where: { id: validated.id },
                data: {
                    name: validated.name,
                    description: validated.description,
                    equipment: validated.equipment,
                    targetMuscles: { set: validated.targetMuscles },
                    targetJoints: { set: validated.targetJoints },
                },
            });

            // 2. Delete old variations
            await db.exerciseVariation.deleteMany({
                where: { baseExerciseId: validated.id },
            });

            // 3. Create new variations
            if (validated.variations.length > 0) {
                await db.exerciseVariation.createMany({
                    data: validated.variations.map((v) => ({
                        baseExerciseId: validated.id,
                        weightVariation: v.weightVariation,
                        grip: v.grip,
                    })),
                });
            }
        },
    });
};

// === DELETE ===
const deleteExercise = async (id: number) => {
    return await executeAction({
        actionFn: async () => {
            await db.exercise.delete({ where: { id } });
            revalidatePath("/exercises");
        },
        errorMessage: "Failed to delete exercise",
    });
};

export {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise,
};