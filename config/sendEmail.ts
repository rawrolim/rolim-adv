import nodemailer from 'nodemailer';

export default async function sendEmail(para = [], assunto='', corpoHtml='') {
    // Configura o transportador usando seu servidor SMTP pessoal
    const transporter = nodemailer.createTransport({
        host: 'mail.rawlinsonrolimadv.com',
        port: 465,  // Porta padrão para SMTP
        secure: true,  // True para port 465, false para outras portas
        auth: {
            user: "contato@rawlinsonrolimadv.com",
            pass: "MACAhell274@",
        },
    });
    
    // Configuração das opções de e-mail
    const mailOptions = {
        from: '"Contato Escritório Rawlinson Rolim" <contato@rawlinsonrolimadv.com>',
        to: para.join(", "),
        subject: assunto,
        html: corpoHtml
    };

    // Envia o e-mail
    const resEmail = await transporter.sendMail(mailOptions);
    
    return resEmail;
}
