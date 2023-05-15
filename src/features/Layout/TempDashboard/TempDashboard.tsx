import { Outlet } from "react-router-dom";
import { useLogout } from "@/features/Logout/useLogout";
import { Button } from "antd";

export const TempDashboard = () => {
  const logout = useLogout();
  return (
    <div className={"flex py-6"}>
      <nav className={"w-[120px] flex-shrink-0 px-3"}>
        <ul>
          <li>Payout</li>
          <li>
            <Button onClick={logout.run}>logout</Button>
          </li>
          <li></li>
        </ul>
      </nav>
      <div className={"flex-grow"}>
        <Outlet />
      </div>
    </div>
  );
};
