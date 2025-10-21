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
        <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                {smallTrigger ? (
                    <Button size="icon" variant="ghost" type="button">
                        <Plus />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2" />
                        New Category
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {selectedCategoryId ? "Edit Category" : "Create a New Category"}
                    </DialogTitle>
                </DialogHeader>
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
            </DialogContent>
        </Dialog>
    );
};
export { CategoryFormDialog };