"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import DevButton from "./DevButton";

// TextInput Props
type TextInputProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    containerClassName?: string;
} & ComponentProps<"input">;

// Counter Props
type CounterProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    containerClassName?: string;
} & React.ComponentProps<"input">;

// TextInput Component
const TextInput = <T extends FieldValues>({
    className,
    type = "text",
    name,
    label,
    containerClassName,
    ...props
}: TextInputProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <div
            className={cn(
                "w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl", // Responsive max-widths
                containerClassName
            )}
        >
            {!!label && (
                <Label
                    className="mb-2 block text-sm sm:text-base md:text-lg"
                    htmlFor={name}
                >
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Input
                            type={type}
                            id={name}
                            data-slot="input"
                            aria-invalid={!!error}
                            className={cn(
                                "w-full text-sm sm:text-base md:text-lg py-2 sm:py-2.5",
                                className
                            )}
                            {...field}
                            {...props}
                        />
                        {!!error && (
                            <p className="mt-1 text-destructive text-xs sm:text-sm truncate">
                                {error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
};

// Counter Component
const Counter = <T extends FieldValues>({
    name,
    containerClassName,
    label,
    min = 0,
    max = Infinity,
    onChange,
    ...props
}: CounterProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <div
            className={cn(
                "w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md", // Responsive max-widths
                containerClassName
            )}
        >
            {!!label && (
                <Label
                    className="mb-2 block text-sm sm:text-base md:text-lg"
                    htmlFor={name}
                >
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    // Ensure the value is a number, default to min if invalid
                    const value = Number(field.value) >= min ? Number(field.value) : min;

                    // Handle input change to enforce min/max and numeric values
                    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const inputValue = e.target.value;
                        const newValue = inputValue === "" ? min : Number(inputValue);
                        if (!isNaN(newValue)) {
                            const clampedValue = Math.min(Math.max(min, newValue), max);
                            field.onChange(clampedValue);
                            onChange?.(clampedValue);
                        } else {
                            field.onChange(min);
                            onChange?.(min);
                        }
                    };

                    return (
                        <>
                            <div className={`
                            flex items-center bg-black/5 
                            rounded-xl dark:bg-white/10 justify-center 
                            space-x-2 sm:space-x-3 md:space-x-4
                            w-max
                            `}>
                                <DevButton
                                    type="icon"
                                    subtype="minus"
                                    iconSize={5} // Consistent with mobile-friendly touch targets
                                    className="py-2 px-4 rounded-lg"
                                    onClick={() => {
                                        const newValue = Math.max(min, value - 1);
                                        field.onChange(newValue);
                                        onChange?.(newValue);
                                    }}
                                />
                                <Input
                                    type="number"
                                    id={name}
                                    data-slot="input"
                                    className="p-2 border-none text-center"
                                    aria-invalid={!!error}
                                    value={value}
                                    onChange={handleInputChange}
                                    min={min}
                                    max={max}
                                    {...props}
                                />
                                <DevButton
                                    type="icon"
                                    subtype="plus"
                                    iconSize={5}
                                    className="py-2 px-4 rounded-lg"
                                    onClick={() => {
                                        const newValue = Math.min(max, value + 1);
                                        field.onChange(newValue);
                                        onChange?.(newValue);
                                    }}
                                />
                            </div >
                            {!!error && (
                                <p className="mt-1 text-destructive text-xs sm:text-sm truncate">
                                    {error.message}
                                </p>
                            )
                            }
                        </>
                    );
                }}
            />
        </div >
    );
};

// HookForm Namespace
const HookForm = {
    TextInput,
    Counter,
};

export { HookForm };