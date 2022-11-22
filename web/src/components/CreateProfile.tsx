import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateProfileMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { Wrapper } from "./Wrapper";

interface CreateProfileProps {}

export const CreateProfile: React.FC<CreateProfileProps> = ({}) => {
  const router = useRouter();
  const [createProfile] = useCreateProfileMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ name: "", about: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createProfile({
            variables: values,
          });
          if (response.data?.createProfile.profileName) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="name"
              placeholder="nickname"
              label="Enter a display name"
            />
            <div className="mt-4">
              <InputField
                name="about"
                placeholder="About you"
                label="Write a short introduction"
              />
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="mt-4 bg-cyan-900 text-gray-200 rounded-lg font-bold p-3 w-24 text-center hover:bg-cyan-800 hover:text-gray-100 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
