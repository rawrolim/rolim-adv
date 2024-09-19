export default interface Processo {
    //Cliente
    id: String;
    nome: String;
    cpf: String;
    numero: String;
    mail: String;
    num_processo: String;
    endereco: String;
    endereco_num: String;
    endereco_complemento: String;
    cep: String;
    rg: String;
    nome_mae: String;
    nome_pai: String;
    estado_civil: String;
    sexo: String;
    data_nascimento: Date;
    data_registro: Date;
    cliente_tipo: String;
    orgao: String;
    profissao: String;
    status: String;
    cnh: String;
    tp_pessoa: String;
    cnpj: string;
    razao_social: string;
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
    estado_civil_representante: string;
    sexo_representante:string;
    cep_representante: string;
    endereco_representante: string;
    endereco_num_representante: string;
    rg_representante: string;
    endereco_complemento_representante: string;

    //Reus
    nome_reu: string;
    tp_reu: string;
    cpf_reu: string;
    cnpj_reu: string;
    nome_representante_reu: string;
    estado_civil_reu: string;
    rg_reu: string;
    email_reu: string;
    numero_reu: string;
    cep_reu: string;
    endereco_reu: string;
    endereco_numero_reu: string;
    endereco_complemento_reu: string;
    sexo_reu: string;
    profissao_reu: string;
    cnh_reu: string;

    //Processo
    numero_processo: string;
    instancia : string;
    tribunal : string;
    numero_orgao: string;
    natureza: string;
    motivo: string;
    comarca: string;
    valor_causa: string;
    data_distribuicao: string;
    valor_contrato : string;
    parcelas: string;
    entrada: string;
    inicio_prestacao: string;
}