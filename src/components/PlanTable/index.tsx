import {
  TableColumnDefinition,
  TableColumnId,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  TableColumnSizingOptions,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import * as React from "react";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {DefaultSpinner} from "../Spinner";
import "./config";
import {Item, items, columnsDef, getOverallProducedPercent} from "./config";


export const PlanTable = () => {
  const [sortState, setSortState] = React.useState<{
    sortDirection: "ascending" | "descending";
    sortColumn: TableColumnId | undefined;
  }>({
    sortDirection: "ascending" as const,
    sortColumn: "name",
  });
  
  const [data, setData] = useState<Item[]>(items);
  const [overallProducedPercent, setOverallProducedPercent] = useState(0);
  const [columns] = useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      name: {
        defaultWidth: 350,
        minWidth: 250,
      },
      cecode: {
        minWidth: 200,
        defaultWidth: 200,
      },
      produced: {
        minWidth: 200,
      },
      lacks: {
        minWidth: 150,
      },
      inplan: {
        minWidth: 150,
      },
      producedPercent: {
        defaultWidth: 80,
        minWidth: 80,
      },
    });

  const [loading, error, plan, setRefreshInterval] = useAxios(
    "http://localhost:5000/",
    "get",
    null
  );

  const onColumnResize = React.useCallback(
    (_: any, { columnId, width }: any) => {
      setColumnSizingOptions((state) => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          defaultWidth: width,
        },
      }));
    },
    []
  );

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    columnSizing_unstable: columnSizing,
    tableRef,
  } = useTableFeatures(
    {
      columns,
      items: data,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions, onColumnResize }),
      // useTableSort({
      //   defaultSortState: { sortColumn: "name", sortDirection: "ascending" },
      // }),
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  useEffect(() => {
    if (plan !== null) {
      setData(plan);
      setOverallProducedPercent(Number(getOverallProducedPercent(plan)));
      setRefreshInterval(100000);
    }
  }, [plan]);

  if (error != null) {
    return (<>{JSON.stringify(error)}</>);
  }
  else if (loading) {
    return (
      <>
      <DefaultSpinner size="extra-large" label={'Loading data...'}/>
      </>
      );
  }
   else {
    return (
      <>
        <Table
          size="medium"
          sortable
          aria-label="Table with sort"
          ref={tableRef}
        >
          <TableHeader
            style={{ fontSize: "2.2rem", fontFamily: "Tahoma, sans-serif" }}
          >
            <TableRow>
              {columns.map((column) => (
                <Menu openOnContext key={column.columnId}>
                  <MenuTrigger>
                    <TableHeaderCell
                      key={column.columnId}
                      {...columnSizing.getTableHeaderCellProps(column.columnId)}
                      {...headerSortProps(column.columnId)}
                    >
                      {column.renderHeaderCell()}
                    </TableHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem
                        onClick={columnSizing.enableKeyboardMode(
                          column.columnId
                        )}
                      >
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ item }) => (
              <TableRow key={item.name}>
                {columns.map((column) => (
                  <TableCell
                    key={column.columnId}
                    {...columnSizing.getTableCellProps(column.columnId)}
                  >
                    {column.renderCell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{display: "flex", fontSize: "1.5rem", flexDirection: "row", justifyContent: "space-between", marginLeft: "20px", marginRight: "60px", marginTop: "20px", marginBottom: "20px"}}>
                  <div><span style={{fontFamily: "Tahoma, sans-serif", color: "#0077c1"}}>Updates every 5 minutes</span></div>
                  <div><span style={{fontFamily: "Tahoma, sans-serif", color: "#0077c1"}}>Overall: {overallProducedPercent}%</span></div>
        </div>
      </>
    );
  }
};
