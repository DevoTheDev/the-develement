"use client";

import { Button } from "@/components/ui/button";
import { HookForm } from "@/components/ui/HookForm";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCategoriesStore } from "../_libs/use-category-store";
import { useCreateCategory, useUpdateCategory } from "../_services/use-category-mutations";
import { CategorySchema, categoryDefaultValues, categorySchema } from "../_types/categorySchema";
import { useCategory } from "../_services/use-category-queries";
import { DrawerDialog } from "@/app/(dashboard)/_components/DrawerDialog";
import D_Button from "@/components/D_Components/D_Button";

type CategoryFormDialogProps = {
    smallTrigger?: boolean;
};
const CategoryFormDialog = ({ smallTrigger }: CategoryFormDialogProps) => {
    const form = useForm<CategorySchema>({
        defaultValues: categoryDefaultValues,
        resolver: zodResolver(categorySchema),
    });

    const {
        selectedCategoryId,
        updateSelectedCategoryId,
        categoryDialogOpen,
        updateCategoryDialogOpen,
    } = useCategoriesStore();

    const categoryQuery = useCategory();
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();

    const isPending =
        createCategoryMutation.isPending || updateCategoryMutation.isPending;

    useEffect(() => {
        if (!!selectedCategoryId && categoryQuery.data) {
            form.reset(categoryQuery.data);
        }
    }, [categoryQuery.data, form, selectedCategoryId]);

    const handleDialogOpenChange = (open: boolean) => {
        updateCategoryDialogOpen(open);

        if (!open) {
            updateSelectedCategoryId(null);
            form.reset(categoryDefaultValues);
        }
    };

    const handleSuccess = () => {
        handleDialogOpenChange(false);
    };

    const onSubmit: SubmitHandler<CategorySchema> = (data) => {
        if (data.action === "create") {
            createCategoryMutation.mutate(data, {
                onSuccess: handleSuccess,
            });
        } else {
            updateCategoryMutation.mutate(data, { onSuccess: handleSuccess });
        }
    };

    return (
        <DrawerDialog
            openState={{
                open: categoryDialogOpen,
                setOpen: handleDialogOpenChange,
            }}
            title={selectedCategoryId ? "Edit Category" : "Create a New Category"}
            trigger={
                <D_Button
                    className="flex justify-center items-center py-2 px-4 mt-1 w-max gap-2 rounded-lg"
                    icon="Plus"
                    label="New Category"
                    onMobile="hideLabel"
                />}
            content={(
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormProvider {...form}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <HookForm.TextInput<CategorySchema>
                                    name="name"
                                    label="Name"
                                    placeholder="Enter category name"
                                />
                            </div>
                        </div>
                    </FormProvider>
                    <DialogFooter>
                        <Button
                            onClick={() => console.log(selectedCategoryId)}
                            type="submit"
                            isLoading={isPending}>
                            {!!selectedCategoryId ? "Edit" : "Create"} Category
                        </Button>
                    </DialogFooter>
                </form>
            )}
        />
    );
};
export { CategoryFormDialog };