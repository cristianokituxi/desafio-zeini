export type usuario = {
    userType: string;
    length: any;
    id: string;
    map(arg0: (item: { login: any; senha: any; pessoa_id: { id: any; }; tipo_user_id: { id: number; }; }) => { login: any; senha: any; pessoa_id: any; tipo_user_id: any; }): unknown;
    _id : string,
    nome: string,
    email?: string,
    passeword: string,
    sobrenome: string,
    login : string,
    senha : string,
    repete_senha : string,
    tipo_user_id :TipoUser,
}

export type Pessoa = {
    id: number;
    nome: string;
    sobrenome: string;
    nome_pai: string;
    nome_mae: string;
  };


  export type TipoUser = {
    id: number;
    nome: string;
    descricao: string;
  };