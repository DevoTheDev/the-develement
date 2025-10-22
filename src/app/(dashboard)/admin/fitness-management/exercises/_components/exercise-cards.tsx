"use client";
import { useExercises } from "../_services/useExerciseQueries";
import { useDeleteExercise } from "../_services/useExerciseMutations";
import { alert } from "@/lib/use-global-store";
import { useExercisesStore } from "../_libs/useExerciseStore";
import Card from "@/app/(dashboard)/_components/Card";
import React from "react";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import { CardsSkeleton } from "@/app/(dashboard)/_components/CardsSkeleton";

const ExerciseCards = () => {
    const exerciseQuery = useExercises();
    const deleteExerciseMutation = useDeleteExercise();
    const { updateExerciseDialogOpen, updateSelectedExerciseId } = useExercisesStore();

    if (exerciseQuery.data?.length === 0) {
        return <NoItemsFound onClick={() => updateExerciseDialogOpen(true)} />
    }

    return (
        <div
            className={`grid gap-6 md:grid-cols-4 sm:grid-cols-1`}>
            {exerciseQuery.isLoading ? (
                <CardsSkeleton />
            ) : (
                <>
                    {exerciseQuery.data?.map((item) => (
                        <Card
                            className="bg-background border-2 dark:shadow-white/30 shadow-md border-white/25 rounded-lg p-2"
                            key={item.id}
                            button1={{
                                icon: "edit",
                                iconSize: 5,
                                tooltip: "Edit",
                                onClick: () => {
                                    console.log("Editing exercise:", item.id);
                                    updateSelectedExerciseId(item.id);
                                    updateExerciseDialogOpen(true);
                                },
                            }}
                            button2={{
                                icon: "trash",
                                iconSize: 5,

                                tooltip: "Delete",
                                onClick: () => {
                                    alert({
                                        onConfirm: () => deleteExerciseMutation.mutate(item.id),
                                    });
                                },
                            }}>
                            <div className="pb-4">
                                <p className="truncate font-bold">{item.name}</p>
                                <p className="truncate font-thin text-sm">{item.description}</p>
                                <span className="flex gap-2">
                                    <p className="truncate">{`${item.sets} Sets`}</p>
                                    <p className="items-center pt-1 text-xs text-gray-500" >x</p>
                                    <p className="truncate">{`${item.reps} Reps`}</p>
                                </span>
                            </div>
                        </Card>
                    ))}
                </>
            )}

        </div>
    );
};

export default ExerciseCards;