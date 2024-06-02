import { NextApiRequest, NextApiResponse } from "next";
import Cliente from "../../../models/cliente.model";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dataAtual = new Date();

    const cliente = body.cliente as Cliente;

    if (method === "POST") {

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
                        { text: cliente.profissao, bold: true },
                        ', portador do RG nº ',
                        { text: cliente.rg, bold: true },
                        ', emitido pelo ',
                        { text: cliente.orgao, bold: true },
                        ', inscrito no CPF sob nº ',
                        { text: cliente.cpf, bold: true },
                        ', com endereço residencial na ' + cliente.endereco + ', número ' + cliente.endereco_num + ', ' + cliente.endereco_complemento + ', CEP:' + cliente.cep + ', declaro para os devidos fins de prova em juízo, estar juridicamente hipossuficiente, não tendo condições de arcar com ás custas e demais despesas judiciais sem prejuízo do meu próprio sustento, assim como do sustento de minha família, sendo então merecedor dos benefícios da gratuidade nos termos da Lei 1060/50, assegurados pela Constituição Federal, artigo 5º, LXXIV e pela Lei 13.105/15 CPC/15, artigo 98 e seguintes, requerendo desta forma, me sejam deferidos os benefícios da GRATUIDADE DE JUSTIÇA, por ser tal graciosidade a única possibilidade real de acesso à Justiça, garantia constitucionalmente consagrada.\n'],
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
