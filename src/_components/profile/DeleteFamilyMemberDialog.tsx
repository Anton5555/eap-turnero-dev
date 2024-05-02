import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Button } from "../common/Button";
import CloseIcon from "../icons/Close";
import { FamilyRelative } from "~/types/users";

interface DeleteFamilyMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  relative: FamilyRelative;
}

const DeleteFamilyMemberDialog: React.FC<DeleteFamilyMemberDialogProps> = ({
  open,
  onClose,
  onConfirm,
  relative,
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
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
        <div className="flex min-h-full items-center justify-center p-8 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4 ">
                <button type="button" onClick={onClose}>
                  <span className="sr-only">Cerrar</span>

                  <CloseIcon aria-hidden="true" />
                </button>
              </div>

              <div className="py-6 lg:px-8">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                  <div className="mt-2 flex flex-col items-center space-y-4">
                    <p className="text-2xl font-semibold leading-7">
                      ¿Seguro que quieres eliminar a {relative.name}?
                    </p>

                    <p className="text-lg leading-5">
                      El usuario no se eliminará del sistema, se desvinculará de
                      tus familiares.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col-reverse justify-center gap-y-2 lg:flex-row lg:gap-y-0 lg:space-x-4">
                <Button
                  variant="outline"
                  className="font-lato border-green text-green hover:bg-green/40 hover:text-white"
                  onClick={onClose}
                >
                  Volver
                </Button>

                <Button className="font-lato" onClick={onConfirm}>
                  Eliminar
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default DeleteFamilyMemberDialog;
