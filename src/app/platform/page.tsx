import H3 from "~/_components/common/titles/H3";
import H6 from "~/_components/common/titles/H6";

const Page = () => (
  <main className="flex">
    <div className="lg:3/4 flex flex-col lg:space-y-4">
      <H3 className="text-green">Agenda</H3>
      <H6>Revisa tus citas pendientes y agenda nuevas</H6>
      <div className=""></div>
    </div>
    <div className="hidden lg:flex lg:w-1/4 lg:flex-col"></div>
  </main>
);

export default Page;
