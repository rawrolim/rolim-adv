const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import http from "../config/http";

export default async function pdfHipo(cliente_id: number) {

    const cliente = await http.get("/api/cliente/" + cliente_id.toString());

    const pdf = await http.post("/api/pdf/hipo", {
        "cliente": cliente
    });

    pdfMake.createPdf(pdf).download("hipo3607.pdf");
}

export async function pdfProcuracao(cliente_id: number) {

    const cliente = await http.get("/api/cliente/" + cliente_id.toString());

    const pdf = await http.post("/api/pdf/procuracao", {
        "cliente": cliente
    });

    pdfMake.createPdf(pdf).download("procuração"+ cliente.nome +".pdf");
}