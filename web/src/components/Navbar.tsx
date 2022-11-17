import React from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({});

  let body = null;

  // data is still loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <div className="mr-2">login</div>
        </NextLink>
        <NextLink href="/register">
          <div>login</div>
        </NextLink>
      </>
    );
  } else {
    body = (
      <div
        className="bg-cyan-900 text-gray-200 py-3 px-6"
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
        }}
      >
        logout
      </div>
    );
  }

  return (
    <div className="flex sticky top-0 bg-cyan-900 p-4">
      <div>{body}</div>
    </div>
  );
};
