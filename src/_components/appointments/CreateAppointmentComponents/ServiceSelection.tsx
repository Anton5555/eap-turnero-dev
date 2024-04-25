import PlatformContainer from "~/_components/common/PlatformContainer";
import { Button } from "~/_components/common/Button";
import { ContractService } from "~/types/services";
import { H6 } from "~/_components/common/Typography";
import ImageWithFallback from "~/_components/common/ImageWithFallback";

const ServiceSelection = (props: {
  services: ContractService[];
  selectedService: ContractService | null;
  handleServiceSelect: (service: ContractService) => void;
}) => {
  const { services, selectedService, handleServiceSelect } = props;

  if (!services?.length)
    return (
      <PlatformContainer className="rounded-2xl lg:min-h-0 lg:py-6">
        <H6 className="text-center">No se encontraron servicios</H6>
      </PlatformContainer>
    );

  return (
    <ul className="space-y-6 lg:w-full">
      {services?.map((service) => (
        <li key={service.specialtyId}>
          <PlatformContainer
            className="rounded-2xl lg:min-h-0"
            selected={service.specialtyId === selectedService?.specialtyId}
          >
            <div className="flex items-center justify-between px-6 py-4 lg:p-0">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <ImageWithFallback
                  className="h-18 rounded-2xl object-cover lg:h-20"
                  src={`/${service.specialty}.webp`}
                  fallbackSrc="/default-avatar.webp"
                  width={80}
                  height={80}
                  alt={service.specialty}
                />

                <H6 className="text-sm font-bold uppercase leading-4 lg:text-lg lg:leading-5">
                  {service.specialty}
                </H6>
              </div>

              <Button
                className="font-lato text-sm font-normal"
                variant={
                  service.specialtyId === selectedService?.specialtyId
                    ? "default"
                    : "outline"
                }
                onClick={() => handleServiceSelect(service)}
              >
                Seleccionar
              </Button>
            </div>
          </PlatformContainer>
        </li>
      ))}
    </ul>
  );
};

export default ServiceSelection;
