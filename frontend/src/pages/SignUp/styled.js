import styled from "styled-components";

export const Container = styled.section`
  height: 100vh;
  color: #e3e3e3;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 28px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1.5;
`;

export const FormContainer = styled.div`
  background-color: #dcdde1;
  width: 70%;
  min-width: 260px;
  max-width: 400px;
  margin-top: 25px;
  padding: 10px 40px;
  border-radius: 5px;
  color: #333;
  height: max-content;
`;

export const Form = styled.form``;

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

export const ButtonLine = styled.button`
  width: 100%;
  color: #40739e;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
