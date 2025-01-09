import { Select, Input, Typography, Space, Tooltip } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { useTokenSwap } from '~/hooks/useTokenSwap'
import icon from '~/services/stringService'

const { Option } = Select
const { Title } = Typography

const App = () => {
  const {
    tokens,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    error,
    setFromToken,
    setToToken,
    setFromAmount,
  } = useTokenSwap()

  return (
    <div className='w-full max-w-md flex text-white mt-5 mx-auto rounded-2xl'>
      <div className='w-full p-6 sm:p-6 bg-white rounded-lg shadow-lg'>
        <Title
          level={3}
          className='text-center text-gray-800 text-lg sm:text-xl'
        >
          {toAmount || '-'}
        </Title>

        {error && <div className='text-red-500 text-center mb-4'>{error}</div>}

        <Space direction='vertical' size='large' className='w-full'>
          <div className='relative flex flex-col sm:flex-row items-center gap-3'>
            <Select
              value={fromToken?.currency || ''}
              onChange={(value) => {
                const selected = tokens.find((t) => t.currency === value)
                setFromToken(selected || null)
              }}
              className='w-full text-sm sm:text-base'
              placeholder='Select a token'
            >
              {tokens.map((token) => (
                <Option key={token.currency} value={token.currency}>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={icon(token.currency)}
                      alt={token.currency}
                      className='w-6 h-6'
                    />
                    <span className='text-gray-800'>{token.currency}</span>
                  </div>
                </Option>
              ))}
            </Select>

            <Tooltip title='Swap Tokens'>
              <div
                onClick={() => {
                  setFromToken(toToken)
                  setToToken(fromToken)
                }}
                className='w-[30px] h-[30px] rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white hover:from-blue-500 hover:to-green-400 transition-all p-2 sm:p-3 shadow-lg cursor-pointer flex items-center justify-center'
              >
                <SwapOutlined className='transform hover:rotate-180 transition-transform duration-300 text-lg' />
              </div>
            </Tooltip>

            <Select
              value={toToken?.currency || ''}
              onChange={(value) => {
                const selected = tokens.find((t) => t.currency === value)
                setToToken(selected || null)
              }}
              className='w-full text-sm sm:text-base'
              placeholder='Select a token'
            >
              {tokens.map((token) => (
                <Option key={token.currency} value={token.currency}>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={icon(token.currency)}
                      alt={token.currency}
                      className='w-6 h-6'
                    />
                    <span className='text-gray-800'>{token.currency}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>

          <Input
            type='number'
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder='Amount'
            className='block w-full border-gray-300 p-2 sm:p-3 text-sm sm:text-base'
          />
        </Space>
      </div>
    </div>
  )
}

export default App
