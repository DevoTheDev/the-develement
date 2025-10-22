"use client";
import {
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFoodsStore } from "@/app/(dashboard)/admin/foods-management/foods/_libs/use-food-store";
import {
    useCreateFood,
    useUpdateFood,
} from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-mutations";
import { useFood } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import {
    foodDefaultValues,
    foodSchema,
    FoodSchema,
} from "@/app/(dashboard)/admin/foods-management/foods/_types/foodSchema";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CategoryFormDialog } from "@/app/(dashboard)/admin/foods-management/categories/_components/category-form-dialog";
import { useServingUnitsStore } from "@/app/(dashboard)/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { useCategoriesStore } from "../../categories/_libs/use-category-store";
import { useCategories } from "../../categories/_services/use-category-queries";
import { SpecifyFoodServingUnits } from "./specify-food-serving-units";
import { DrawerDialog } from "@/app/(dashboard)/_components/DrawerDialog";
import DevButton from "@/components/ui/DevButton";
import { HookForm } from "@/components/ui/HookForm";

const FoodFormDialog = () => {
    const form = useForm<FoodSchema>({
        defaultValues: foodDefaultValues,
        resolver: zodResolver(foodSchema),
    });

    const foodQuery = useFood();
    const categoriesQuery = useCategories();

    const createFoodMutation = useCreateFood();
    const updateFoodMutation = useUpdateFood();

    const isPending =
        createFoodMutation.isPending || updateFoodMutation.isPending;

    const {
        selectedFoodId,
        updateSelectedFoodId,
        foodDialogOpen,
        updateFoodDialogOpen,
    } = useFoodsStore();

    const { categoryDialogOpen } = useCategoriesStore();
    const { servingUnitDialogOpen } = useServingUnitsStore();

    useEffect(() => {
        if (!!selectedFoodId && foodQuery.data) {
            form.reset(foodQuery.data);
        }
    }, [foodQuery.data, form, selectedFoodId]);

    const handleDialogOpenChange = (open: boolean) => {
        updateFoodDialogOpen(open);

        if (!open) {
            updateSelectedFoodId(null);
            form.reset(foodDefaultValues);
        }
    };

    const handleSuccess = () => {
        handleDialogOpenChange(false);
    };

    const disabledSubmit = servingUnitDialogOpen || categoryDialogOpen;

    const onSubmit: SubmitHandler<FoodSchema> = (data) => {
        if (data.action === "create") {
            createFoodMutation.mutate(data, {
                onSuccess: handleSuccess,
            });
        } else {
            updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
        }
    };

    return (
        <DrawerDialog
            openState={{
                open: foodDialogOpen,
                setOpen: handleDialogOpenChange,
            }}
            title={selectedFoodId ? "Edit Food" : "Create a New Food"}
            trigger={<DevButton type="icon" subtype="plus" label="New Food" className="flex gap-4 p-2" />}
            content={(
                <form
                    onSubmit={disabledSubmit ? undefined : form.handleSubmit(onSubmit)}
                    className=""
                >
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="col-span-1 grid">
                                <ControlledInput<FoodSchema>
                                    name="name"
                                    label="Name"
                                    placeholder="Enter food name"
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-6">
                                    <ControlledSelect<FoodSchema>
                                        label="Category"
                                        name="categoryId"
                                        options={categoriesQuery.data?.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                    <div className="pt-6 pr-6" >
                                        <CategoryFormDialog smallTrigger />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4" >
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="calories"
                                            label="Calories"
                                            type="number"
                                            placeholder="kcal"
                                        />
                                    </div>
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="protein"
                                            label="Protein"
                                            type="number"
                                            placeholder="grams"
                                        />
                                    </div>
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="carbohydrates"
                                            label="Carbohydrates"
                                            type="number"
                                            placeholder="grams"
                                        />
                                    </div>
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="fat"
                                            label="Fat"
                                            type="number"
                                            placeholder="grams"
                                        />
                                    </div>
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="fiber"
                                            label="Fiber"
                                            type="number"
                                            placeholder="grams"
                                        />
                                    </div>
                                    <div>
                                        <HookForm.TextInput<FoodSchema>
                                            name="sugar"
                                            label="Sugar"
                                            type="number"
                                            placeholder="grams"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <SpecifyFoodServingUnits />
                            </div>
                        </div>
                    </FormProvider>
                    <DialogFooter>
                        <Button type="submit" isLoading={isPending}>
                            {!!selectedFoodId ? "Edit" : "Create"} Food
                        </Button>
                    </DialogFooter>
                </form>
            )}
        />
    )
};

export { FoodFormDialog };