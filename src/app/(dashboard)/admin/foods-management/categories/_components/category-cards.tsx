"use client";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { useCategories } from "../_services/use-category-queries";
import React from 'react'
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";
import Card from "@/app/(dashboard)/_components/Card";
import { CardsSkeleton } from "../../../../_components/CardsSkeleton";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import D_Card from "@/components/D_Components/D_Card";
import { Separator } from "@radix-ui/react-separator";
import D_Button from "@/components/D_Components/D_Button";

const CategoryCards = () => {
    const { updateSelectedCategoryId, updateCategoryDialogOpen } = useCategoriesStore();

    const categoriesQuery = useCategories();
    const deleteCategoryMutation = useDeleteCategory();

    if (categoriesQuery.data?.length === 0) {
        return <NoItemsFound onClick={() => updateCategoryDialogOpen(true)} />
    }

    return (
        <div className="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-1 gap-2">
            {categoriesQuery.isLoading ? (
                <CardsSkeleton />
            ) : (
                <>
                    {categoriesQuery.data?.map((item) => (
                        <D_Card
                            className="p-4 border-1 rounded-lg gap-2"
                            key={item.id}
                            header={(
                                <>
                                    <div className="w-full">{item.name}</div>
                                    <Separator className="border-1 w-full" />
                                </>
                            )}
                            footer={(
                                <div className="w-full flex justify-end gap-3">
                                    <D_Button
                                        iconSize={4}
                                        className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                        onClick={() => {
                                            updateSelectedCategoryId(item.id);
                                            updateCategoryDialogOpen(true);
                                        }}
                                        tooltip="Edit"
                                        icon="Edit" />
                                    <D_Button
                                        iconSize={4}
                                        className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                        onClick={() => {
                                            alert({
                                                onConfirm: () => deleteCategoryMutation.mutate(item.id),
                                            });
                                        }}
                                        tooltip="Delete"
                                        icon="Trash" />
                                </div>
                            )}
                        />
                    ))}
                </>
            )}

        </div>
    )
}

export default CategoryCards