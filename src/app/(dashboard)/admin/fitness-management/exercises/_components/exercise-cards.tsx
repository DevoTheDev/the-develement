"use client";
import { useExercises } from "../_services/useExerciseQueries";
import { useDeleteExercise } from "../_services/useExerciseMutations";
import { alert } from "@/lib/use-global-store";
import { useExercisesStore } from "../_libs/useExerciseStore";
import Card from "@/app/(dashboard)/_components/Card";
import React from "react";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import { CardsSkeleton } from "@/app/(dashboard)/_components/CardsSkeleton";
import D_Card from "@/components/D_Components/D_Card";
import D_Button from "@/components/D_Components/D_Button";

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
                    {exerciseQuery.data?.map((item, i) => {
                        return (
                            <D_Card
                                className={`
                                hover:scale-110 p-4 
                                transition-transform ease-in-out duration-300 gap-2
                                bg-black/10 hover:bg-black/5
                                rounded-lg
                                `}
                                key={`${item.id}${i}`}
                                header={(
                                    <div className="w-full flex-1 min-h-[3.5rem] text-2xl font-bold flex items-center">
                                        {item.name}
                                    </div>
                                )}
                                body={(
                                    <div key={`${item.id}${i}`} className="w-full flex flex-col gap-4">
                                        {item.description}
                                    </div>
                                )}
                                footer={(
                                    <div
                                        className="w-full flex justify-end gap-3">
                                        <div className="w-full flex-1 min-h-[3.5rem] flex items-center text-3xl gap-4">
                                            <div className="flex gap-2 items-center">
                                                {item.sets}
                                                <span className="font-thin text-lg">Sets</span>
                                            </div>

                                            <D_Button icon="XIcon" />

                                            <div className="flex gap-2 items-center">
                                                {item.reps}
                                                <span className="font-thin text-lg">Reps</span>
                                            </div>
                                        </div>
                                        <D_Button
                                            iconSize={5}
                                            className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                            onClick={() => {
                                                updateSelectedExerciseId(item.id);
                                                updateExerciseDialogOpen(true);
                                            }}
                                            tooltip="Edit"
                                            icon="Edit" />
                                        <D_Button
                                            iconSize={5}
                                            className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                            onClick={() => {
                                                alert({
                                                    onConfirm: () => deleteExerciseMutation.mutate(item.id),
                                                });
                                            }}
                                            tooltip="Delete"
                                            icon="Trash" />
                                    </div>
                                )}
                            />
                        )
                    })}
                </>
            )}

        </div>
    );
};

export default ExerciseCards;