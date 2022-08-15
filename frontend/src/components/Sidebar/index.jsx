import { FaTimes, FaHome, FaTable } from "react-icons/fa";

import { Container, Content } from "./styled";

import { SidebarItem } from "../SidebarItem";

export const Sidebar = ({ open, active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active} active={open}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem Icon={FaHome} Label="Home" />
        <SidebarItem Icon={FaTable} Label="Cruds" />
      </Content>
    </Container>
  );
};
