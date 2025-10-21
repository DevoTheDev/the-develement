
import { getExercise, getExercises } from './services';
import { useQuery } from '@tanstack/react-query';
import { useExercisesStore } from '../_libs/useExerciseStore';


const useExercises = () => {

    return useQuery({
        queryKey: ["exercises"],
        queryFn: getExercises,
    })
};

const useExercise = () => {
    const { selectedExerciseId } = useExercisesStore();

    return useQuery({
        queryKey: ["categories", { selectedExerciseId }],
        queryFn: () => getExercise(selectedExerciseId!),
        enabled: !!selectedExerciseId,
    });
}

export { useExercises, useExercise };