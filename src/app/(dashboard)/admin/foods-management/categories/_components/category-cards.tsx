"use client";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { useCategories } from "../_services/use-category-queries";

import React from 'react'
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";
import Card from "@/app/(dashboard)/_components/Card";

type Props = {}

const CategoryCards = (props: Props) => {

    const { updateSelectedCategoryId, updateCategoryDialogOpen } = useCategoriesStore();

    const categoriesQuery = useCategories();
    const deleteCategoryMutation = useDeleteCategory();

    return (
        <div className="grid grid-cols-4 gap-2">
            {categoriesQuery.data?.map((item) => (
                <Card
                    key={item.id}
                    button1={{
                        onClick: () => {
                            updateSelectedCategoryId(item.id);
                            updateCategoryDialogOpen(true);
                        },
                    }}
                    button2={{
                        onClick: () => {
                            alert({
                                onConfirm: () => deleteCategoryMutation.mutate(item.id)
                            })
                        }
                    }}>
                    <p className="truncate">{item.name}</p>
                </Card>
            ))}
        </div>
    )
}

export default CategoryCards