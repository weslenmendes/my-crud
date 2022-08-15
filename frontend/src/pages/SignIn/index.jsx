import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";

import {
  Container,
  FormContainer,
  Form,
  SubTitle,
  Button,
  ButtonLine,
  LoadingContainer,
  LoadingSubtitle,
} from "./styled.js";

import { SignInSchema } from "../../schemas/authSchema.js";

import { AuthContext } from "../../contexts/AuthContext";

import { notify } from "../../utils/notifyUtils.js";

const initialForm = {
  email: "",
  password: "",
};

export const SignIn = (props) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { SignIn, user, loading: loadingContext } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const validate = SignInSchema.validate(form, { abortEarly: true });

    if (validate.error) {
      const errors = validate.error.details.map((error) => error.message);

      setLoading(false);

      errors.forEach((error) => notify(error, "error"));

      return;
    }

    await SignIn(form.email, form.password);

    setLoading(false);
  };

  if (loadingContext) {
    return (
      <LoadingContainer>
        <Loading height={"100"} width={"100"} color="#e3e3e3" />
        <LoadingSubtitle>Carregando...</LoadingSubtitle>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <SubTitle>SignIn</SubTitle>
        <Form>
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required={true}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loading width={"50"} height={"50"} color={"#e3e3e3"} />
            ) : (
              <span>Entrar</span>
            )}
          </Button>

          <ButtonLine disabled={loading} onClick={() => navigate("/sign-up")}>
            <span>Cadastrar-se</span>
          </ButtonLine>
        </Form>
      </FormContainer>
    </Container>
  );
};
