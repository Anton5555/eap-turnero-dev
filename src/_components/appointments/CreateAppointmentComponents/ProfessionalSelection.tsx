import PlatformContainer from "~/_components/common/PlatformContainer";
import { H6 } from "~/_components/common/Typography";
import { type Professional } from "~/types/professionals";
import ProfessionalInfo from "./ProfessionalInfo";
import { Button } from "~/_components/common/Button";
import Image from "next/image";

const ProfessionalSelection = (props: {
  isLoading: boolean;
  professionals: Professional[] | undefined;
  error: Error | null;
  selectedProfessional?: Professional;
  handleProfessionalSelect: (professional: Professional) => void;
}) => {
  const {
    isLoading,
    professionals,
    error,
    selectedProfessional,
    handleProfessionalSelect,
  } = props;

  return (
    <>
      {isLoading && (
        <PlatformContainer className="rounded-2xl lg:min-h-0 lg:py-6">
          <H6 className="text-center">Cargando...</H6>
        </PlatformContainer>
      )}

      {!isLoading && !professionals?.length ? (
        <PlatformContainer className="rounded-2xl lg:min-h-0 lg:py-6">
          <H6 className="text-center">
            {error
              ? error.message
              : "No se encontraron profesionales para los filtros seleccionados"}
          </H6>
        </PlatformContainer>
      ) : (
        <ul className="space-y-6">
          {professionals?.map((professional) => (
            <li key={professional.id}>
              <PlatformContainer
                className="rounded-2xl lg:min-h-0 lg:py-6"
                selected={professional.id === selectedProfessional?.id}
              >
                <div className="flex items-center space-x-6 px-6 py-4 lg:justify-between lg:space-x-0 lg:p-0">
                  <div className="flex items-center">
                    {/* TODO: Change professional images for the real ones */}
                    <Image
                      className="h-18 rounded-2xl object-cover lg:h-20"
                      src={`/default-avatar.webp`}
                      width={80}
                      height={80}
                      alt={professional.name}
                    />
                  </div>

                  <div className="hidden lg:flex">
                    <ProfessionalInfo {...professional} />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex lg:hidden">
                      <ProfessionalInfo {...professional} />
                    </div>

                    <Button
                      className="font-lato h-9 w-full text-sm font-normal lg:flex-row"
                      variant={
                        professional.id === selectedProfessional?.id
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleProfessionalSelect(professional)}
                    >
                      Seleccionar
                    </Button>
                  </div>
                </div>
              </PlatformContainer>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProfessionalSelection;
