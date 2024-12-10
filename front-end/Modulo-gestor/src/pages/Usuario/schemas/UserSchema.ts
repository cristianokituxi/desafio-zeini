import * as yup from "yup"

import { usuario } from "../types/usuario"

export const UserSchema = yup
  .object<usuario>({
    nome: yup.string().required("Este campo é obrigatório"),
    descricacao: yup.string().required("Este campo é obrigatório"),
  })
  .required()
