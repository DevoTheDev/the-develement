"use client";
import { Skeleton } from "@/components/ui/skeleton";

const CardsSkeleton = () => {
    const skeletonCards = Array(12).fill(null);

    return (
        <>
            {skeletonCards.map((_, index) => (
                <div
                    className="flex flex-col justify-between gap-3 rounded-lg border p-6"
                    key={index}
                >
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-24" />
                        <div className="flex" >
                            <Skeleton className="h-5 w-48 rounded-md" />
                        </div>
                        <div className="flex gap-2" >
                            <Skeleton className="size-8 rounded-md" />
                            <Skeleton className="size-8 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export { CardsSkeleton };