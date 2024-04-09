import PlatformContainer from "../common/PlatformContainer";
import AppointmentsEmpty from "./AppointmentsEmpty";

interface AppointmentListProps {
  appointments: Array<string>;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  if (!appointments.length) {
    return (
      <>
        <div className="flex h-[calc(90dvh)] justify-center lg:hidden">
          <AppointmentsEmpty />
        </div>
        <PlatformContainer className="hidden justify-center rounded-none lg:col-span-2 lg:row-span-4 lg:row-end-1 lg:grid lg:rounded-3xl">
          <AppointmentsEmpty />
        </PlatformContainer>
      </>
    );
  }

  return <div>APPOINTMENTS LIST</div>;
};

export default AppointmentList;
