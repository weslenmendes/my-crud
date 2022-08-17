import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  min-width: 280px;
`;

export const Spacer = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "0")}px;
`;

export const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  margin: 20px 0px;
  margin-top: 40px;
  font-size: 30px;
  font-weight: bold;
  color: #e3e3e3;
`;

export const ModalSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  margin: 20px 0px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
    height: 30px;
    width: 30px;
  }
`;

export const Button = styled.button`
  width: 100%;
  color: #e3e3e3;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin: 15px 0;
  font-size: 16px;
  font-weight: 700;
  background-color: #40739e;
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
  background-color: #40739e;
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
