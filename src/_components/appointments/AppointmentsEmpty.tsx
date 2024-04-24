import Link from "next/link";
import { Button } from "../common/Button";
import { H6 } from "../common/Typography";
import PlusIcon from "../icons/Plus";

const AppointmentsEmpty = () => (
  <div className="flex flex-col justify-center">
    <div className="mt-auto flex flex-col items-center justify-center">
      <PlusIcon />

      <H6 className="text-dark-gray my-4 flex-row text-center">
        <p className="mb-2">No tienes citas pendientes.</p>
        <p className="mb-3">Presiona aquí para agendar tu cita online.</p>
      </H6>
    </div>

    <Link
      href="/platform/appointment/create"
      className="mx-auto mt-auto w-full lg:w-auto"
    >
      <Button
        className="mx-auto mt-auto w-full font-normal lg:w-auto"
        variant="default"
      >
        + Agenda tu cita online
      </Button>
    </Link>
  </div>
);

export default AppointmentsEmpty;
