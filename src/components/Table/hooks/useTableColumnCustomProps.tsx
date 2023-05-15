import { Button, Input, Space } from "antd";
import type { ColumnType } from "antd/lib/table";
import IconFont from "@components/IconFont/IconFont";
import classNames from "classnames";

function useTableColumnCustomProps<T>() {
  const getColumnSearchProps = (props?: {
    placeholder?: string;
    searchText?: string;
  }): ColumnType<T> => {
    const { searchText, placeholder } = { searchText: "Search", ...props };
    return {
      filterDropdown({ selectedKeys, setSelectedKeys, confirm, clearFilters }) {
        const value = selectedKeys[0];
        return (
          <div className={"w-72 p-3"}>
            <Input
              value={value}
              onChange={(e) => {
                setSelectedKeys([e.target.value || ""]);
              }}
              placeholder={placeholder}
            />
            <div className="flex justify-end mt-2">
              <Space>
                <Button
                  size={"small"}
                  onClick={() => {
                    confirm();
                  }}
                  type={"primary"}
                >
                  {searchText}
                </Button>
                <Button
                  onClick={() => {
                    clearFilters?.();
                    confirm();
                  }}
                  size={"small"}
                >
                  Reset
                </Button>
              </Space>
            </div>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <IconFont
          type={"icon-search"}
          className={classNames(
            filtered ? "text-primary" : undefined,
            "text-sm"
          )}
        />
      ),
    };
  };

  const getColumnFiltersProps = ({
    filters,
    multiple,
  }: {
    filters: ColumnType<T>["filters"];
    multiple?: ColumnType<T>["filterMultiple"];
  }): ColumnType<T> => {
    return {
      filterMultiple: multiple,
      filters,
      filterIcon: (filtered) => (
        <IconFont
          type={"icon-arrow-down"}
          className={classNames(
            filtered ? "text-primary" : undefined,
            "text-sm"
          )}
        />
      ),
    };
  };

  return {
    getColumnSearchProps,
    getColumnFiltersProps,
  };
}

export default useTableColumnCustomProps;
