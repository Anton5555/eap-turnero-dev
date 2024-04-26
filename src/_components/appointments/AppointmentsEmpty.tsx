import Link from "next/link";
import { Button } from "../common/Button";
import { H6 } from "../common/Typography";
import PlusIcon from "../icons/Plus";

const AppointmentsEmpty = () => (
  <div className="mx-4 flex h-full flex-col  lg:mx-0">
    <div className="mt-auto flex flex-col items-center">
      <PlusIcon />

      <H6 className="my-4 flex-row text-center text-dark-gray">
        <p className="mb-2">No tienes citas pendientes.</p>

        <p className="mb-3">Presiona aquí para agendar tu cita online.</p>
      </H6>
    </div>

    <Link
      href="/platform/appointment/create"
      className="mx-auto mt-auto w-full lg:w-auto"
    >
      <Button
        className="font-lato w-full font-normal lg:w-auto"
        variant="default"
      >
        + Agenda tu cita online
      </Button>
    </Link>
  </div>
);

export default AppointmentsEmpty;
