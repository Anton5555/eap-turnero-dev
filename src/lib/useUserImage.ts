import { useQuery } from "@tanstack/react-query";
import { getUserImage } from "./api/users";

const useUserImage = (props: {
  accessToken: string;
  imageName: string | undefined;
}) => {
  const { accessToken, imageName } = props;

  const { data: imageUrl } = useQuery({
    queryKey: ["userImage", imageName],
    queryFn: () => getUserImage({ accessToken, imageName: imageName! }),
    enabled: !!imageName,
  });

  return imageUrl;
};

export default useUserImage;
