export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1PP9x4E4WQPSJqlURc7qBtsm',
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: 'price_1PP9xPE4WQPSJqlU5XzfIQ4V',
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}