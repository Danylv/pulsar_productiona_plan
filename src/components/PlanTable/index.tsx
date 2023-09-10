import {
  TableColumnDefinition,
  TableColumnId,
  Table,
  TableBody,
  TableCell,
  // TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  // createTableColumn,
  // useId,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  TableColumnSizingOptions,
  // PresenceBadgeStatus,
  // Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
// import {
//   DocumentRegular,
//   EditRegular,
//   FolderRegular,
//   OpenRegular,
//   VideoRegular,
//   DocumentPdfRegular,
//   PeopleRegular,
// } from "@fluentui/react-icons";
import * as React from "react";
import { useEffect, useState } from "react";
// import styles from "./styles.module.scss";
// import * from "../../configs/firebase.js"
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
    "https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/plan_data.json?auth=sRB7jdjPFoz38yQ9339pUHK0ID33f8t45K5UiK7Q",
    "get",
    null
  );

  //  const [data, setData] = useState([]);

  //   const removeColumn = (index: number) => {
  //     setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
  //   };

  //   const addColumn = () => {
  //     const currentColumnIds = columns.map(({ columnId }) => columnId);
  //     const missingColumnIndex = columnsDef.findIndex(
  //       ({ columnId }) => !currentColumnIds.includes(columnId)
  //     );
  //     if (missingColumnIndex !== -1) {
  //       const missingColumn = columnsDef[missingColumnIndex];
  //       setColumns((state) => [
  //         ...state.slice(0, missingColumnIndex),
  //         missingColumn,
  //         ...state.slice(missingColumnIndex),
  //       ]);
  //     }
  //   };

  //   const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     let newWidth = parseInt(e.target.value, 10);
  //     if (Number.isNaN(newWidth)) {
  //       newWidth = 0;
  //     }
  //     setColumnSizingOptions((state) => ({
  //       ...state,
  //       file: {
  //         ...state.file,
  //         defaultWidth: newWidth,
  //       },
  //     }));
  //   };

  //   const onMinWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     let newMinWidth = parseInt(e.target.value, 10);
  //     if (Number.isNaN(newMinWidth)) {
  //       newMinWidth = 0;
  //     }
  //     setColumnSizingOptions((state) => ({
  //       ...state,
  //       name: {
  //         ...state.name,
  //         minWidth: newMinWidth,
  //       },
  //     }));
  //   };

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

  //   const inputId = useId("first-column");

  useEffect(() => {
    // setData(prevData => [...prevData, device]);
    // console.log(data);
    if (plan !== null) {
      // const test:any =  Object.values(plan);

      setData(plan);
      // console.log(plan);
      // console.log(loading);
      // console.log(error);
      // console.log("New data arrived");
      // getOverallProducedPercent(plan);
      // setRefreshInterval(10000);
      setOverallProducedPercent(Number(getOverallProducedPercent(plan)));
      setRefreshInterval(10000);
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
              <TableRow key={item.name.label}>
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
        <div style={{display: "flex", fontSize: "1.5rem", flexDirection: "row", justifyContent: "space-between", marginLeft: "20px", marginRight: "60px", marginTop: "20px"}}>
                  <div><span style={{fontFamily: "Tahoma, sans-serif", color: "#0077c1"}}>Updated:</span></div>
                  <div><span style={{fontFamily: "Tahoma, sans-serif", color: "#0077c1"}}>Overall: {overallProducedPercent}%</span></div>
        </div>
      </>
    );
  }
};
