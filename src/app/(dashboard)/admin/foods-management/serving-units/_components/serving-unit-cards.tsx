"use client";
import { ServingUnitCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-skeletons";
import { useServingUnitsStore } from "@/app/(dashboard)/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import { useDeleteServingUnit } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/useMutations";
import { useServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/useQueries";
import { NoItemsFound } from "@/app/(dashboard)/_components/no-items-found";
import { alert } from "@/lib/use-global-store";
import D_Button from "@/components/D_Components/D_Button";
import D_Card from "@/components/D_Components/D_Card";
import { Separator } from "@radix-ui/react-separator";

const ServingUnitCards = () => {
  const { updateSelectedServingUnitId, updateServingUnitDialogOpen } =
    useServingUnitsStore();

  const servingUnitsQuery = useServingUnits();
  const deleteServingUnitMutation = useDeleteServingUnit();

  if (servingUnitsQuery.data?.length === 0) {
    return <NoItemsFound onClick={() => updateServingUnitDialogOpen(true)} />;
  }

  return (
    <div className="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-1 gap-2">
      {servingUnitsQuery.isLoading ? (
        <ServingUnitCardsSkeleton />
      ) : (
        <>
          {servingUnitsQuery.data?.map((item) => (
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
                      updateSelectedServingUnitId(item.id);
                      updateServingUnitDialogOpen(true);
                    }}
                    tooltip="Edit"
                    icon="Edit" />
                  <D_Button
                    iconSize={4}
                    className='p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
                    onClick={() => {
                      alert({
                        onConfirm: () => deleteServingUnitMutation.mutate(item.id),
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
  );
};

export { ServingUnitCards };
