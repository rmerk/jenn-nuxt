import type { Environment } from 'square'
import { randomUUID } from 'node:crypto'
import { Client } from 'square'

const runtimeConfig = useRuntimeConfig()

const { paymentsApi } = new Client({
  accessToken: runtimeConfig.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox' as Environment,
})

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
    return JSON.parse(JSON.stringify(result, bigIntToJSON))
    return result
  }
  catch (error) {
    console.log(error)
  }
})
