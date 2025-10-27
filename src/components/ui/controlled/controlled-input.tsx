"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

export type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    containerClassName?: string;
} & ComponentProps<"input">;

const ControlledInput = <T extends FieldValues>({
    className,
    type,
    name,
    label,
    containerClassName,
    ...props
}: InputProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <div className={cn("w-full", containerClassName)}>
            {!!label && (
                <Label className="mb-2 text-white/50" htmlFor={name}>
                    {label}
                </Label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className={className}>
                        <Input
                            type={type}
                            id={name}
                            data-slot="input"
                            aria-invalid={!!error}
                            className={className}
                            {...field}
                            {...props}
                        />
                        {!!error && (
                            <p className="text-destructive text-sm">{error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export { ControlledInput };