import nodemailer from 'nodemailer';

export default async function sendEmail(para = '', assunto='', corpoHtml='') {
    // Configura o transportador usando seu servidor SMTP pessoal
    const transporter = nodemailer.createTransport({
        name: process.env.EMAIL_NAME,
        host: process.env.EMAIL_HOST,
        port: 465,  // Porta padrão para SMTP
        secure: true,  // True para port 465, false para outras portas
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PSW,
        }
    });
    
    // Configuração das opções de e-mail
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: para,
        subject: assunto,
        html: corpoHtml
    };

    // Envia o e-mail
    const resEmail = await transporter.sendMail(mailOptions);

    return resEmail;
}
