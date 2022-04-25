import { Link } from 'react-router-dom';

const Home = () => {
  return <div>
    <h1>Welcome to Find Your Bank</h1>
    <br />
    <Link to='/all-banks'>Click here to See all banks</Link>
  </div>;
};

export default Home;
