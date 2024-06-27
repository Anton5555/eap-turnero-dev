import { ContactFormInputs } from "~/_components/forms/LandingForm";
import { env } from "~/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const parseContactForm = (
  contactFormData: ContactFormInputs,
  currentLocale: string,
) => {
  const { email, specialty, availability } = contactFormData;

  return {
    email,
    specialty,
    availability,
    language: currentLocale,
  };
};

const sendContactInformation = async (props: {
  contactFormData: ContactFormInputs;
  currentLocale: string;
}) => {
  const { contactFormData, currentLocale } = props;

  // TODO: remove mocked response when endpoint is implemented
  return true;

  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    body: JSON.stringify(parseContactForm(contactFormData, currentLocale)),
  });

  if (!response.ok) throw new Error();

  return true;
};

export { sendContactInformation };
