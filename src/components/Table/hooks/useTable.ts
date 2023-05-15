import { useAntdTable } from "ahooks";
import type { SorterResult } from "antd/es/table/interface";
import type { TWithPagination } from "@/global-types";

export type TableOptions = Parameters<typeof useAntdTable>[1];
export type TableService = Parameters<typeof useAntdTable>[0];
export type TableSearchParams<T> = {
  current: number;
  pageSize: number;
  sorter?: SorterResult<T>;
  filters?: Partial<Record<keyof T, string[]>>;
};

export type TableResult<T> = {
  total: number;
  list: T[];
};

const useTable = <T>(
  service: (
    params: TableSearchParams<T>,
    formData?: any
  ) => Promise<TWithPagination<T>>,
  options?: TableOptions
) => {
  return useAntdTable(async (params, formData) => {
    const { count, results } = await service(params, formData);
    return {
      total: count,
      list: results,
    };
  }, options as any);
};

export default useTable;
