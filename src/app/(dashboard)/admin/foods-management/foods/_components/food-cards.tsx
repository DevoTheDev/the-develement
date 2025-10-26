"use client";
import { useFoodsStore } from "../_libs/use-food-store";
import { useDeleteFood } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-mutations";
import { useFoods } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import { Pagination } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/use-global-store";
import { FoodCardsSkeleton } from "./food-cards-skeleton";
import D_Card from "@/components/D_Components/D_Card";
import D_Button from "@/components/D_Components/D_Button";

const FoodCards = () => {
    const {
        updateSelectedFoodId,
        updateFoodDialogOpen,
        foodFilters,
        updateFoodFiltersPage,
    } = useFoodsStore();

    const foodsQuery = useFoods();

    const deleteFoodMutation = useDeleteFood();

    const totalPages = foodsQuery.data?.totalPages;

    if (totalPages === 0) {
        return <NoItemsFound onClick={() => updateFoodDialogOpen(true)} />;
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
                {foodsQuery.isLoading ? (
                    <FoodCardsSkeleton />
                ) : (
                    <>
                        {foodsQuery.data?.data.map((item) => (
                            <D_Card
                                className="p-4 border-1 rounded-lg gap-2"
                                key={item.id}
                                header={(
                                    <>
                                        <div className="w-full" >{item.name}</div>
                                        <Separator />
                                    </>
                                )}
                                body={(
                                    <div className="grid grid-cols-2 gap-5 w-full">
                                        <div>
                                            <p className="text-foreground/60 text-sm font-normal">
                                                Calories
                                            </p>
                                            <p className="text-sm font-medium">{item.calories} kcal</p>
                                        </div>
                                        <div>
                                            <p className="text-foreground/60 text-sm font-normal">
                                                Carbohydrates
                                            </p>
                                            <p className="text-sm font-medium">
                                                {item.carbohydrates} g
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-foreground/60 text-sm font-normal">
                                                Protein
                                            </p>
                                            <p className="text-sm font-medium">{item.protein} g</p>
                                        </div>
                                        <div>
                                            <p className="text-foreground/60 text-sm font-normal">
                                                Fat
                                            </p>
                                            <p className="text-sm font-medium">{item.fat} g</p>
                                        </div>
                                    </div>
                                )}
                                footer={(
                                    <div className="w-full flex justify-end gap-3">
                                        <D_Button
                                            iconSize={4}
                                            className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                            onClick={() => {
                                                updateSelectedFoodId(item.id);
                                                updateFoodDialogOpen(true);
                                            }}
                                            tooltip="Edit"
                                            icon="Edit" />
                                        <D_Button
                                            iconSize={4}
                                            className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                                            onClick={() => {
                                                alert({
                                                    onConfirm: () => deleteFoodMutation.mutate(item.id),
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
            <Pagination
                currentPage={foodFilters.page}
                totalPages={totalPages}
                updatePage={updateFoodFiltersPage}
            />
        </div>
    );
};

export { FoodCards };