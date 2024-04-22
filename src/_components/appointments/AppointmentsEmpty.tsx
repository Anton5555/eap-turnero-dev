import Link from "next/link";
import { Button } from "../common/Button";
import { H6 } from "../common/Typography";
import PlusIcon from "../icons/Plus";

const AppointmentsEmpty = () => (
  <div className="flex w-11/12 flex-col justify-center">
    <div className="mt-auto flex flex-col items-center justify-center">
      <PlusIcon />

      <H6 className="mt-2 flex-row text-center text-gray40">
        No tienes citas pendientes
        <br />
        Presiona aquí para agendar tu cita online
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
        + Agendar tu cita online
      </Button>
    </Link>
  </div>
);

export default AppointmentsEmpty;
