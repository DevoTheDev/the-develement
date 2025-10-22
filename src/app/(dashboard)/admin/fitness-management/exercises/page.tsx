import React from 'react'
import ExerciseCards from './_components/exercise-cards'
import { ExerciseForm } from './_components/exerciseFormDialog'


const page = () => {

    return (
        <div className="mx-[10%] my-[2%]">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Exercises</h1>
                <ExerciseForm />
            </div>
            <ExerciseCards />

        </div>
    )
}

export default page