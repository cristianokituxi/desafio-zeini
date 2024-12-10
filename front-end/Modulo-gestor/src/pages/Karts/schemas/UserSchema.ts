import * as yup from "yup"

import { kart } from "../types/kart"

export const UserSchema = yup
  .object<kart>({
    nome: yup.string().required("Este campo é obrigatório"),
    velocidade: yup.string().required("Este campo é obrigatório"),
    tipo: yup.string().required("Este campo é obrigatório"),
  })
  .required()
