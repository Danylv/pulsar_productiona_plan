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
  // useId,
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
import styles from "./styles.module.scss" 
// import * from "../../configs/firebase.js"
import useAxios from "../../hooks/useAxios";

function getProducedPercent(produced:any , inplan:any) {
  let result = 100 + (100*(produced - inplan) / inplan)
  return result.toFixed(0);
}

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "name",
    renderHeaderCell: () => <span style={{color: "#0077c1", margin: "10px"}}>Name</span>,
    renderCell: (item: Item) => (
        <TableCellLayout
        // truncate
        media={
          <Avatar
            color="royal-blue"
            name={item.name.label}
            // badge={{ status: item.name.status as PresenceBadgeStatus }}
          />
        }
      >
        {item.name.label}
      </TableCellLayout>
     
    ),

    compare: (a, b) => {
      return a.name.label.localeCompare(b.name.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "cecode",
    renderHeaderCell: () => <span style={{color: "#0077c1"}}>CE code</span>,
    renderCell: (item: Item) => (
      <TableCellLayout
        // truncate
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
    renderHeaderCell: () => <span style={{color: "#0077c1"}}>Produced</span>,
    renderCell: (item: Item) => (
      <TableCellLayout style={{color: "green" }}>{item.produced.label}</TableCellLayout>
    ),
    compare: (a, b) => {
      return Number(a.produced.label) - Number(b.produced.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "lacks",
    renderHeaderCell: () => <span style={{color: "#0077c1"}}>Lacks</span>,
    renderCell: (item: Item) => (
      <TableCellLayout style={{color: "red"}}>
        {Number(item.inplan.label)- Number(item.produced.label)}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.lacks.label.localeCompare(b.lacks.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "inplan",
    renderHeaderCell: () => <span style={{color: "#0077c1"}}>Inplan</span>,
    renderCell: (item: Item) => (
      // <TableCellLayout media={item.inplan.icon}>
      <TableCellLayout>
        {item.inplan.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.inplan.label.localeCompare(b.inplan.label);
    },
  }),

createTableColumn<Item>({
  columnId: "producedPercent",
  renderHeaderCell: () => <span style={{color: "#0077c1"}}>%</span>,
  renderCell: (item: Item) => (
    <TableCellLayout >
      {getProducedPercent(item.produced.label, item.inplan.label)}%
    </TableCellLayout>
  ),

  compare: (a, b) => {
    return Number(a.produced.label) - Number(b.produced.label);
  },
}),
];

type NameCell = {
  label: string;
};

type ProducedCell = {
  label: string;
  timestamp: number;
}

type InPlanCell = {
  label: string;

  status?: PresenceBadgeStatus;
};

type LackCell = {
  label: string;
};

type CeCodeCell = {
  label: string;
};

type Item = {
  name: NameCell;
  cecode: CeCodeCell;
  produced: ProducedCell;
  lacks: LackCell;
  inplan: InPlanCell;
};

const items: Item[] = [
  {
    name: { label: "Thermion XP50 Pro"},
    cecode: { label: "00.20178" },
    produced: { label: "56", timestamp: 4 },
    lacks: {
      label: "744",
    },
    inplan: { label: "800" },
  },
  {
    // name: { label: "Thermion LRF XQ50 Pro", icon: <FolderRegular /> },
    name: { label: "Thermion LRF XQ50 Pro" },
    cecode: { label: "00.45098" },
    produced: { label: "123", timestamp: 2 },
    lacks: {
      label: "677",
    },
    inplan: { label: "800" },
  },
  {
    name: { label: "Thermion DXP55" },
    cecode: { label: "00.23017"},
    produced: { label: "145", timestamp: 3 },
    lacks: {
      label: "655",
    },
    inplan: { label: "800" },
  },
  {
    name: { label: "Talion XG38"},
    cecode: { label: "00.11012"},
    produced: { label: "223", timestamp: 1 },
    lacks: {
      label: "577",
    },
    inplan: { label: "800" },
  },
];

export const Sort = () => {
  const [data, setData] = useState <Item[]>(items);
  const [columns] =
    useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>({
      name: {
        defaultWidth: 350,
        minWidth: 250,
      },
      cecode: {
        minWidth:200,
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

  //   const { response, loading, error } = useAxios({
  //     method: 'get',
  //     headers: JSON.stringify({ accept: '*/*' }),
  //     body: JSON.stringify({
  //         userId: 1,
  //         id: 19392,
  //         title: 'title',
  //         body: 'Sample text',
  //     }),
  // });



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
      items:  data,
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

const device: Item = {
  name: { label: "Digex C50" },
  cecode: { label: "00.21543" },
  produced: { label: "312", timestamp: 5 },
  lacks: {
    label: "488",
  },
  inplan: { label: "800" },
}


useEffect(() => {
  setData(prevData => [...prevData, device]);
  // console.log(data);

  // console.log(response);
  // console.log(loading);
  // console.log(error);
}, []);

  return (
    <>
      <Table size="medium" sortable aria-label="Table with sort" ref={tableRef}>
        <TableHeader style={{fontSize: "2.2rem", fontFamily: "Tahoma, sans-serif"}}>
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
