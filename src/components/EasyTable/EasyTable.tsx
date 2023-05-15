import type { TableProps } from "antd";
import { Divider, Space, Table } from "antd";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { ColumnType } from "antd/lib/table";
import IconFont from "@components/IconFont/IconFont";
import dayjs from "dayjs";
import utils from "@/utils";
import classNames from "classnames";

export type CustomQueryParams = {
  current: number;
  pageSize: number;
  filter?: Record<string, string>;
  sorter?: Record<string, "descend" | "ascend">;
};

export type ActionConfig<T extends Record<string, unknown>> = {
  title?: string;
  props?: ColumnType<T>;
  items?: Array<{
    text: string;
    disabled?: (record: T) => boolean;
    danger?: boolean | ((record: T) => boolean);
    visible?: (record: T) => boolean;
    className?: string;
    onClick?: (props: {
      onRefresh?: () => void;
      onReset?: () => void;
      record: T;
    }) => void;
  }>;
};
export type FilterConfig = {
  options: Array<{ text?: string; value: string }>;
  multiple?: boolean;
  value?: string[];
};

export type FormatterConfig<T extends Record<string, unknown>> = {
  type: "enum" | "datetime" | "currency" | "specifiedClassName" | "custom";
  hasUnit?: boolean;
  datetimeFormat?: string;
  capitalize?: boolean;
  enum?: Record<
    string,
    string | ((value: string | boolean | number) => ReactNode)
  >;
  render?: (record: T) => ReactNode;
};

export type CustomConfig<T extends Record<string, unknown>> = {
  filter?: Partial<Record<keyof T, FilterConfig>>;
  sorter?: Partial<Record<keyof T, "descend" | "ascend" | null>>;
  formatter?: Partial<Record<keyof T, FormatterConfig<T>> | undefined>;
  colEmptyText?: string;
  action?: ActionConfig<T>;
  onRefresh?: () => void;
  onReset?: () => void;
  filterSerialize?: (value: string[]) => string;
  onTableConditionChange?: (props: CustomQueryParams) => void;
};

function customFilterConfig<T>(
  filter: Record<string, FilterConfig> | undefined,
  columns: Array<ColumnType<T>>
) {
  if (filter) {
    Object.keys(filter).forEach((dataIndex) => {
      const targetColumn = columns.find((col) => col.dataIndex === dataIndex);
      if (targetColumn) {
        const config = filter[dataIndex];
        targetColumn.filters = config.options.map((opt) => ({
          value: opt.value,
          text: opt.text ?? opt.value,
        }));
        targetColumn.filterMultiple = config.multiple;
        targetColumn.filteredValue = config.value;
        targetColumn.filterIcon = (
          <IconFont type={"icon-filter"} className={"text-lg"} />
        );
      }
    });
  }
}

function customSorterConfig<T>(
  sorter: Record<string, "descend" | "ascend" | null> | undefined,
  columns: Array<ColumnType<T>>
) {
  if (sorter) {
    Object.keys(sorter).forEach((dataIndex) => {
      const targetColumn = columns.find((col) => col.dataIndex === dataIndex);
      if (targetColumn) {
        targetColumn.sorter = true;
        targetColumn.sortOrder = sorter[dataIndex];
      }
    });
  }
}

function customFormatterConfig<T extends Record<string, unknown>>(
  formatter: Record<string, FormatterConfig<T>> | undefined,
  columns: Array<ColumnType<T>>
) {
  if (formatter) {
    Object.keys(formatter).forEach((dataIndex) => {
      const targetColumn = columns.find((col) => col.dataIndex === dataIndex);
      if (targetColumn && !targetColumn.render) {
        const config = formatter[dataIndex];
        targetColumn.render = (value, record) => {
          const defaultOutput = config.capitalize
            ? utils.string.capitalizeFirstLetter(value)
            : value;
          if (config.type === "datetime") {
            return dayjs(value).format(
              config.datetimeFormat ?? "DD MMM YYYY HH:mm"
            );
          }
          if (config.type === "currency") {
            return utils.currency.format(value, {
              unit: config.hasUnit,
            });
          }
          if (config.type === "enum" && config.enum) {
            const matchValue = config.enum[value];
            if (typeof matchValue === "function") {
              return matchValue(value);
            } else {
              return matchValue;
            }
          }

          if (config.type === "specifiedClassName" && config.enum) {
            const matchValue = config.enum[value];
            if (typeof matchValue === "string") {
              return <span className={matchValue}>{defaultOutput}</span>;
            }
          }

          if (config.type === "custom" && config.render) {
            return config.render(record);
          }
          return defaultOutput;
        };
      }
    });
  }
}

function setColEmptyText<T>(
  colEmptyText: string | undefined,
  columns: Array<ColumnType<T>>
) {
  if (colEmptyText) {
    columns.forEach((col) => {
      if (col.render) {
        const originRender = col.render;
        col.render = (value, ...args) => {
          if (!value) {
            return colEmptyText;
          }
          return originRender(value, ...args);
        };
      }
    });
  }
}

function disabledCls<T>(item: any, record: T) {
  return item.disabled?.(record)
    ? "cursor-not-allowed"
    : "cursor-pointer hover:transition-opacity hover:text-opacity-75";
}

function textColorCls<T>(item: any, record: T) {
  if (typeof item.danger === "boolean" && item.danger) {
    return "text-error";
  }
  return item.danger?.(record) ? "text-error" : "text-primary";
}

function customActionConfig<T extends Record<string, unknown>>(
  action: ActionConfig<T>,
  colEmptyText: string | undefined,
  onRefresh: (() => void) | undefined,
  onReset: (() => void) | undefined,
  columns: Array<ColumnType<T>>
) {
  const actionCol: ColumnType<T> = {
    title: action.title ?? "Operation",
    ...action.props,
  };
  if (!actionCol.render && action.items) {
    actionCol.render = (value, record) => {
      const visibleItems = action.items?.filter((item) => {
        if (item.visible) {
          return item.visible(record);
        }
        return true;
      });
      if (!visibleItems || visibleItems.length === 0) {
        return colEmptyText;
      }
      return (
        <div>
          <Space split={<Divider type="vertical" />}>
            {visibleItems.map((item, index) => {
              return (
                <span
                  key={index}
                  className={classNames(
                    disabledCls(item, record),
                    textColorCls(item, record),
                    item.className
                  )}
                  onClick={() => {
                    item.onClick?.({
                      record,
                      onRefresh,
                      onReset,
                    });
                  }}
                >
                  {item.text}
                </span>
              );
            })}
          </Space>
        </div>
      );
    };
  }
  return columns.concat(actionCol);
}

function handleTableConditionChange<T>(
  onTableConditionChange:
    | ((props: {
        current: number;
        pageSize: number;
        filter?: Record<string, string>;
        sorter?: Record<string, "descend" | "ascend">;
      }) => void)
    | undefined,
  params: Parameters<Required<TableProps<T>>["onChange"]>,
  filterSerialize?: (value: string[]) => string
) {
  if (onTableConditionChange) {
    const paginationChange = params[0];
    const filterChange = params[1];
    const orderChange = Array.isArray(params[2]) ? params[2] : [params[2]];
    const changeParams: Parameters<typeof onTableConditionChange>[0] = {
      current: paginationChange.current ?? 1,
      pageSize: paginationChange.pageSize ?? 10,
    };
    changeParams.filter = Object.keys(filterChange).reduce<
      Record<string, string>
    >((obj, cur) => {
      const value = filterChange[cur];
      if (value) {
        obj[cur] = filterSerialize?.(value as string[]) ?? value.join(",");
      }
      return obj;
    }, {});
    changeParams.sorter = orderChange.reduce<
      Record<string, "descend" | "ascend">
    >((obj, cur) => {
      if (cur.order) {
        obj[cur.field as string] = cur.order;
      }
      return obj;
    }, {});
    onTableConditionChange(changeParams);
  }
}

export function EasyTable<T extends Record<string, unknown>>({
  filter,
  sorter,
  formatter,
  columns,
  colEmptyText,
  action,
  onReset,
  onRefresh,
  onTableConditionChange,
  onChange,
  filterSerialize,
  rowKey,
  pagination,
  ...tableProps
}: Omit<TableProps<T>, "columns"> &
  CustomConfig<T> & { columns?: Array<ColumnType<T>> }) {
  const advancedColumns = useMemo(() => {
    if (!columns) {
      return [];
    }
    customFilterConfig(filter as any, columns);
    customSorterConfig(sorter as any, columns);
    customFormatterConfig(formatter as any, columns);
    setColEmptyText(colEmptyText, columns);
    if (action) {
      return customActionConfig(
        action,
        colEmptyText,
        onRefresh,
        onReset,
        columns
      );
    }
    return columns;
  }, [
    columns,
    filter,
    sorter,
    formatter,
    colEmptyText,
    action,
    onReset,
    onRefresh,
  ]);
  return (
    <Table
      columns={advancedColumns}
      rowKey={rowKey ?? "uuid"}
      onChange={(...params) => {
        onChange?.(...params);
        handleTableConditionChange<T>(
          onTableConditionChange,
          params,
          filterSerialize
        );
      }}
      pagination={
        typeof pagination === "object"
          ? {
              position: ["bottomCenter"],
              showSizeChanger: false,
              ...pagination,
            }
          : pagination
      }
      {...tableProps}
    />
  );
}
