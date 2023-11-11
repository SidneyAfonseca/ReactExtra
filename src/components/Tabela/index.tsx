import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export interface TableColumn<T> {
  accessor?: keyof T;
  head: string;
  isActionButton?: boolean;
  onActionClick?: (obj: T) => void;
}

interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: TableColumn<T>[];
}

export default function CustomTable<T extends Record<string, any>>(
  props: TableProps<T>
) {
  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {props.columns.map((column, index) => (
              <th key={index}>{column.head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              {props.columns.map((column, index) => (
                <td key={index}>
                  {column.isActionButton ? (
                    <button onClick={() => column.onActionClick?.(item)}>
                      {column.head}
                    </button>
                  ) : (
                    (item[column.accessor!] as ReactNode)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
