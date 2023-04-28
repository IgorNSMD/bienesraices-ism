const nodemailer = require('nodemailer')


const emailRegister = async(data) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      console.log(data)
      const { name,email,token } = data

      //enviar el correo
      await transport.sendMail({
        from: 'Eglobalin.com',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text: 'Confirma tu cuenta',
        html:`
            <p> Hola ${ name }, comprueba tu cuenta en Bienes Raices.. </p>
            <p> Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace
              <a href="${ process.env.BACKEND_URL }:${ process.env.PORT ?? 3000 }/auth/confirm/${ token }"> Confirmar cuenta </a>
            </p>
            <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
      })

}

const emailRecoverPassword = async(data) =>{
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log(data)
    const { name,email,token } = data

    //enviar el correo
    await transport.sendMail({
      from: 'Eglobalin.com',
      to: email,
      subject: 'Reestablecer tu password en Bienes Raices',
      text: 'Reestablecer tu password',
      html:`
          <p> Hola ${ name }, haz solicitado reestablecer tu contraseña en Bienes Raices.. </p>
          <p> Sigue el siguiente enlace para generar nueva contraseña
            <a href="${ process.env.BACKEND_URL }:${ process.env.PORT ?? 3000 }/auth/recover-password/${ token }"> Reestablecer Contraseña </a>
          </p>
          <p>Si no solicitaste el cambio de password, puedes ignorar este mensaje</p>
      `
    })

}

module.exports =  {
    emailRegister,
    emailRecoverPassword
}