import React from "react";
import { Layout } from "../components/Layout";
import { ProfileFeed } from "../components/ProfileFeed";
import { useMyProfileQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Feed: React.FC<{}> = ({}) => {
  const profile = useMyProfileQuery();

  let body = (
    <Layout>
      <div>Loading...</div>
    </Layout>
  );

  if (profile.data?.myProfile?.id) {
    body = (
      <Layout>
        <div className="flex-col gap-4">
          <ProfileFeed profileId={profile.data.myProfile.id} />
        </div>
      </Layout>
    );
  }

  return body;
};

export default withApollo({ ssr: false })(Feed);
