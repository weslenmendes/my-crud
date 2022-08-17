import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  background-color: #1a202c;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .menu {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-left: 32px;
    cursor: pointer;
  }

  .exit {
    position: fixed;
    color: white;
    width: 35px;
    height: 35px;
    right: 10px;
    margin-right: 32px;
    cursor: pointer;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.5s ease;
  z-index: 1;
  cursor: pointer;
`;
