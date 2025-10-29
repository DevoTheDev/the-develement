// src/app/(dashboard)/admin/exercises-management/exercises/_components/ExerciseCards.tsx
"use client";

import { useExercises } from "../_services/useExerciseQueries";
import { useDeleteExercise } from "../_services/useExerciseMutations";
import { alert } from "@/lib/use-global-store";
import { useExercisesStore } from "../_libs/useExerciseStore";
import D_Card from "@/components/D_Components/D_Card";
import D_Button from "@/components/D_Components/D_Button";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import { CardsSkeleton } from "@/app/(dashboard)/_components/CardsSkeleton";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Trash, Dumbbell, Grip, Target, Link } from "lucide-react";
import React, { useMemo } from "react";
import { ExerciseFiltersFormValues } from "../_types/exerciseFilterSchema";
import { Button } from "@/components/ui/button";

const ExerciseCards = () => {
    const { data: exercises, isLoading } = useExercises();
    const deleteExerciseMutation = useDeleteExercise();
    const { updateExerciseDialogOpen, updateSelectedExerciseId, exerciseFilters } = useExercisesStore();

    // Destructure filters
    const {
        searchTerm = "",
        targetMuscles = [],
        targetJoints = [],
        equipment,
        hasBarbell,
        hasDumbbell,
        hasCable,
        hasBodyweight,
        grip,
        sortBy = "name",
        sortOrder = "asc",
    } = exerciseFilters as ExerciseFiltersFormValues;

    // Filter + Sort
    const filteredAndSortedExercises = useMemo(() => {
        if (!exercises) return [];

        let filtered = exercises;

        // 1. Search (name + description)
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (ex) =>
                    ex.name.toLowerCase().includes(lower) ||
                    (ex.description && ex.description.toLowerCase().includes(lower))
            );
        }

        // 2. Target Muscles
        if (targetMuscles.length > 0) {
            filtered = filtered.filter((ex) =>
                targetMuscles.every((m) => ex.targetMuscles.includes(m))
            );
        }

        // 3. Target Joints
        if (targetJoints.length > 0) {
            filtered = filtered.filter((ex) =>
                targetJoints.every((j) => ex.targetJoints.includes(j))
            );
        }

        // 4. Equipment
        if (equipment) {
            filtered = filtered.filter((ex) => ex.equipment === equipment);
        }

        // 5. Variation presence
        const hasVariation = (variation: string) => {
            return filtered.filter((ex) =>
                ex.variations.some((v) => v.weightVariation === variation)
            );
        };

        if (hasBarbell) filtered = hasVariation("BARBELL");
        else if (hasDumbbell) filtered = hasVariation("DUMBBELL");
        else if (hasCable) filtered = hasVariation("CABLE");
        else if (hasBodyweight) filtered = hasVariation("BODYWEIGHT");

        // 6. Grip
        if (grip) {
            filtered = filtered.filter((ex) =>
                ex.variations.some((v) => v.grip === grip)
            );
        }

        // 7. Sorting
        const sorted = [...filtered].sort((a, b) => {
            let aVal: string | number = "";
            let bVal: string | number = "";

            switch (sortBy) {
                case "name":
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                    break;
                case "equipment":
                    aVal = a.equipment || "";
                    bVal = b.equipment || "";
                    break;
                default:
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
            }

            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [
        exercises,
        searchTerm,
        targetMuscles,
        targetJoints,
        equipment,
        hasBarbell,
        hasDumbbell,
        hasCable,
        hasBodyweight,
        grip,
        sortBy,
        sortOrder,
    ]);

    if (isLoading) {
        return <CardsSkeleton />;
    }

    if (!exercises || exercises.length === 0) {
        return <NoItemsFound onClick={() => updateExerciseDialogOpen(true)} />;
    }

    if (filteredAndSortedExercises.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium text-muted-foreground">No exercises match your filters</p>
                <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => updateExerciseDialogOpen(true)}
                >
                    Clear filters or add a new exercise
                </Button>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAndSortedExercises.map((exercise) => {
                    const muscleCount = exercise.targetMuscles.length;
                    const jointCount = exercise.targetJoints.length;
                    const variationCount = exercise.variations.length;

                    return (
                        <D_Card
                            key={exercise.id}
                            className={`
                group relative overflow-hidden rounded-xl border bg-card/80 p-5
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-lg hover:bg-card/95
                hover:border-primary/20
              `}
                            header={
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-bold text-foreground line-clamp-2">
                                        {exercise.name}
                                    </h3>
                                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <D_Button
                                                    icon="Edit"
                                                    className="h-8 w-8"
                                                    onClick={() => {
                                                        updateSelectedExerciseId(exercise.id);
                                                        updateExerciseDialogOpen(true);
                                                    }}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>Edit Exercise</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <D_Button
                                                    icon="Trash"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        alert({
                                                            title: "Delete Exercise?",
                                                            description: `This will permanently remove "${exercise.name}".`,
                                                            onConfirm: () => deleteExerciseMutation.mutate(exercise.id),
                                                        })
                                                    }
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>Delete Exercise</TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            }
                            body={
                                <div className="space-y-4">
                                    {/* Description */}
                                    {exercise.description ? (
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {exercise.description}
                                        </p>
                                    ) : (
                                        <p className="text-sm italic text-muted-foreground">No description</p>
                                    )}

                                    {/* Equipment Badge */}
                                    <div className="flex items-center gap-2">
                                        <Dumbbell className="h-4 w-4 text-primary" />
                                        <Badge variant="secondary" className="text-xs">
                                            {exercise.equipment || "Bodyweight"}
                                        </Badge>
                                    </div>

                                    {/* Target Muscles */}
                                    {muscleCount > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            <Target className="h-3.5 w-3.5 text-emerald-600" />
                                            <div className="flex flex-wrap gap-1">
                                                {exercise.targetMuscles.slice(0, 3).map((muscle) => (
                                                    <Badge key={muscle} variant="outline" className="text-xs">
                                                        {muscle}
                                                    </Badge>
                                                ))}
                                                {muscleCount > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{muscleCount - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Target Joints */}
                                    {jointCount > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            <Link className="h-3.5 w-3.5 text-blue-600" />
                                            <div className="flex flex-wrap gap-1">
                                                {exercise.targetJoints.slice(0, 3).map((joint) => (
                                                    <Badge key={joint} variant="outline" className="text-xs">
                                                        {joint.replace(/_/g, " ")}
                                                    </Badge>
                                                ))}
                                                {jointCount > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{jointCount - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Variations */}
                                    {variationCount > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            <Grip className="h-3.5 w-3.5 text-purple-600" />
                                            <div className="flex flex-wrap gap-1">
                                                {exercise.variations.slice(0, 3).map((v, i) => (
                                                    <Badge key={i} variant="secondary" className="text-xs">
                                                        {v.weightVariation}
                                                        {v.grip && ` • ${v.grip.replace(/_/g, " ")}`}
                                                    </Badge>
                                                ))}
                                                {variationCount > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{variationCount - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    );
                })}
            </div>
        </TooltipProvider>
    );
};

export default ExerciseCards;