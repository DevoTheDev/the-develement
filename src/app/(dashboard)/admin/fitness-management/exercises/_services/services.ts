"use server";

import { exerciseSchema, ExerciseSchema } from "../_types/exerciseSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { toNumberSafe, toStringSafe } from "@/lib/utils";

const createExercise = async (data: ExerciseSchema) => {
    await executeAction({
        actionFn: () => {
            const validatedData = exerciseSchema.parse(data);

            return db.exercise.create({
                data: {
                    name: validatedData.name,
                    description: validatedData.description,
                    reps: toNumberSafe(validatedData.reps),
                    sets: toNumberSafe(validatedData.sets),
                },
            })
        },
    });
};

const getExercises = async () => {
    return await db.exercise.findMany();
};

const getExercise = async (id: number): Promise<ExerciseSchema> => {
    const res = await db.exercise.findFirst({ where: { id } });
    if (!res) {
        throw new Error(`Exercise with id ${id} not found`);
    }
    return {
        name: res.name || "",
        description: res.description || "",
        sets: toStringSafe(res.sets || 1),
        reps: toStringSafe(res.reps || 1),
        action: "update",
        id,
    };
};

const updateExercise = async (data: ExerciseSchema) => {
    if (data.action === "update") {
        await executeAction({
            actionFn: () => db.exercise.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    description: data.description,
                    sets: toNumberSafe(data.sets),
                    reps: toNumberSafe(data.reps),
                },
            }),
        });
    }
};

const deleteExercise = async (id: number) => {
    await executeAction({
        actionFn: () => db.exercise.delete({ where: { id } }),
    });
};


export { createExercise, getExercise, getExercises, deleteExercise, updateExercise };