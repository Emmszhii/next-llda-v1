"use client";
import { InputText } from "@/src/components/helper/FormInputs";
import { devApiVersion } from "@/src/components/helper/helper-functions";
import ButtonSpinner from "@/src/components/partials/loading/ButtonSpinner";
import LogoMd from "@/src/components/partials/logo/LogoMd";
import MessageErrorModal from "@/src/components/partials/modal/MessageErrorModal";
import ModalSuccess from "@/src/components/partials/modal/ModalSuccess";
import { setError, setMessage, setSuccess } from "@/src/store/StoreAction";
import { useStore } from "@/src/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function SystemSignupPage() {
  const { store, dispatch } = useStore();
  const router = useRouter();

  const initVal = {
    system_first_name: "",
    system_last_name: "",
    system_email: "",
    system_password: "",
  };
  const yupSchema = Yup.object({
    system_first_name: Yup.string().required("Required"),
    system_last_name: Yup.string().required("Required"),
    system_email: Yup.string().required("Required").email("Invalid email"),
    system_password: Yup.string().required("Required"),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) =>
      await axios.post(
        `/api/${devApiVersion}/controllers/system-users/signup`,
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["system-user"] });
      console.log(data.data.error);
      // show error box
      dispatch(setSuccess(true));
      dispatch(setMessage(data.data.message));
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        dispatch(setMessage(error?.response?.data.error));
      } else {
        dispatch(setMessage(error?.message));
      }
      dispatch(setError(true));
    },
  });

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,12vw,8rem))" }}
      >
        <div className="w-96 p-6">
          <div className="flex justify-center">
            <LogoMd />
          </div>
          <p className="mt-4 mb-5 text-lg font-bold text-center">
            Create Account
          </p>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values: any, { setSubmitting, resetForm }) => {
              // mutate data
              mutation.mutate(values);
              dispatch(setError(false));
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div>
                    <div className="relative mb-6">
                      <InputText
                        label="First name"
                        type="text"
                        name="system_first_name"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Last name"
                        type="text"
                        name="system_last_name"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Email"
                        type="text"
                        name="system_email"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Password"
                        type="password"
                        name="system_password"
                        disabled={mutation.isPending}
                      />
                    </div>
                    {store.error && <MessageErrorModal />}
                  </div>

                  <div>
                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isPending || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isPending && <ButtonSpinner />} Signup
                      </button>
                    </div>

                    <div className="mt-4 text-xs">
                      <span>Go To </span>
                      <div className="ml-2 inline-flex items-center gap-2">
                        <Link className="hover:underline" href="/system-login">
                          Login page
                        </Link>
                        <span>|</span>
                        <Link className="hover:underline" href="/">
                          Homepage
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {store.success && <ModalSuccess />}
    </>
  );
}
