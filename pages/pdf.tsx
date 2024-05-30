import axios from "axios";
import Head from 'next/head'
import { Json } from "sequelize/types/utils";
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';

export default async function pdfHipo() {
let pdf = (await axios.get("/api/pdf/hipo/3607")).data;
pdfMake.createPdf(pdf).download("hipo3607.pdf");
}
