import { useCallback } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { AppInfoResponse } from './types';
import { Arguments } from 'swr';

export function useAppInfoList(
  query: string,
  pageSize: number,
  queryType: 'regex' | 'q' = 'q'
) {
  const getKey: SWRInfiniteKeyLoader<any, Arguments> = useCallback(
    (pageIndex) => {
      let param = new URLSearchParams();
      param.append('per', pageSize.toString());
      param.append('page', (pageIndex + 1).toString());
      param.append(queryType, query);
      return `/appinfo?${param}`;
    },
    [queryType, pageSize, query]
  );
  return useSWRInfinite<AppInfoResponse>(getKey, {
    initialSize: 1,
  });
}
