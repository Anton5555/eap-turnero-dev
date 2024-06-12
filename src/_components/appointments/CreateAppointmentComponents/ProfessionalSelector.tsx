import PlatformContainer from "~/_components/common/PlatformContainer";
import { H6 } from "~/_components/common/Typography";
import { type Professional } from "~/types/professionals";
import ProfessionalInfo from "./ProfessionalInfo";
import { Button } from "~/_components/common/Button";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const ProfessionalSelector = (props: {
  isLoading: boolean;
  professionals: Professional[] | undefined;
  error: Error | null;
  isTimeSelected: boolean;
  selectedProfessional?: Professional;
  handleProfessionalSelect: (professional: Professional) => void;
}) => {
  const {
    isLoading,
    professionals,
    error,
    isTimeSelected,
    selectedProfessional,
    handleProfessionalSelect,
  } = props;

  const t = useTranslations("createAppointment");

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isLoading) toastId = toast.loading(t("loadingProfessionals"));
    else toast.dismiss(toastId);

    return () => {
      toast.dismiss(toastId);
    };
  }, [isLoading, t]);

  return (
    <>
      {!isLoading && !professionals?.length ? (
        <PlatformContainer className="flex min-h-24 flex-col justify-center rounded-2xl lg:py-6">
          <H6 className="text-center">
            {(error && t("errorGettingProfessionals")) ?? !isTimeSelected
              ? t("selectATime")
              : t("noAvailableProfessionals")}
          </H6>
        </PlatformContainer>
      ) : (
        <ul className="space-y-6">
          {professionals?.map((professional) => (
            <li key={professional.id}>
              <PlatformContainer
                className="min-h-0 rounded-2xl lg:py-6"
                selected={professional.id === selectedProfessional?.id}
              >
                <div className="flex items-center space-x-6 px-6 py-4 lg:p-0 xl:justify-between">
                  <div className="flex items-center">
                    {/* TODO: Change professional images for the real ones */}
                    <Image
                      className="h-18 w-18 rounded-2xl object-cover xl:h-20 xl:w-20"
                      src={`/default-avatar.webp`}
                      width={80}
                      height={80}
                      alt={professional.name}
                    />

                    <div className="ml-4 hidden xl:flex">
                      <ProfessionalInfo {...professional} />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex xl:hidden">
                      <ProfessionalInfo {...professional} />
                    </div>

                    <Button
                      className="font-lato h-9 text-sm font-normal xl:flex-row"
                      variant={
                        professional.id === selectedProfessional?.id
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleProfessionalSelect(professional)}
                    >
                      {t("select")}
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

export default ProfessionalSelector;
