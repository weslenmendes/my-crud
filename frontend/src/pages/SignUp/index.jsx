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

import { SignUpSchema } from "../../schemas/authSchema.js";

import { SignUp as SignUpService } from "../../services/authServices.js";

import { AuthContext } from "../../contexts/AuthContext";

import { notify } from "../../utils/notifyUtils.js";

const initialForm = {
  name: "",
  image: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = (props) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { user, loading: loadingContext } = useContext(AuthContext);

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

    const validate = SignUpSchema.validate(form, { abortEarly: true });

    if (validate.error) {
      const errors = validate.error.details.map((error) => error.message);

      setLoading(false);

      errors.forEach((error) => notify(error, "error"));

      return;
    }

    try {
      await SignUpService({ ...form });
      notify("Usuário criado com sucesso!", "success");
      navigate("/sign-in");
    } catch (e) {
      notify(e.response.data.message, "error");
    } finally {
      setLoading(false);
    }
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
        <SubTitle>SignUp</SubTitle>
        <Form>
          <Input
            label="Nome"
            name="name"
            type="text"
            placeholder="Digite seu nome"
            value={form.name}
            onChange={handleChange}
            required={true}
            disabled={loading}
          />

          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Imagem"
            name="image"
            type="text"
            placeholder="Coloque um link para sua imagem"
            value={form.image}
            onChange={handleChange}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Confirmação de Senha"
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required={true}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loading width={"50"} height={"50"} color={"#e3e3e3"} />
            ) : (
              <span>Cadastrar</span>
            )}
          </Button>

          <ButtonLine disabled={loading} onClick={() => navigate("/sign-in")}>
            <span>Voltar</span>
          </ButtonLine>
        </Form>
      </FormContainer>
    </Container>
  );
};
