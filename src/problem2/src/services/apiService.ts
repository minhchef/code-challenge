export interface Token {
    currency: string
    date: string
    price: number
}

const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json')

    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.status}`)
    }

    const tokensResponse = await response.json()
    return tokensResponse
  } catch (error) {
    console.error('Error fetching tokens:', error)
    throw new Error('Unable to fetch token data. Please try again later.')
  }
}

export default fetchTokens
