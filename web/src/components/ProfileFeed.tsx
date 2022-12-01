import React from "react";
import { useProfilePostsQuery } from "../generated/graphql";
import { Layout } from "./Layout";

interface ProfileFeedProps {
  profileId: number;
}

export const ProfileFeed: React.FC<ProfileFeedProps> = ({ profileId }) => {
  const { data, loading } = useProfilePostsQuery({
    variables: { profileId: profileId },
  });

  let body = null;

  if (!data && loading) {
    body = <div>Loading...</div>;
  }

  if (data && !loading) {
    body = (
      <div>
        {data.profilePosts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
  }
  return <div>{body}</div>;
};
