// src/app/(dashboard)/admin/exercises-management/exercises/_libs/useExerciseStore.ts
import { createStore } from "@/lib/createStore";
import {
    ExerciseFiltersFormValues,
    exerciseFiltersDefaultValues,
} from "../_types/exerciseFilterSchema";

type State = {
    selectedExerciseId: number | null;
    exerciseDialogOpen: boolean;
    exerciseFilters: ExerciseFiltersFormValues;
    exerciseFilterOpen: boolean;
};

type Actions = {
    updateSelectedExerciseId: (id: State["selectedExerciseId"]) => void;
    updateExerciseDialogOpen: (is: State["exerciseDialogOpen"]) => void;
    updateExerciseFilters: (filters: State["exerciseFilters"]) => void;
    updateExerciseFiltersOpen: (is: State["exerciseFilterOpen"]) => void;
    updateExerciseFiltersPage: (action: "next" | "prev") => void;
    updateExerciseFiltersSearchTerm: (
        str: State["exerciseFilters"]["searchTerm"],
    ) => void;

};

type Store = State & Actions;

export const useExercisesStore = createStore<Store>(
    (set) => ({
        selectedExerciseId: null,
        updateSelectedExerciseId: (id) =>
            set((state) => {
                state.selectedExerciseId = id
            }),
        exerciseDialogOpen: false,
        updateExerciseDialogOpen: (is) =>
            set((state) => {
                state.exerciseDialogOpen = is
            }),
        exerciseFilters: exerciseFiltersDefaultValues,
        updateExerciseFilters: (filters) =>
            set((state) => {
                state.exerciseFilters = filters;
            }),
        exerciseFilterOpen: false,
        updateExerciseFiltersOpen: (is) =>
            set((state) => {
                state.exerciseFilterOpen = is;
            }),
        updateExerciseFiltersPage: (action) =>
            set((state) => {
                const currentPage = state.exerciseFilters.page;
                let newPage = currentPage;

                if (action === "next") {
                    newPage = currentPage + 1;
                } else if (action === "prev") {
                    newPage = Math.max(currentPage - 1, 1);
                } else if (typeof action === "number") {
                    newPage = action;
                }

                return {
                    exerciseFilters: {
                        ...state.exerciseFilters,
                        page: newPage,
                    },
                };
            }),
        updateExerciseFiltersSearchTerm: (searchTerm) =>
            set((state) => {
                state.exerciseFilters.searchTerm = searchTerm;
            }),
    }),
    {
        name: "exercise-store",
        excludeFromPersist: ["exerciseFilters"],
    },
);