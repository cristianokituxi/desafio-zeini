
import { usuario } from "../types/usuario";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,

  Stack,
  TextField,
  Autocomplete
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/auth/AuthContext";
import api from "../../../Url/api";








export default function Form() {
  const { handleSubmit, setValue, control, formState: { errors }, watch } = useForm<usuario>();

  const password = watch("senha");


  const { usuarios, fetchDataUsuario } = useAuthContext()


  const { id } = useParams();

 

  useEffect(() => {

    if (!id || !Array.isArray(usuarios)) return;

    const user = usuarios.find((usuarioTipo: usuario) => usuarioTipo.id == id);
    console.log(user);
    if (user) {
      setValue("login", user.email);
      setValue("senha", user.senha);
      setValue("nome", user.nome);
      setValue("sobrenome", user.sobrenome);
      setValue("tipo_user_id", user.usuario_tipo);
    }

  }, [id, setValue, usuarios]);



  const onSubmit = async (data: usuario) => {
    (data);
    const newList = [data].map(item => ({
      email: item.login,
      senha: item.senha,
      nome: item.nome,
      sobrenome: item.sobrenome,
      repete_senha: item.repete_senha,
      userType: item.tipo_user_id.nome
    }));
    if (!id) {
      try {
        const resp = await api.post("http://localhost:4001/usuario/add", newList);
        if (resp) {
          toast.success("usuario criado com sucesso");
          setValue("login", "");
          setValue("senha", "");
          setValue("repete_senha", "");
          return;

        }
        toast.error('Erro ao criar usuario');
      } catch (error) {
        toast.error('Erro ao criar usuario');
        console.error(error);
      }
    }
    else {
      try {

        const resp = await api.put(
          `/usuario/update${id}`,
          data
        );

        if (resp) {
          toast.success(resp.data.message);
          fetchDataUsuario()

        }

      } catch (error) {
        console.error(error);
      }
    };
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 2 }}
    >
      <ToastContainer
        toastStyle={{ width: "100%" }}
        bodyStyle={{ width: "100%" }}
        closeButton={false}
        theme="light"
      />
      <Controller
        name="nome"
        control={control}
        defaultValue=""
        rules={{ required: "nome é obrigatório" }}
        render={({ field }) => (
          <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
            <TextField
              {...field}
              label="Nome"
              variant="outlined"
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />

          </FormControl>
        )}
      />
      <Controller
        name="sobrenome"
        control={control}
        defaultValue=""
        rules={{ required: "nome é obrigatório" }}
        render={({ field }) => (
          <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
            <TextField
              {...field}
              label="Sobre nome"
              variant="outlined"
              error={!!errors.sobrenome}
              helperText={errors.sobrenome?.message}
            />

          </FormControl>
        )}
      />
      <Controller
        name="login"
        control={control}
        defaultValue=""
        rules={{ required: "Login é obrigatorio" }}
        render={({ field }) => (
          <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
            <TextField
              {...field}
              label="E-mail"
              variant="outlined"
              error={!!errors.login}
              helperText={errors.login?.message}
            />

          </FormControl>
        )}
      />


      <Controller
        name="senha"
        control={control}
        defaultValue=""
        rules={{ required: "Password é obrigatorio" }}
        render={({ field }) => (
          <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>

            <TextField
              {...field}
              type="password"
              label="Senha"
              variant="outlined"
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
          </FormControl>
        )}
      />

      <Controller
        name="repete_senha"
        control={control}
        defaultValue=""
        rules={{
          required: "Confirmar senha é obrigatório ",
          validate: value =>
            value === password || "Passwords do not match"
        }}
        render={({ field }) => (
          <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>

            <TextField
              {...field}
              type="password"
              label="Confirma a senha"
              variant="outlined"
              error={!!errors.repete_senha}
              helperText={errors.repete_senha?.message}
            />
          </FormControl>
        )}
      />

      <Controller
        name="tipo_user_id"
        control={control}
        rules={{ required: "Tipo ge cooperado é obrigátorio" }}
        render={({ field }) => (
          <Autocomplete
            options={[
              { ipo_user_id: '1', nome: 'Gestor' },
              { ipo_user_id: '2', nome: 'Afiliado' },
              { ipo_user_id: '3', nome: 'Comum' },

            ]}
            getOptionLabel={(option) => option.nome}
            onChange={(__event, value) => field.onChange(value)}

            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de usuario"
                variant="outlined"
                error={!!errors.tipo_user_id}
                helperText={errors.tipo_user_id?.message}
              />
            )}
          />
        )}
      />
      <FormControl fullWidth={true} sx={{ marginTop: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            Criar usuario
          </Button>
          <Button component={RouterLink} to="/usuario" color="error">
            Cancelar
          </Button>
        </Stack>

      </FormControl>
    </Box>


  );
}