import { config } from '@/config'
import Stripe from 'stripe'
import { prisma } from '../database'

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async (input: {
  name?: string
  email: string
}) => {
  const customer = await getStripeCustomerByEmail(input.email)
  if (customer) return customer

  return stripe.customers.create({
    email: input.email,
    name: input.name,
  })
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
) => {
  try {
    const customer = await createStripeCustomer({
      email: userEmail,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'pix'],
      mode: 'subscription',
      client_reference_id: userId,
      customer: customer.id,
      success_url: `http://localhost:3000/app/settings/billing?success=true`, // mudar para URL de deploy depois
      cancel_url: `http://localhost:3000/app/settings/billing?success=false`, // mudar para URL de deploy depois
      line_items: [
        {
          price: config.stripe.plans.pro.priceId,
          quantity: 1,
        },
      ],
    })

    return {
      url: session.url,
    }
  } catch (error) {
    throw new Error('Error to create checkout session')
  }
}
