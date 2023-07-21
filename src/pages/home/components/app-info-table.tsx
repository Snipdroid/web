import { useAppInfoList } from '@/data';
import { AppInfoItem } from '@/data/app-info/types';
import { store } from '@/store';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  // @ts-ignore
  InlineLoading,
} from '@carbon/react';
import React, { useEffect, useMemo, useRef } from 'react';

const headerData = [
  {
    key: 'appName',
    header: 'App Name',
  },
  {
    key: 'packageName',
    header: 'Package Name',
  },
  {
    key: 'activityName',
    header: 'Main Activity',
  },
];

export const AppInfoTable = () => {
  const searchValue = store.use.searchValue();
  const { data, size, setSize, isLoading, isValidating } = useAppInfoList(
    searchValue,
    30
  );

  const flattenedData = useMemo(() => {
    const result: AppInfoItem[] = [];
    data?.forEach((pageData, page) => {
      pageData.items.forEach((item) => {
        result.push(item);
      });
    });
    return result;
  }, [data]);

  const totalResultCount = useMemo(() => {
    if (!Boolean(data?.length) || !data) {
      return Infinity;
    } else {
      return data[0].metadata.total;
    }
  }, [data, searchValue]);

  const allDataLoaded = useMemo(() => {
    if (isLoading) {
      return false;
    }
    return flattenedData.length === totalResultCount;
  }, [flattenedData, data, isLoading]);

  const loadingRef = useRef<HTMLDivElement>(null);
  const allowLoadingMoreLock = useRef(true);

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (
            allDataLoaded ||
            !allowLoadingMoreLock.current ||
            isValidating ||
            !data
          ) {
            return;
          }
          allowLoadingMoreLock.current = false;
          await setSize((size) => size + 1);
          allowLoadingMoreLock.current = true;
        }
      });
    });
    observer.observe(loadingRef.current!);
    return () => {
      observer.disconnect();
    };
  }, [allDataLoaded, isValidating, data]);

  return (
    <div className="w-200" style={{ width: '800px' }}>
      <DataTable
        key={searchValue}
        rows={flattenedData}
        headers={headerData}
        isSortable={false}
      >
        {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
          <TableContainer
            title="Search Result"
            description={
              isLoading ? 'searching ...' : `${totalResultCount} apps`
            }
          >
            <div>
              {!data && isLoading && !allDataLoaded && (
                <div className="flex justify-center w-full h10">
                  <div>
                    <InlineLoading />
                  </div>
                </div>
              )}

              <Table
                {...getTableProps()}
                useZebraStyles={false}
                size="lg"
                key={searchValue}
                className="overflow-hidden w-200"
                style={{
                  width: '800px',
                }}
                hidden={!data}
              >
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.header}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody className="w-200">
                  {rows.map((row) => {
                    return (
                      <TableRow
                        {...getRowProps({ row })}
                        key={row.id + `-size-${size}`}
                      >
                        {row.cells.map((cell, index) => {
                          return (
                            <TableCell
                              className="truncate"
                              key={cell.id + '_cell'}
                            >
                              {cell.value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div
                ref={loadingRef}
                className="flex justify-center items-center w-full h10"
              >
                <div
                  style={{
                    display: data ? 'block' : 'none',
                  }}
                >
                  {allDataLoaded ? (
                    <div className="text-gray">
                      all data loaded, loaded: {flattenedData.length}, total:
                      {totalResultCount}
                    </div>
                  ) : (
                    <InlineLoading />
                  )}
                </div>
              </div>
            </div>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};
