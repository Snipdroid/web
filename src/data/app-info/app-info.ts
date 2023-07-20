import { useCallback } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { AppInfoResponse } from './types';
import { Arguments } from 'swr';

export function useAppInfoList(
  query: string,
  pageSize: number,
  queryType: 'regex' | 'string' = 'string'
) {
  const getKey: SWRInfiniteKeyLoader<any, Arguments> = useCallback(
    (pageIndex) => {
      return queryType === 'string'
        ? `/api/appinfo?q=${query}&per=${pageSize}&page=${pageIndex}`
        : `/api/appinfo?regex=${query}&per=${pageSize}&page=${pageIndex}`;
    },
    [queryType, pageSize, query]
  );
  return useSWRInfinite<AppInfoResponse>(getKey, {
    initialSize: 1,
  });
}
