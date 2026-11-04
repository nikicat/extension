import { useMemo } from 'react';

import { isDefined } from '@leather.io/utils';

import { useGetRunesOutputsByAddressQuery } from './runes-outputs-by-address.query';
import { useGetRunesTickerInfoQuery } from './runes-ticker-info.query';
import { useGetRunesWalletBalancesByAddressesQuery } from './runes-wallet-balances.query';

// ponytail: runes data came from leatherapi.bestinslot.xyz, which no longer resolves;
// off until there is a working runes API.
export function useRunesEnabled() {
  return false;
}

export function useRuneTokens(addresses: string[]) {
  const runesBalances = useGetRunesWalletBalancesByAddressesQuery(addresses)
    .flatMap(query => query.data)
    .filter(isDefined);

  const results = useGetRunesTickerInfoQuery(runesBalances);

  return useMemo(() => {
    const isLoading = results.some(query => query.isLoading);
    const runes = results.map(query => query.data).filter(isDefined);

    return { isLoading, runes };
  }, [results]);
}

export function useRunesOutputsByAddress(address: string) {
  return useGetRunesOutputsByAddressQuery(address);
}
