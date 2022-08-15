import styled from "styled-components";

export const Input = (props) => {
  return (
    <InputContainer>
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      <input
        id={props.id}
        type={props.type || "text"}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
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

const Label = styled.label`
  font-size: 20px;
  font-weight: 300;
`;
