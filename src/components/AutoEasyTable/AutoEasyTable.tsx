import type { CustomQueryParams } from "@components/EasyTable/EasyTable";
import { EasyTable } from "@components/EasyTable/EasyTable";
import type { ComponentProps } from "react";
import type { AxiosRequestConfig } from "axios";
import type { EventEmitter } from "ahooks/lib/useEventEmitter";
import { useEventEmitter, useRequest } from "ahooks";
import request from "@apis/request/request";
import { memo, useEffect, useMemo, useState } from "react";
import type { TWithPagination } from "@/global-types";
import { message } from "antd";
import { shallowCompare } from "@components/AutoEasyTable/utils";

type EasyTableProps<T extends Record<string, unknown>> = ComponentProps<
  typeof EasyTable<T>
>;

type AutoTableProps<T> = {
  url?: string;
  defaultQuery?: Record<string, string | boolean | number | null | undefined>;
  responseToTableData?: (response: TWithPagination<T>) => T[];
  customAxiosConfig?: AxiosRequestConfig;
  onError?: (e: Error) => void;
  onSuccess?: (data: TWithPagination<T>) => void;
  mute?: boolean;
  table$?: EventEmitter<"refresh" | "reset">;
  requestOptions?: {
    staleTime?: number;
    cacheKey?: string;
    cacheTime?: number;
  };
};

export const useAutoEasyTable = () => {
  return useEventEmitter<"refresh" | "reset">();
};
// AutoEasyTable.useAutoEasyTable = useAutoEasyTable;
export function AutoEasyTable<T extends Record<string, unknown>>({
  url,
  defaultQuery,
  customAxiosConfig,
  responseToTableData,
  onSuccess,
  onError,
  mute = true,
  table$,
  pagination: outerPagination,
  requestOptions,
  ...easyTableProps
}: EasyTableProps<T> & AutoTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [tableQueryParams, setTableQueryParams] = useState<
    CustomQueryParams | undefined
  >();
  const [total, setTotal] = useState<number>();
  const queryParams = useMemo(() => {
    return {
      page: tableQueryParams?.current ?? 1,
      pageSize: tableQueryParams?.pageSize ?? 10,
      ...tableQueryParams?.filter,
      ...tableQueryParams?.sorter,
      ...defaultQuery,
    };
  }, [defaultQuery, tableQueryParams]);

  useEffect(() => {
    setData([]);
    setTableQueryParams(undefined);
  }, [url, defaultQuery]);

  const { loading, refresh } = useRequest(
    async () => {
      return await request.custom<TWithPagination<T>>({
        url,
        method: "GET",
        params: queryParams,
        ...customAxiosConfig,
      });
    },
    {
      ...requestOptions,
      debounceWait: 500,
      ready: Boolean(url),
      refreshDeps: [url, queryParams, customAxiosConfig],
      onSuccess(data) {
        const tableData = responseToTableData?.(data) ?? data.results;
        setData(tableData);
        setTotal(data.count);
        onSuccess?.(data);
      },
      onError(e) {
        onError?.(e);
        if (!mute) {
          message.error(e.message);
        }
      },
    }
  );
  table$?.useSubscription((val) => {
    if (val === "refresh") {
      refresh();
    } else {
      setTableQueryParams(undefined);
    }
  });

  const pagination = usePagination(total, tableQueryParams, outerPagination);
  return (
    // eslint-disable-next-line
    // @ts-ignore
    <EasyTable<T>
      {...easyTableProps}
      loading={loading}
      dataSource={data}
      onTableConditionChange={setTableQueryParams}
      pagination={pagination}
    />
  );
}

// https://stackoverflow.com/questions/60386614/how-to-use-props-with-generics-with-react-memo
export const AutoEasyTableMemo = (
  keys: Array<keyof ComponentProps<typeof AutoEasyTable>>
) => {
  return memo(AutoEasyTable, (prev, current) => {
    return shallowCompare(prev, current, keys);
  }) as typeof AutoEasyTable;
};

const usePagination = (
  total: number | undefined,
  tableQueryParams: CustomQueryParams | undefined,
  outerPaginationProps: EasyTableProps<any>["pagination"]
) => {
  return useMemo<EasyTableProps<any>["pagination"]>(() => {
    if (typeof outerPaginationProps === "boolean" && !outerPaginationProps) {
      return false;
    }
    return {
      total,
      current: tableQueryParams?.current ?? 1,
      pageSize: tableQueryParams?.pageSize ?? 10,
    };
  }, [total, outerPaginationProps, tableQueryParams]);
};
