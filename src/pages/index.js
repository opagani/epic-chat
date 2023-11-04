import Login from "src/components/Login";
import useAuthUser from "src/hooks/useAuthUser";
import Sidebar from "src/components/Sidebar";

export default function Home() {
  const user = useAuthUser();

  if (!user) return <Login />;

  return (
    <div className='app'>
      <div className='app__body'>
        <Sidebar user={user} />
      </div>
    </div>
  );
}
