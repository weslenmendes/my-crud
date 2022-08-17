import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
  min-width: 250px;

  margin-top: 50px;
  border-radius: 5px;
  height: max-content;

  background-color: #e3e3e3;
`;

export const Spacer = styled.div`
  width: ${(props) => props.width || "100%"};
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  border-bottom: 2px solid #ccc;
`;

export const TableHeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  min-width: max-content;
  padding: 0 10px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 10px 0px;
`;

export const TableCell = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  width: ${(props) => props.width};
  min-width: max-content;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
`;

export const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
  font-weight: 500;
  font-size: 20px;
`;

export const Button = styled.div`
  width: 100%;
  color: #e3e3e3;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin: 15px 0;
  font-size: 16px;
  font-weight: 700;
  width: max-content;
  background-color: #40739e;
  padding: 5px 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #3c6e8f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonCrud = styled.button`
  width: max-content;
  text-align: left;
  color: #e3e3e3;
  height: 45px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  padding: 5px 10px;
  background-color: ${(props) => props.backgroundColor || "#40739e"};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #e3e3e3;
  overflow-x: auto;
`;

export const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  height: 100%;
  padding: 20px;
  max-width: 100%;
  border-radius: 5px;
  background-color: #e3e3e3;

  @media screen and (max-width: 600px) {
    margin-right: 0;

    justify-content: space-between;
    min-width: 200px;
  }
`;

export const MenuBarItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 10px 10px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }

  @media screen and (max-width: 600px) {
    margin-right: 0;

    div {
      margin-right: 0;
    }

    span {
      display: none;
    }
  }
`;

export const MenuBarItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 5px;

  > svg {
    width: 25px;
    height: 25px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
