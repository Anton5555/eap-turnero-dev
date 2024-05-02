"use client";

import React, { useState } from "react";
import { FamilyRelashionships, FamilyRelative } from "~/types/users";
import { Button } from "../common/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteFamilyRelative } from "~/lib/api/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import DeleteFamilyMemberDialog from "./DeleteFamilyMemberDialog";

interface FamilyRelativesProps {
  relatives: FamilyRelative[];
  relationships: FamilyRelashionships[];
}

const FamilyRelatives: React.FC<FamilyRelativesProps> = ({
  relatives,
  relationships,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedFamilyRelative, setSelectedFamilyRelative] =
    useState<FamilyRelative | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: deleteFamilyRelative,
    onSuccess: () => router.refresh(),
  });

  const handleDelete = () => {
    toast.promise(
      mutateAsync({
        accessToken: session?.user.accessToken!,
        patientId: selectedFamilyRelative!.patientId,
        line: selectedFamilyRelative!.line,
      }),
      {
        loading: "Eliminando familiar",
        success: "Familiar eliminado con éxito",
        error: "Error al eliminar familiar",
      },
    );

    setIsOpen(false);
  };

  const selectFamilyRelative = (familyRelative: FamilyRelative) => {
    setSelectedFamilyRelative(familyRelative);
    setIsOpen(true);
  };

  const cancel = () => {
    setIsOpen(false);
    setSelectedFamilyRelative(null);
  };

  return (
    <>
      <div className="flex flex-col space-y-6 lg:h-[calc(20dvh)]">
        <div className="space-y-4">
          <div className="mb-6 w-full border-b border-black/10"></div>

          {relatives &&
            relatives.map((relative, index) => (
              <div key={index} className="flex w-full flex-row justify-between">
                <div
                  key={index}
                  className="flex flex-col  space-y-2 text-ultra-dark-gray"
                >
                  <div className="flex flex-row items-center">
                    <p className="font-bold leading-4">
                      {relative.name} {relative.lastName}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <p className="leading-5">
                      {
                        relationships.find(
                          (relationship) =>
                            relationship.value === relative.relationship,
                        )?.label
                      }
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Button
                    variant="outline"
                    className="h-8 w-24 border-light-grayish-blue font-inter font-semibold"
                    onClick={() => selectFamilyRelative(relative)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-auto flex flex-row justify-end">
          <Button className="font-lato w-full font-normal lg:w-auto">
            + Agregar
          </Button>
        </div>
      </div>

      {isOpen && selectedFamilyRelative && (
        <DeleteFamilyMemberDialog
          open={isOpen}
          onClose={cancel}
          onConfirm={handleDelete}
          relative={selectedFamilyRelative}
        />
      )}
    </>
  );
};

export default FamilyRelatives;
