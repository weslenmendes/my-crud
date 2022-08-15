import { Container } from "./styled";

export const SidebarItem = ({ Icon, Label }) => {
  return (
    <Container>
      <Icon />
      {Label}
    </Container>
  );
};
