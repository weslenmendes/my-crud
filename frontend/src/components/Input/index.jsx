import {
  Input as SInput,
  InputContainer,
  LabelContainer,
  Label,
  Required,
} from "./styled.js";

export const Input = (props) => {
  return (
    <InputContainer>
      <LabelContainer>
        {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
        {props.required && props.showRequired && <Required>*</Required>}
      </LabelContainer>
      <SInput
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
