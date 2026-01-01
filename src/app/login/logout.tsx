import { devApiVersion } from "@/src/components/helper/helper-functions";
import axios from "axios";
import { useRouter } from "next/navigation";

const userLogout = async () => {
  const router = useRouter();
  try {
    await axios.get(`/api/${devApiVersion}/controllers/users/logout`);
    router.push("/login");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default userLogout;
