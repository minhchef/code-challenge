import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

/**
 * Extracted priority mapping to a constant for better scalability and readability
 */
const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

/**
 * Helper function to get priority based on the blockchain
 */
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? -99;
};

/**
 * Changed React.FC<Props> to (props: Props)
 * Reason: Using React.FC<Props> implicitly includes the `children` prop, 
 * which can cause type conflicts or issues when spreading props (e.g., <WalletPage {...props} />).
 */
const WalletPage = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /**
   * Memoized sorted balances based on priority and positive amounts
   */
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances]);

  /**
   * Memoized formatted balances to include a formatted amount
   */
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  }, [sortedBalances]);

  /**
   * Memoized rows for rendering
   */
  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      const usdValue = prices[balance.currency] * balance.amount || 0;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency} // Ensures stable and unique keys
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
