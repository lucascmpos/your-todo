import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'
import nodemailer from 'nodemailer'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app',
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url)
        const newUrl = url.replace(host, 'https://yourtodos.vercel.app') // Mudar para URL do DEPLOY

        const transporter = nodemailer.createTransport(server)

        const message = {
          to: email,
          from,
          subject: 'Faça seu Login em Your Todo',
          text: `Faça seu Login em Your Todo: ${newUrl}`,
          html: `<body style="background: #f9f9f9;">
          <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
              <tr>
                  <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
                      Faça seu Login em <strong>Your Todo</strong>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 20px 0;">
                      <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 5px;" bgcolor="#346df1"><a href=${newUrl} target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #346df1; display: inline-block; font-weight: bold;">Entrar
                                     </a></td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
                     Olá! Obrigado por testar a minha plataforma! Clique no link abaixo e faça login na Your Todo. Atenciosamente, Lucas Campos.
                     Se você desconhece a minha plataforma, pode ignorar esse email.
                  </td>
              </tr>
          </table>
      </body>`,
        }

        transporter.sendMail(message, (error) => {
          if (error) {
            console.error('Error sending email: ', error)
          } else {
            console.log('Verification email sent')
          }
        })
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        name: message.user.name as string,
        email: message.user.email as string,
      })
    },
  },
})
