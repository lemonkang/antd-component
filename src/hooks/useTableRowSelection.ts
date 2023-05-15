import type { TableProps } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

type RowSelections<T> = Required<TableProps<T>>["rowSelection"];
export const useTableRowSelections = <T>({
  keyRetrieve,
  onChange,
  defaultRecord,
  dependencies,
  ...selectionProps
}: {
  keyRetrieve: (record: T) => React.Key;
  defaultRecord?: T[];
  dependencies?: unknown[];
} & RowSelections<T>) => {
  const [record, setRecord] = useState<T[]>([]);
  const keys = useMemo(() => {
    return record.map(keyRetrieve);
  }, [record, keyRetrieve]);
  useEffect(() => {
    if (defaultRecord) {
      setRecord(defaultRecord);
    }
  }, [defaultRecord]);
  useEffect(() => {
    config.emptyRecord();
  }, [...(dependencies ?? []), defaultRecord]);
  const config: RowSelections<T> & { record: T[]; emptyRecord: () => void } = {
    ...selectionProps,
    selectedRowKeys: keys,
    onChange: (_, record, __) => {
      onChange?.(_, record, __);
      setRecord(record);
    },
    record,
    emptyRecord: () => {
      setRecord([]);
    },
  };
  return config;
};
