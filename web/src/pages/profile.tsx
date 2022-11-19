import React from "react";
import { CreateProfile } from "../components/CreateProfile";
import { Layout } from "../components/Layout";
import { useMyProfileQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Profile: React.FC<{}> = ({}) => {
  const profile = useMyProfileQuery();

  let body = null;

  if (!profile.data?.myProfile) {
    body = <CreateProfile />;
  } else {
    body = (
      <div>
        <h2>UserProfile</h2>
      </div>
    );
  }
  return <Layout>{body}</Layout>;
};

export default withApollo({ ssr: false })(Profile);
