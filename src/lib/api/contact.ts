import { ContactFormInputs } from "~/_components/forms/LandingForm";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const parseContactForm = (
  contactFormData: ContactFormInputs,
  currentLocale: string,
  subject: string,
) => {
  const { email, specialty, availability } = contactFormData;

  return {
    lang: currentLocale,
    body: availability,
    asunto: subject,
    especialidad: specialty,
    email,
  };
};

const sendContactInformation = async (props: {
  contactFormData: ContactFormInputs;
  currentLocale: string;
  subject: string;
}) => {
  const { contactFormData, currentLocale, subject } = props;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}/misc/sendEmailLang`, {
    method: "POST",
    body: JSON.stringify(
      parseContactForm(contactFormData, currentLocale, subject),
    ),
    headers,
  });

  if (!response.ok) throw new Error();

  return true;
};

export { sendContactInformation };
