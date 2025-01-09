import { useEffect, useState } from 'react'
import fetchTokens, { Token } from '~/services/apiService'

export function useTokenSwap() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokenData = await fetchTokens()
        setTokens(
          tokenData.reduce((acc: Token[], token) => {
            if (
              !acc.some(
                (existing: Token) => existing.currency === token.currency
              )
            ) {
              acc.push(token)
            }
            return acc
          }, [])
        )
        setFromToken(tokenData[0])
        setToToken(tokenData[1])
      } catch (err: any) {
        setError(err.message || 'Failed to load tokens')
      }
    }

    loadTokens()
  }, [])

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const calculatedToAmount =
        (parseFloat(fromAmount) * fromToken.price) / toToken.price
      setToAmount(calculatedToAmount.toFixed(6))
    } else {
      setToAmount('')
    }
  }, [fromToken, toToken, fromAmount])

  return {
    tokens,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    error,
    setFromToken,
    setToToken,
    setFromAmount,
  }
}
