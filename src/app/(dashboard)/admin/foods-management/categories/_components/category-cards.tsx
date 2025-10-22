"use client";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { useCategories } from "../_services/use-category-queries";
import React from 'react'
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";
import Card from "@/app/(dashboard)/_components/Card";
import { CardsSkeleton } from "../../../../_components/CardsSkeleton";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";

const CategoryCards = () => {
    const { updateSelectedCategoryId, updateCategoryDialogOpen } = useCategoriesStore();

    const categoriesQuery = useCategories();
    const deleteCategoryMutation = useDeleteCategory();

    if (categoriesQuery.data?.length === 0) {
        return <NoItemsFound onClick={() => updateCategoryDialogOpen(true)} />
    }

    return (
        <div className="grid grid-cols-6 gap-2">
            {categoriesQuery.isLoading ? (
                <CardsSkeleton />
            ) : (
                <>
                    {categoriesQuery.data?.map((item) => (
                        <Card
                            className="bg-background border-2 dark:shadow-white/30 shadow-md border-white/25 rounded-lg p-2"
                            key={item.id}
                            button1={{
                                icon: "edit",
                                iconSize: 5,
                                tooltip: "Edit",
                                onClick: () => {
                                    updateSelectedCategoryId(item.id);
                                    updateCategoryDialogOpen(true);
                                },
                            }}
                            button2={{
                                icon: "trash",
                                iconSize: 5,

                                tooltip: "Delete",
                                onClick: () => {
                                    alert({
                                        onConfirm: () => deleteCategoryMutation.mutate(item.id)
                                    })
                                }
                            }}>
                            <div className="truncate font-bold">
                                {item.name}
                            </div>
                        </Card>
                    ))}
                </>
            )}

        </div>
    )
}

export default CategoryCards