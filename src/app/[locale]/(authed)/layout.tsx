import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import React from "react";
import LanguageNotImplementedDialog from "~/_components/common/LanguageNotImplementedDialog";
import Sidebar from "~/_components/shared/Sidebar";
import { getNotifications } from "~/lib/api/notifications";
import authOptions from "~/lib/authOptions";
import { type AppointmentNotification } from "~/types/notifications";

export const metadata = {
  title: "EAP Turnero",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const { user } = session;

  const currentLocale = await getLocale();

  const notifications: AppointmentNotification[] = await getNotifications({
    patientId: Number(session.user.id),
    accessToken: user.accessToken,
  });

  return (
    <section className="h-full min-h-screen w-screen bg-gray-bg">
      <Sidebar user={user} notifications={notifications}>
        <div className="mx-auto lg:space-y-4 lg:px-8 lg:py-4 xl:max-w-screen-2xl">
          {children}
        </div>
      </Sidebar>

      {currentLocale === "pt" && <LanguageNotImplementedDialog />}
    </section>
  );
};

export default Layout;
