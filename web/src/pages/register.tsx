import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-xs">
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <div className="mt-4">
              <InputField name="email" placeholder="email" label="Email" />
            </div>
            <div className="mt-4">
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </div>
            <div className="flex w-full justify-end">
              <div className="mt-4 bg-cyan-900 text-gray-200 rounded-lg font-bold p-3 w-24 text-center hover:bg-cyan-800 hover:text-gray-100 cursor-pointer">
                register
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
