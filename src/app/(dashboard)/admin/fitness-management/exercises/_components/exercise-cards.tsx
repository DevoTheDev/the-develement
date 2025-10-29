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
                            <div
                                className="cursor-pointer"
                                key={`${item.id}${i}`}
                                onClick={() => {
                                    updateExerciseDialogOpen(true);
                                    updateSelectedExerciseId(item.id);
                                }}
                            >
                                <D_Card
                                    className={`
                                hover:scale-110 
                                transition-transform ease-in-out duration-300
                              hover:bg-black/5 rounded-lg p-8 dark:bg-white/10
                                bg-black/10
                                flex flex-col justify-stretch items-center
                                `}
                                    header={(
                                        <div className="w-full min-h-[3.5rem] items-center text-2xl font-bold flex self-start">
                                            {item.name}
                                        </div>
                                    )}
                                    body={(
                                        <div className="w-full min-h-[5.5rem] items-center flex gap-4 ">
                                            {item.description}
                                        </div>
                                    )}
                                    footer={(
                                        <div
                                            className="w-full flex items-center gap-3 ">
                                            <div className="w-full flex items-center text-3xl gap-4">
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
                                                className='p-2 hover:bg-red-200 rounded-lg text-red-500'
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
                            </div>
                        )
                    })}
                </>
            )}

        </div>
    );
};

export default ExerciseCards;