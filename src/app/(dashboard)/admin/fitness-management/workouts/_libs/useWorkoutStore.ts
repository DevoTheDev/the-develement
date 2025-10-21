import { createStore } from "@/lib/createStore";

type State = {
    selectedWorkoutId: number | null;
    workoutDialogOpen: boolean;
};

type Actions = {
    updateSelectedWorkoutId: (id: State["selectedWorkoutId"]) => void;
    updateWorkoutDialogOpen: (is: State["workoutDialogOpen"]) => void;
};

type Store = State & Actions;

const useWorkoutsStore = createStore<Store>(
    (set) => ({
        selectedWorkoutId: null,
        updateSelectedWorkoutId: (id) =>
            set((state) => {
                state.selectedWorkoutId = id;
            }),
        workoutDialogOpen: false,
        updateWorkoutDialogOpen: (is) =>
            set((state) => {
                state.workoutDialogOpen = is;
            }),
    }),
    {
        name: "categories-store",
    }
);

export { useWorkoutsStore };