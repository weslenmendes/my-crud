import { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import { Container, ActionsContainer, Background } from "./styled.js";

import { AuthContext } from "../../contexts/AuthContext";

import { Sidebar } from "../Sidebar";

export const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const { SignOut } = useContext(AuthContext);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <Container>
      <ActionsContainer>
        <FaBars className={"menu"} title="Menu" onClick={showSidebar} />
        <MdExitToApp className={"exit"} title="Sair" onClick={SignOut} />
      </ActionsContainer>
      <Sidebar open={sidebar} active={setSidebar} />
      {sidebar && <Background open={sidebar} onClick={showSidebar} />}
    </Container>
  );
};
