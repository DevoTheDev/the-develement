import { createStore } from "@/lib/createStore";

type State = {
    selectedExerciseId: number | null;
    exerciseDialogOpen: boolean;
};

type Actions = {
    updateSelectedExerciseId: (id: State["selectedExerciseId"]) => void;
    updateExerciseDialogOpen: (is: State["exerciseDialogOpen"]) => void;
};

type Store = State & Actions;

const useExercisesStore = createStore<Store>(
    (set) => ({
        selectedExerciseId: null,
        updateSelectedExerciseId: (id) =>
            set((state) => {
                state.selectedExerciseId = id;
            }),
        exerciseDialogOpen: false,
        updateExerciseDialogOpen: (is) =>
            set((state) => {
                state.exerciseDialogOpen = is;
            }),
    }),
    {
        name: "exercise-store",
    }
);

export { useExercisesStore };