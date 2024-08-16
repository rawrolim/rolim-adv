import { NextApiRequest, NextApiResponse } from "next";
import Cliente from "../../../models/cliente.model";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dataAtual = new Date();

    let sql = `
        SELECT * FROM clientes
        WHERE id = ?
    `

    if (method === "POST") {
        const rs = await query(sql, [body.id])
        const cliente = rs[0] as Cliente;
        
            if(cliente.tp_pessoa === 'física'){
                const docDefinition = {
                    content: [
                        {
                            text: 'Declaração de Hipossuficiência\n\n\n',
                            style: 'header',
                            alignment: 'center'
                        },
                        {
                            text: [
                                'Eu, ',
                                { text: cliente.nome.toUpperCase(), bold: true },
                                ', Brasileiro, ' + cliente.estado_civil + ', ',
                                { text: cliente.profissao || cliente, bold: true },
                                ', portador do RG nº ',
                                { text: cliente.rg, bold: true },
                                ', emitido pelo ',
                                { text: cliente.orgao, bold: true },
                                ', inscrito no CPF sob nº ',
                                { text: cliente.cpf, bold: true },
                                ', com endereço residencial na ' + 
                                cliente.endereco + ', número ' 
                                + cliente.endereco_num + ', ' + 
                                cliente.endereco_complemento + ', CEP:' 
                                + cliente.cep + 
                                ',',{text: ' Declaro',bold:true},', para todos os fins de direito e sob as penas da lei, que não tenho condições de arcar com as despesas inerentes ao presente processo, sem prejuízo do meu sustento e de minha família, necessitando, portanto, da',
                                {text:' GRATUIDADE DE JUSTIÇA',bold:true},', nos termos do art. 98 e seguintes da Lei 13.105/2015 (Código de Processo Civil). Requeiro, ainda, que o benefício abranja a todos os atos do processo.'
                               
                            ],
                            style: 'medium',
                            bold: false
                        },
                        {
                            text: [
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                'Macaé, ' + dataAtual.getDate() + ' de ' + nomesMeses[dataAtual.getMonth()] + ' de ' + dataAtual.getFullYear() + '.',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                cliente.nome
                            ],
                            style: 'medium',
                            alignment: 'center'
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            alignment: 'justify'
                        },
        
                        medium: {
                            fontSize: 12,
                            alignment: 'justify'
                        }
                    }
                };
                res.status(200).json(docDefinition);
            
            }else{
                const docDefinition = {
                    content: [
                        {
                            text: 'Declaração de Hipossuficiência\n\n\n',
                            style: 'header',
                            alignment: 'center'
                        },
                        {
                            text: [
                                { text: cliente.razao_social.toUpperCase(), bold: true },
                                ', pessoa jurídica de direito privado, inscrita no',{text:' CNPJ (MF) sob o n°',bold:true},
                                {text: cliente.cnpj.toUpperCase(), bold: true} + ', com sua sede estabelecida na,',
                                {text: cliente.endereco_empresa} +', número ', 
                                {text: cliente.endereco_numero_empresa} + ', ', 
                                {text: cliente.endereco_complemento_empresa} + ', CEP:',
                                {text: cliente.cep_empresa},',neste ato representado por ',{text:cliente.nome_representante.toUpperCase(), bold: true},
                                ', brasileiro,',{text:cliente.estado_civil_representante},
                                {text: cliente.profissao},',portador do RG nº ',{text: cliente.rg_representante},' e inscrito no CPF/MF sob o nº',
                                {text:cliente.cpf_representante},{text:cliente.endereco_representante, bold: true},{text:cliente.endereco_num_representante},
                                {text:cliente.endereco_complemento_representante},' CEP:',
                                {text:cliente.cep_representante},
                                ',',{text: ' Declaro',bold:true},', para todos os fins de direito e sob as penas da lei, que não tenho condições de arcar com as despesas inerentes ao presente processo, sem prejuízo do meu sustento e de minha família, necessitando, portanto, da',
                                {text:' GRATUIDADE DE JUSTIÇA',bold:true},', nos termos do art. 98 e seguintes da Lei 13.105/2015 (Código de Processo Civil). Requeiro, ainda, que o benefício abranja a todos os atos do processo.'
                                ],
                            style: 'medium',
                            bold: false
                        },
                        {
                            text: [
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                'Macaé, ' + dataAtual.getDate() + ' de ' + nomesMeses[dataAtual.getMonth()] + ' de ' + dataAtual.getFullYear() + '.',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                '\n',
                                cliente.nome
                            ],
                            style: 'medium',
                            alignment: 'center'
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            alignment: 'justify'
                        },
        
                        medium: {
                            fontSize: 12,
                            alignment: 'justify'
                        }
                    }
                };
                res.status(200).json(docDefinition);
                    
            }
            
    }
        
    
}
