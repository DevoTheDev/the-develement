"use server";

import { ExerciseSchema } from "../_types/exerciseSchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const createExercise = async (data: ExerciseSchema) => {
    await executeAction({
        actionFn: () => db.exercise.create({
            data: {
                name: data.name,
                description: data.description,
                reps: data.reps,
                sets: data.sets,
            },
        }),
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
        sets: res.sets || 1,
        reps: res.reps || 1,
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
                    sets: data.sets,
                    reps: data.reps,
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