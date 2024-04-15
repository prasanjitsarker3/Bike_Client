/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../Utlis/verifyToken";
import { sidebarItemGenerator } from "../../Utlis/sidebarItemGeneartor";
import { managerRoutePaths } from "../../routes/manager.routes";
import { userRoutePaths } from "../../routes/user.routes";

const userRole = {
  MANAGER: "manager",
  USER: "user",
};

const SideBar = () => {
  const token = useAppSelector(useCurrentToken);
  console.log();
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems;
  switch ((user as TUser)!.role) {
    case userRole.MANAGER:
      sidebarItems = sidebarItemGenerator(managerRoutePaths, userRole.MANAGER);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemGenerator(userRoutePaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <div>
      <Sider
        style={{ borderRadius: "8px", height: "99vh" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div>
          <h1
            style={{
              color: "white",
              fontSize: "17px",
              textAlign: "center",
              paddingTop: "24px",
              paddingBottom: "8px",
            }}
          >
            Bike Dashboard
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          className=" uppercase"
          // @ts-ignore
          items={sidebarItems}
          //   items={sidebarItemGenerator(facultyRoutePaths, "faculty")}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
