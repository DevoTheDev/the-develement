import { ServingUnitCards } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-cards";
import { ServingUnitFormDialog } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-form-dialog";

const Page = () => {
  return (
    <div className="mx-[10%] my-[2%]" >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Serving Units</h1>
        <ServingUnitFormDialog />
      </div>
      <ServingUnitCards />
    </div>
  );
};

export default Page;
