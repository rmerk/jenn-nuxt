import type { Environment } from 'square'
import { randomUUID } from 'node:crypto'
import { Client } from 'square'

const runtimeConfig = useRuntimeConfig()

const { paymentsApi } = new Client({
  accessToken: runtimeConfig.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox' as Environment,
})

// This is a workaround for a bug in the Square SDK
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default defineEventHandler(async (event) => {
  const { locationId, sourceId } = await readBody(event)

  try {
    const { result } = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: 100n,
        currency: 'USD',
      },
    })
    return result
  }
  catch (error) {
    console.log(error)
  }
})
