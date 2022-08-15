import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  margin: 10px 0;

  input {
    height: 45px;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    padding: 0 10px;
    outline-color: #487eb0;
    font-size: 16px;

    &:disabled {
      pointer-events: none;
    }
  }
`;

export const Label = styled.label`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
`;

export const Required = styled.span`
  color: #ff0000;
  font-size: 16px;
  font-weight: 500;
  height: max-content;
  margin-top: 10px;
  margin-left: 3px;
`;

export const Input = styled.input``;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;
