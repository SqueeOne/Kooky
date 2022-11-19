import React, { Fragment, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({});
  const [visible, setVisible] = useState("invisible");

  let body = null;

  // data is still loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-200 hover:text-white">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-3 px-6 bg-gray-200 hover:bg-white">
              <Menu.Item>
                <NextLink href="/login">
                  <div className="mr-2">login</div>{" "}
                </NextLink>
              </Menu.Item>
            </div>
            <div className="py-3 px-6 bg-gray-200 hover:bg-white">
              <Menu.Item>
                <NextLink href="/register">
                  <div>register</div>
                </NextLink>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
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
    <div className="flex justify-end sticky top-0 bg-cyan-900 p-4">
      <div>{body}</div>
    </div>
  );
};
