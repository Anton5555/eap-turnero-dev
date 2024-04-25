import { useQuery } from "@tanstack/react-query";
import { getUserImage } from "./api/users";

const useUserImage = (props: {
  accessToken: string;
  image: string | undefined;
}) => {
  const { accessToken, image } = props;

  const { data: imageUrl } = useQuery({
    queryKey: ["userImage", image],
    queryFn: () => getUserImage({ accessToken, image: image! }),
    enabled: !!image,
  });

  return imageUrl;
};

export default useUserImage;
