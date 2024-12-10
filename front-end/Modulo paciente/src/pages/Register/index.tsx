import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Url/api";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    repete_senha: "",
    userType: "User",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const { nome, sobrenome, email,  senha, repete_senha, userType } = formData;

    if (!nome || !sobrenome || !senha || !repete_senha || !userType) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return false;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Por favor, insira um e-mail válido!");
      return false;
    }

    if (senha.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres!");
      return false;
    }

    if (senha !== repete_senha) {
      toast.error("As senhas não correspondem!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
    const resp = await api.post("/usuario/add", formData);
     if(resp){
         console.log("Dados enviados:", formData);
         toast.success("Usuário registrado com sucesso!");
         setFormData({
           nome: "",
           sobrenome: "",
           email: "",
           senha: "",
           repete_senha: "",
           userType: "",
         });
     }
    } catch (error) {
      toast.error("Erro ao registrar o usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <ToastContainer theme="colored" closeButton={false} />
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <TextField
            label="Sobrenome"
            name="sobrenome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.sobrenome}
            onChange={handleChange}
            required
          />
          <TextField
            label="E-mail"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Senha"
            name="senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <TextField
            label="Repita a Senha"
            name="repete_senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.repete_senha}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 , mb:2}}
          >
            {loading ? <CircularProgress size={24} /> : "Registrar"}
          </Button>
          <Link
          onClick={() => navigate('/')}
          underline="hover"
          sx={{ cursor: "pointer", display: "block", mb: 2 }}
          >
          Ir para o login
        </Link>
        </form>
      </Box>
    </>
  );
};

export default RegisterScreen;
