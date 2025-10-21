"use server";
import db from "@/lib/db";

const getWorkouts = async () => {
    return await db.workout.findMany();
}

export { getWorkouts }