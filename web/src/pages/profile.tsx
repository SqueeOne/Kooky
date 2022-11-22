import { useRouter } from "next/router";
import React from "react";
import { CreateProfile } from "../components/CreateProfile";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery, useMyProfileQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Profile: React.FC<{}> = ({}) => {
  const profile = useMyProfileQuery();
  const { data, loading } = useMeQuery();
  const router = useRouter();

  let body = null;

  if (!loading && !data?.me) {
    router.push("/");
  }

  if (loading) {
    body = <div>Loading...</div>;
  }

  if (!profile.data?.myProfile && data?.me) {
    body = <CreateProfile />;
  }

  if (profile.data?.myProfile && data?.me) {
    body = (
      <Wrapper>
        <div className="w-full rounded-lg shadow-xl py-3 px-6 border border-gray-300">
          <h2 className="font-bold text-xl text-gray-700">
            {profile.data?.myProfile.profileName}
          </h2>
          <p className="text-gray-700 mt-4">{profile.data?.myProfile.about}</p>
        </div>
      </Wrapper>
    );
  }
  return <Layout>{body}</Layout>;
};

export default withApollo({ ssr: false })(Profile);
