import styled from "styled-components";

export const Container = styled.div`
  background-color: #171923;
  position: fixed;
  z-index: 2;
  height: 100%;
  top: 0px;
  left: 0px;
  left: ${(props) => (props.active ? "0" : "-100%")};
  opacity: ${(props) => (props.active ? "1" : "0")};
  width: ${(props) => (props.active ? "300px" : "0")};
  transition: all 0.4s ease;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;
