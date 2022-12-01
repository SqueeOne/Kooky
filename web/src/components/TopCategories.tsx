import React from "react";
import {
  useAddCategoryToProfileMutation,
  useAllCategoriesQuery,
} from "../generated/graphql";

interface TopCategoriesProps {}

export const TopCategories: React.FC<TopCategoriesProps> = ({}) => {
  const { data, loading, error } = useAllCategoriesQuery();
  const [addCategoryToProfile] = useAddCategoryToProfileMutation();

  let body = null;

  if (!data && loading) {
    body = <div>Loading...</div>;
  }

  if (!loading && data) {
    body = (
      <div className="flex-col gap-4">
        {data.allCategories.map((category) => (
          <div className="flex py-3 px-6 gap-4" key={category.id}>
            <div className="font-medium text-lg text-cyan-800">
              {category.name}
            </div>
            <div
              className="bg-gray-900 font-medium text-white py-2 px-4 rounded-lg cursor-pointer"
              onClick={() =>
                addCategoryToProfile({ variables: { categoryId: category.id } })
              }
            >
              Follow
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <div>{body}</div>;
};
