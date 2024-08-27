import { UserGreeting } from "./UserGreeting";

const Home = () => {
  return (
    <div style={{alignItems:"center", flexDirection:'column', display:'flex'}}>
      <h2>This is home component</h2>
      <p data-testid="para">This is the paragraph in home page</p>
      <UserGreeting />
    </div>
  );
};
export default Home;