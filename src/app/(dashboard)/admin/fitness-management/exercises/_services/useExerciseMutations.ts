
import { ExerciseSchema } from "../_types/exerciseSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExercise, updateExercise, deleteExercise } from "./services";


const useCreateExercise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ExerciseSchema) => {
            await createExercise(data);
        },
        onSuccess: () => {
            toast.success("Exercise created successfully.");
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
        },
    });
};

const useUpdateExercise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ExerciseSchema) => {
            await updateExercise(data);
        },
        onSuccess: () => {
            toast.success("Exercise updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
        },
    });
};

const useDeleteExercise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await deleteExercise(id);
        },
        onSuccess: () => {
            toast.success("Exercise deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
        },
    });
};

export { useCreateExercise, useDeleteExercise, useUpdateExercise };