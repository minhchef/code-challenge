# List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
    1. ReactJS with TypeScript.
    2. Functional components.
    3. React Hooks
2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

```
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```


# Refactoring Highlights

1. Separation of Concerns

    - getPriority Function: Extracted as a standalone utility for easier testing.

    - Priority Mapping: Used a constant (BLOCKCHAIN_PRIORITY) for scalability.

2. Memoization

- Used useMemo for:

    - sortedBalances: Filters and sorts balances.

    - formattedBalances: Adds formatted amounts.

    - rows: Maps formatted balances to renderable rows.

3. Simplified Typing

    - Avoided React.FC<Props> to handle props more flexibly.

4. Easier Unit Testing: Utility functions and logic are decoupled from the component.

- Example:
```
# Test getPriority function:
import { getPriority } from './path-to-utils';

test('getPriority returns correct values', () => {
  expect(getPriority('Ethereum')).toBe(50);
  expect(getPriority('Unknown')).toBe(-99);
});

# Mock balances and prices:
jest.mock('./hooks', () => ({
  useWalletBalances: jest.fn(() => [
    { currency: 'USD', amount: 10, blockchain: 'Ethereum' },
  ]),
  usePrices: jest.fn(() => ({ USD: 1 })),
}));
```


## Summary of Improvements

- Utility Extraction: Simplified and reusable getPriority function.

- Memoization: Optimized computations for performance.

- Testing Simplification: Clear separation of logic for isolated testing.

- Type Safety: Improved flexibility by avoiding React.FC<Props>.