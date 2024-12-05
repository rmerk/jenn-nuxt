import { Client, Environment } from 'square'
import { defineEventHandler } from 'h3'

const square = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { items } = body

    const lineItems = items.map(item => ({
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(item.price * 100),
        currency: 'USD'
      },
      name: item.name
    }))

    const response = await square.checkoutApi.createPaymentLink({
      quickPay: {
        name: 'Sweet Delights Bakery Order',
        priceMoney: {
          amount: BigInt(items.reduce((sum, item) => sum + (item.price * item.quantity * 100), 0)),
          currency: 'USD'
        }
      },
      order: {
        lineItems
      }
    })

    if (response.result.paymentLink) {
      return {
        payment_link: response.result.paymentLink.url
      }
    } else {
      throw new Error('Failed to create payment link')
    }
  } catch (error) {
    console.error('Square API Error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to create checkout session'
    })
  }
})