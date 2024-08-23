export default interface User {
    id: number;
    tp_pessoa: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    numero: string;
    endereco: string;
    endereco_complemento: string;
    endereco_num: string;
    cep: string;
    rg: string;
    orgao: string;
    nome_mae: string;
    nome_pai: string;
    estado_civil: string;
    sexo: string;
    data_nascimento: string;
    profissao: string;
    cnh: string;
    status: string;

    cnpj: string;
    razao_social: string
    inscricao_municipal: string;
    inscricao_estadual: string;
    nome_representante: string;
    cpf_representante: string;
    profissao_representante: string;
    numero_representante: string;
    email_empresa: string;
    cep_empresa: string;
    endereco_empresa: string;
    endereco_numero_empresa: string;
    endereco_complemento_empresa: string;
}