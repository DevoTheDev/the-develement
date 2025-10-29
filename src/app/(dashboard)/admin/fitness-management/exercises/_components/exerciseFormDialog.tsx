"use client";
import { HookForm } from "@/components/ui/HookForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useExercisesStore } from "../_libs/useExerciseStore";
import { useCreateExercise, useUpdateExercise } from "../_services/useExerciseMutations";
import { ExerciseSchema, exerciseDefaultValues, exerciseSchema } from "../_types/exerciseSchema";
import { useExercise } from "../_services/useExerciseQueries";
import { DrawerDialog } from "@/app/(dashboard)/_components/DrawerDialog";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import D_Button from "@/components/D_Components/D_Button";

const ExerciseForm = () => {
    const form = useForm<ExerciseSchema>({
        defaultValues: exerciseDefaultValues,
        resolver: zodResolver(exerciseSchema),
    });

    const {
        selectedExerciseId,
        updateSelectedExerciseId,
        exerciseDialogOpen,
        updateExerciseDialogOpen,
    } = useExercisesStore();

    const ExerciseQuery = useExercise();
    const createExerciseMutation = useCreateExercise();
    const updateExerciseMutation = useUpdateExercise();

    const isPending =
        createExerciseMutation.isPending || updateExerciseMutation.isPending;

    useEffect(() => {
        if (!!selectedExerciseId && ExerciseQuery.data) {
            form.reset(ExerciseQuery.data);
        }
    }, [ExerciseQuery.data, form, selectedExerciseId]);

    const handleDialogOpenChange = (open: boolean) => {
        updateExerciseDialogOpen(open);

        if (!open) {
            updateSelectedExerciseId(null);
            form.reset(exerciseDefaultValues);
        }
    };

    const handleSuccess = () => {
        handleDialogOpenChange(false);
    };

    const onSubmit: SubmitHandler<ExerciseSchema> = (data) => {
        console.log(data);
        if (data.action === "create") {
            createExerciseMutation.mutate(data, {
                onSuccess: handleSuccess,
            });
        } else {
            updateExerciseMutation.mutate(data, { onSuccess: handleSuccess });
        }
    };

    return (
        <DrawerDialog
            openState={{
                open: exerciseDialogOpen,
                setOpen: handleDialogOpenChange,
            }}
            title={selectedExerciseId ? "Edit Exercise" : "Create a New Exercise"}
            trigger={(
                <D_Button
                    icon="Plus"
                    label="New Exercise"
                    className="flex items-center gap-3 p-4 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg"
                />
            )}
            content={(
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-4">
                            <HookForm.TextInput<ExerciseSchema>
                                name="name"
                                label="Name"
                                containerClassName="w-2/3"
                                placeholder="Enter Exercise name"
                            />
                            <HookForm.TextInput<ExerciseSchema>
                                name="description"
                                label="Description"
                                containerClassName="w-full"
                                className="w-full"
                                placeholder="Enter Exercise description"
                            />
                        </div>
                    </FormProvider>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {`${!!selectedExerciseId ? "Edit" : "Create"} Exercise`}
                        </Button>
                    </DialogFooter>
                </form>
            )}
        />
    )
};
export { ExerciseForm };