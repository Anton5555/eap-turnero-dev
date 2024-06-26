import { Button } from "~/_components/common/Button";
import { H6 } from "~/_components/common/Typography";
import { Professional } from "~/types/professionals";

const ProfessionalInfo = (professional: Professional) => (
  <div className="ml-4 flex-col">
    <H6 className="text-sm font-bold uppercase leading-4 lg:text-lg lg:leading-5">
      {professional.name}
    </H6>

    {professional.subSpecialties && (
      <p className="font-lato text-sm leading-4 text-dark-gray lg:text-base lg:leading-5">
        {professional.subSpecialties[0]}
      </p>
    )}

    <Button className="pl-0" variant={"link"}>
      Ver ficha del profesional
    </Button>
  </div>
);

export default ProfessionalInfo;
