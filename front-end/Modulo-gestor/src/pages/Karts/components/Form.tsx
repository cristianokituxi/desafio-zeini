import { kart } from "../types/kart";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Button,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/auth/AuthContext";
import api from "../../../Url/api";

export default function Form() {
  const { handleSubmit, setValue, register, formState: { errors } } = useForm<kart>();
  const { karts, fetchDataKarts } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [disponivel, setDisponivel] = useState<boolean>(true); // Estado para o campo 'disponivel'

  useEffect(() => {
    if (!id || !Array.isArray(karts)) return;

    const kart = karts.find((kart: kart) => kart.id == id);

    if (kart) {
      setValue("nome", kart.nome);
      setValue("velocidade", kart.velocidade);
      setValue("tipo", kart.tipo);
      setDisponivel(kart.disponivel ?? true); // Recupera o estado de 'disponivel' do kart
    }
  }, [id, setValue, karts]);

  const onSubmit = async (data: kart) => {
    const kartData = { ...data, disponivel }; // Inclui 'disponivel' nos dados enviados

    if (!id) {
      try {
        const resp = await api.post("/kart/add", kartData);
        if (resp) {
          toast.success(resp.data.message);
          fetchDataKarts();
          setValue("nome", "");
          setValue("velocidade", 0);
          setValue("tipo", "");
          setDisponivel(true); // Reseta o estado de 'disponivel' após adicionar
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const resp = await api.put(`/kart/update${id}`, kartData);
        toast.success(resp.data);
        if (resp.data) {
          fetchDataKarts();
          setTimeout(() => {
            navigate("/kart/");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
      <TextField
        label="Nome"
        fullWidth={true}
        error={!!errors.nome}
        helperText={errors.nome?.message}
        sx={{ marginBottom: 2 }}
        {...register("nome")}
      />

      <TextField
        label="velocidade"
        type="number"
        fullWidth={true}
        error={!!errors.velocidade}
        helperText={errors.velocidade?.message}
        sx={{ marginBottom: 2 }}
        {...register("velocidade")}
      />

      <TextField
        label="Tipo"
        fullWidth={true}
        error={!!errors.velocidade}
        helperText={errors.velocidade?.message}
        sx={{ marginBottom: 2 }}
        {...register("tipo")}
      />

      <FormControlLabel
        control={
          <Switch
            checked={disponivel}
            onChange={() => setDisponivel(!disponivel)}
            name="disponivel"
            color="primary"
          />
        }
        label="Disponível"
        sx={{ marginBottom: 2 }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button type="submit" variant="contained" size="large">
          Adicionar Kart
        </Button>
        <Button component={RouterLink} to="/kart" color="error">
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}
