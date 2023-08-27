import {
  TableColumnDefinition,
  TableColumnId,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useId,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  TableColumnSizingOptions,
  PresenceBadgeStatus,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  VideoRegular,
  DocumentPdfRegular,
  PeopleRegular,
} from "@fluentui/react-icons";
import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.scss" 

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "name",
    renderHeaderCell: () => <>Name</>,
    renderCell: (item: Item) => (
        <TableCellLayout
        truncate
        media={
          <Avatar
            name={item.name.label}
            badge={{ status: item.name.status as PresenceBadgeStatus }}
          />
        }
      >
        {item.cecode.label}
      </TableCellLayout>
     
    ),

    compare: (a, b) => {
      return a.name.label.localeCompare(b.name.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "cecode",
    renderHeaderCell: () => <>Cecode</>,
    renderCell: (item: Item) => (
      <TableCellLayout
        truncate
        // media={
        //   <Avatar
        //     name={item.cecode.label}
        //     badge={{ status: item.cecode.status as PresenceBadgeStatus }}
        //   />
        // }
      >
        {item.cecode.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.cecode.label.localeCompare(b.cecode.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "produced",
    renderHeaderCell: () => <>Produced</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate>{item.produced.label}</TableCellLayout>
    ),
    compare: (a, b) => {
      return a.produced.timestamp - b.produced.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: "lacks",
    renderHeaderCell: () => <>Lacks</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.lacks.icon}>
        {item.lacks.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.lacks.label.localeCompare(b.lacks.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "inplan",
    renderHeaderCell: () => <>Inplan</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.inplan.icon}>
        {item.inplan.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.inplan.label.localeCompare(b.inplan.label);
    },
  }),
];

type FileCell = {
  label: string;
  icon: JSX.Element;
  status?: PresenceBadgeStatus;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
  status?: PresenceBadgeStatus;
};

type LastUpdateCell = {
  label: string;
  icon?: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  name: FileCell;
  cecode: AuthorCell;
  produced: LastUpdatedCell;
  lacks: LastUpdateCell;
  inplan: LastUpdateCell;
  status?: FileCell;
};

const items: Item[] = [
  {
    name: { label: "Thermion XP50 Pro", icon: <DocumentRegular /> },
    cecode: { label: "00.20178", status: "available" },
    produced: { label: "56", timestamp: 3 },
    lacks: {
      label: "744",
      icon: <EditRegular />,
    },
    inplan: { label: "800" },
  },
  {
    name: { label: "Thermion LRF XQ50 Pro", icon: <FolderRegular /> },
    cecode: { label: "00.45098", status: "busy" },
    produced: { label: "123", timestamp: 2 },
    lacks: {
      label: "677",
      icon: <OpenRegular />,
    },
    inplan: { label: "800" },
  },
  {
    name: { label: "Thermion DXP55", icon: <VideoRegular /> },
    cecode: { label: "00.23017", status: "away" },
    produced: { label: "145", timestamp: 2 },
    lacks: {
      label: "655",
      icon: <OpenRegular />,
    },
    inplan: { label: "800" },
  },
  {
    name: { label: "Talion XG38", icon: <DocumentPdfRegular /> },
    cecode: { label: "00.11012", status: "offline" },
    produced: { label: "223", timestamp: 1 },
    lacks: {
      label: "577",
      icon: <PeopleRegular />,
    },
    inplan: { label: "800" },
  },
];

export const Sort = () => {
  const [columns] =
    useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      name: {
        defaultWidth: 300,
        minWidth: 190,
      },
      cecode: {
        minWidth: 170,
        defaultWidth: 250,
      },
      produced: {
        minWidth: 220,
      },
      lacks: {
        minWidth: 220,
      },
      inplan: {
        minWidth: 220,
      },
    });

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
      items,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions, onColumnResize }),
      useTableSort({
        defaultSortState: { sortColumn: "name", sortDirection: "ascending" },
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

  return (
    <>
      <Table size="medium" sortable aria-label="Table with sort" ref={tableRef}>
        <TableHeader style={{fontSize: "2rem", color: "#0077c1", fontFamily: "Tahoma, sans-serif"}}>
          <TableRow>
            {columns.map((column, index) => (
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
                      onClick={columnSizing.enableKeyboardMode(column.columnId)}
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
    </>
  );
};
