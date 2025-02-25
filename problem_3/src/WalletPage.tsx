import React, { useEffect, useMemo, useState } from 'react';
import { WalletBalance } from './WalletBalance';
import { FormattedWalletBalance } from './FormattedWalletBalance';
import { Datasource } from './Datasource';

  interface BoxProps {
    children?: React.ReactNode;
  }
  
  // BoxProps interface not implemented
  interface Props extends BoxProps {
  
  }

  // useWalletBalances hook not implemented
    const useWalletBalances = () => {
        return [];
    }

        // WalletRow implementation 
        const WalletRow: React.FC<{amount: number, usdValue: number, formattedAmount: string }> = (props) => {
          const { amount, usdValue, formattedAmount } = props;
          return (
            <div>
              <div>{formattedAmount}</div>
              <div>{amount}</div>
              <div>{usdValue}</div>
            </div>
          )
        }
  

  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();

    // prices state is initialized with an empty object/price
    // proces should be initialized as an object with string keys and number values so that prices[balance.currency] does not throw an error
      const [prices, setPrices] = useState<{ [key: string]: number }>({});
  
    /*
    on component mount, fetch prices from datasource
    set prices state with fetched prices
    handle error if any
    */

      useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        // handle error, it is supposed to be console.error and not console.err which is not a function
        console.error(error);
      });
    }, []);


    /* 
    getPriority function is used to assign priority to each blockchain
    based on the blockchain, a priority is assigned
    this priority is used to sort balances
    balances are sorted based on the priority assigned to each blockchain
    balances with amount less than or equal to 0 are filtered out 
    */

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
  
      /*
        sortedBalances is filtered based on the amount
        balances with amount less than or equal to 0 are filtered out
        sortedBalances is sorted based on the priority assigned to each blockchain
      */
      const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {

            // balance.blockchain is used but not defined
            const balancePriority = getPriority(balance.blockchain);
            
            // lhsPriority is used but not defined

            // lhsPriority should be balancePriority
            if (balancePriority > -99) {
                // balance.amount <= 0 should be balance.amount > 0 as we want to filter out balances with amount less than or equal to 0
               if (balance.amount > 0) {
                 return true;
               }
            }
            return false

          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {

            //
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }

            // ensures that comparator always returns a value even if leftPriority and rightPriority are equal
            return 0;
      });

    }, [balances, prices]);
  
    // formattedBalances is used to format the balances
    // balances are formatted to 2 decimal places
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        // balance.amount.toFixed(2) is used to format the amount to 2 decimal places
        formatted: balance.amount.toFixed(2)
      }
    })
  
    /*
    create rows of wallet balances
    rows are created based on the sortedBalances
    usdValue is calculated by multiplying the amount with the price of the currency
    WalletRow component is used to display the wallet balances
    WalletRow component is passed the amount, usdValue and formattedAmount
    WalletRow component is passed the className prop
    */

    // formattedBalances should be used instead of sortedBalances so that the formatted amount is used
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      // prices[balance.currency] is used to get the price of the currency
      // type of prices is not defined and thus typescript will throw an error
      // prices should be defined as an object with string keys and number values so that prices[balance.currency] does not throw an error
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        // WalletRow component is not implemented
        <WalletRow 
        // className prop is not defined
        // className prop should be defined and passed to the WalletRow component
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

  export default WalletPage;