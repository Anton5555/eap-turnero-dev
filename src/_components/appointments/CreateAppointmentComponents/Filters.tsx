import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Select } from "~/_components/common/Select";
import { locations, modalities, timeRanges } from "~/lib/constants";
import { H2 } from "~/_components/common/Typography";
import { Button } from "~/_components/common/Button";

const Filters: React.FC<{
  defaultLocation?: number;
  defaultModality?: number;
  onApply: (
    location: number | null,
    modality: number | null,
    timeRangeValue: number | null,
  ) => void;
}> = ({ defaultLocation, defaultModality, onApply }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const FiltersForm = (
    <form
      className="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onApply(
          (event.target as HTMLFormElement)["location"].value,
          (event.target as HTMLFormElement)["modality"].value,
          (event.target as HTMLFormElement)["timeRange"].value,
        );

        if (isDialogOpen) setIsDialogOpen(false);
      }}
    >
      <Select
        options={locations}
        id="location"
        defaultValue={defaultLocation}
        className="h-9 w-80 rounded-md ring-light-gray lg:w-40"
        placeholder="País"
      />

      <Select
        options={modalities}
        id="modality"
        defaultValue={defaultModality}
        className="h-9 w-80 rounded-md ring-light-gray lg:w-40"
      />

      <Select
        options={timeRanges}
        id="timeRange"
        placeholder="Disponibilidad"
        className="h-9 w-80 rounded-md ring-light-gray lg:w-40"
      />

      <Button className="h-9 w-80" variant={"outline"} type="submit">
        Aplicar
      </Button>
    </form>
  );

  return (
    <>
      <div className="flex justify-end lg:hidden">
        <Button
          className="h-10 bg-green/5"
          variant={"ghost"}
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          Filtros
        </Button>
      </div>

      <Transition.Root show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsDialogOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <H2 className="w-80 lg:hidden">Filtros</H2>

                  {FiltersForm}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex">{FiltersForm}</div>
    </>
  );
};

export default Filters;
