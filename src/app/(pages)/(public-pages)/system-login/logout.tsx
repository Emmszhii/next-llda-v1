import { devApiVersion } from "@/src/components/helper/helper-functions";
import axios from "axios";
import { useRouter } from "next/navigation";

const systemUserLogout = async () => {
  const router = useRouter();
  try {
    await axios.get(`/api${devApiVersion}/controllers//logout`);
    router.push("/system-login");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default systemUserLogout;
