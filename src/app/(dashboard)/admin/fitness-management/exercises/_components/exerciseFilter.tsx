// src/app/(dashboard)/admin/exercises-management/exercises/_components/ExerciseFiltersDrawerDialog.tsx
"use client";

import { useState } from "react";
import {
    useForm,
    SubmitHandler,
    Controller,
    FormProvider,
    useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExercisesStore } from "../_libs/useExerciseStore";
import {
    exerciseFiltersSchema,
    exerciseFiltersDefaultValues,
    ExerciseFiltersFormValues,
} from "../_types/exerciseFilterSchema";
import {
    EquipmentAvailability,
    Grips,
    Joints,
    Muscles,
} from "$/generated/prisma";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/lib/useDebounce";
import { useEffect, useMemo } from "react";
import equal from "fast-deep-equal";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FilterIcon } from "lucide-react";
import { DrawerDialog } from "@/app/(dashboard)/_components/DrawerDialog";

/* ------------------------------------------------------------------ */
/*  Option lists                                                         */
/* ------------------------------------------------------------------ */
const EquipmentOptions = Object.entries(EquipmentAvailability).map(([value]) => ({
    label: value.replace(/_/g, " "),
    value,
}));
const GripOptions = Object.entries(Grips).map(([value]) => ({
    label: value.replace(/_/g, " "),
    value,
}));
const MuscleOptions = Object.entries(Muscles).map(([value]) => ({
    label: value.replace(/_/g, " "),
    value,
}));
const JointOptions = Object.entries(Joints).map(([value]) => ({
    label: value.replace(/_/g, " "),
    value,
}));

export const ExerciseFilter = () => {

    const form = useForm<ExerciseFiltersFormValues>({
        defaultValues: exerciseFiltersDefaultValues,
        resolver: zodResolver(exerciseFiltersSchema),
    });

    const {
        updateExerciseFilters,
        exerciseFilterOpen,
        updateExerciseFiltersOpen,
        updateExerciseFiltersSearchTerm,
        exerciseFilters,
    } = useExercisesStore();


    const areFiltersModified = useMemo(
        () => !equal(exerciseFilters, exerciseFiltersDefaultValues),
        [exerciseFilters]
    );



    const searchTerm = useWatch({ control: form.control, name: "searchTerm" });
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        updateExerciseFiltersSearchTerm(debouncedSearchTerm)
    }, [debouncedSearchTerm, updateExerciseFiltersSearchTerm])

    useEffect(() => {
        if (!exerciseFilterOpen) {
            form.reset(exerciseFilters);
        }
    }, [exerciseFilters, exerciseFilterOpen, form]);



    const onSubmit: SubmitHandler<ExerciseFiltersFormValues> = (data) => {
        updateExerciseFilters(data);
        updateExerciseFiltersOpen(false);
    };

    return (
        <Drawer
            open={exerciseFilterOpen}
            onOpenChange={updateExerciseFiltersOpen}
            direction="right"
            handleOnly
        >
            <FormProvider {...form}>
                <div className="flex gap-2 mb-4">
                    <ControlledInput<ExerciseFiltersFormValues>
                        containerClassName="flex-1"
                        name="searchTerm"
                        placeholder="Quick Search"
                    />
                    <DrawerTrigger asChild>
                        <Button variant="outline" badge={areFiltersModified}>
                            <FilterIcon />
                            Filters
                        </Button>
                    </DrawerTrigger>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <DrawerContent className="p-6 flex flex-col gap-4 overflow-y-scroll" >
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Filters</DrawerTitle>
                            <DrawerDescription>
                                Customize your Exercise search criteria
                            </DrawerDescription>
                        </DrawerHeader>

                        {/* ---------- Equipment & Grip ---------- */}
                        <div className="flex flex-col gap-2">
                            <ControlledSelect<ExerciseFiltersFormValues>
                                label="Equipment"
                                name="equipment"
                                clearable
                                options={EquipmentOptions}
                            />
                            <ControlledSelect<ExerciseFiltersFormValues>
                                label="Grip"
                                name="grip"
                                clearable
                                options={GripOptions}
                            />
                        </div>

                        {/* ---------- Target Muscles (native multi-select) ---------- */}
                        <div>
                            <Label>Target Muscles</Label>
                            <Controller
                                control={form.control}
                                name="targetMuscles"
                                render={({ field }) => (
                                    <select
                                        multiple
                                        className="w-full h-32 p-2 border rounded-md text-sm"
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(
                                                Array.from(e.target.selectedOptions, (opt) => opt.value as Muscles)
                                            )
                                        }
                                    >
                                        {MuscleOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Hold Ctrl/Cmd to select multiple
                            </p>
                        </div>

                        {/* ---------- Target Joints ---------- */}
                        <div>
                            <Label>Target Joints</Label>
                            <Controller
                                control={form.control}
                                name="targetJoints"
                                render={({ field }) => (
                                    <select
                                        multiple
                                        className="w-full h-24 p-2 border rounded-md text-sm"
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(
                                                Array.from(e.target.selectedOptions, (opt) => opt.value as Joints)
                                            )
                                        }
                                    >
                                        {JointOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        {/* ---------- Variation Checkboxes ---------- */}
                        <div className="space-y-2">
                            <Label>Variations</Label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: "hasBarbell", label: "Barbell" },
                                    { name: "hasDumbbell", label: "Dumbbell" },
                                    { name: "hasCable", label: "Cable" },
                                    { name: "hasBodyweight", label: "Bodyweight" },
                                ].map(({ name, label }) => (
                                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...form.register(name as keyof ExerciseFiltersFormValues)}
                                            className="rounded"
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* ---------- Sorting ---------- */}
                        <div className="flex flex-col gap-2">
                            <ControlledSelect<ExerciseFiltersFormValues>
                                label="Sort By"
                                name="sortBy"
                                options={[
                                    { label: "Name", value: "name" },
                                    { label: "Equipment", value: "equipment" },
                                ]}
                            />
                            <ControlledSelect<ExerciseFiltersFormValues>
                                label="Sort Order"
                                name="sortOrder"
                                options={[
                                    { label: "Ascending", value: "asc" },
                                    { label: "Descending", value: "desc" },
                                ]}
                            />
                        </div>
                        {/* ---------- Footer Buttons ---------- */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => form.reset(exerciseFiltersDefaultValues)}
                            >
                                Reset
                            </Button>
                            <Button type="submit" size="sm" onClick={form.handleSubmit(onSubmit)}>
                                Apply Filters
                            </Button>
                        </div>
                    </DrawerContent>
                </form>
            </FormProvider>
        </Drawer>
    );
};