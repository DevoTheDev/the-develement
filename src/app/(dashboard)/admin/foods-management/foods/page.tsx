import React from 'react'
import { FoodFormDialog } from './_components/food-form-dialog'

const page = () => {
    return (
        <div className="mx-[10%] my-[2%]">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Foods</h1>
                <FoodFormDialog />
            </div>
        </div>
    )
}

export default page