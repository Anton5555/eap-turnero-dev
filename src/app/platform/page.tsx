import H3 from "~/_components/common/titles/H3";
import H6 from "~/_components/common/titles/H6";

const Page = () => (
  <main>
    <div className="mx-auto space-y-4 px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="space-y-4">
        <H3 className="text-green">Agenda</H3>

        <H6>Revisa tus citas pendientes y agenda nuevas</H6>
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="rounded-3xl bg-white px-4 py-8 shadow-custom-light lg:col-span-2 lg:row-span-4 lg:row-end-1 xl:px-16 xl:pb-20 xl:pt-16">
          CITAS PENDIENTES
        </div>

        <div className="-mx-4 rounded-3xl bg-white px-4 py-8 shadow-custom-light lg:col-span-1 lg:row-span-2 xl:px-16 xl:pb-20 xl:pt-16">
          CALENDARIO
        </div>

        <div className="-mx-4 rounded-3xl bg-white px-4 py-8 shadow-custom-light lg:col-span-1 lg:row-span-2 xl:px-16 xl:pb-20 xl:pt-16">
          Contactanos
        </div>
      </div>
    </div>
  </main>
);

export default Page;
