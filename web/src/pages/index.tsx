import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Layout>
      <div>
        <h2>INDEX</h2>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Index);
