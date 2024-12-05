import { defineEventHandler } from 'h3'
import { Client, Environment } from 'square'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { sourceId, amount, items } = body

    const payment = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'USD'
      },
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
      note: `Order for ${items.map(item => `${item.quantity}x ${item.name}`).join(', ')}`
    })

    return {
      success: true,
      payment: payment.result.payment
    }
  } catch (error) {
    console.error('Payment processing error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})