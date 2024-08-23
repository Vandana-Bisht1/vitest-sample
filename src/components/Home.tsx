import { UserGreeting } from "./UserGreeting";

const Home = () => {
  return (
    <div>
      <h2>This is home component</h2>
      <p data-testid="para">This is the paragraph in home page</p>
      <UserGreeting />
    </div>
  );
};
export default Home;