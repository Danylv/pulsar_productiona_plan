import {
    TableColumnDefinition,
    TableCellLayout,
    createTableColumn,
    // useId,
    // PresenceBadgeStatus,
    Avatar,
  } from "@fluentui/react-components";

  function getProducedPercent(produced: any, inplan: any) {
    let result = 100 + (100 * (produced - inplan)) / inplan;
    return result.toFixed(0);
  }

  export function getOverallProducedPercent(items: Item[]) {
    let allProducedValue = 0;
    let allInPlanValue = 0;
    items.map((item) => 
      allInPlanValue = Number(allInPlanValue) + Number(item.inplan.label)
     );
     items.map((item) => 
     allProducedValue = Number(allProducedValue) + Number(item.produced.label)
    );

    let result = getProducedPercent(allProducedValue, allInPlanValue)
     return (
      result
    )
  }

  type NameCell = {
    label: string;
  };
  
  type ProducedCell = {
    label: string;
    timestamp: number;
  };
  
  type InPlanCell = {
    label: string;
  
    // status?: any;
  };
  
  // type LackCell = {
  //   label: number;
  // };
  
  type CeCodeCell = {
    label: string;
  };
  
  export type Item = {
    name: NameCell;
    cecode: CeCodeCell;
    produced: ProducedCell;
    lacks?: any;
    inplan: InPlanCell;
  };

export const columnsDef: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "cecode",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>CE code</span>,
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
      columnId: "name",
      renderHeaderCell: () => (
        <span style={{ color: "#0077c1", margin: "10px" }}>Name</span>
      ),
      renderCell: (item: Item) => (
        <TableCellLayout
          // truncate
          // media={
          //   <Avatar
          //     color="royal-blue"
          //     name={item.name.label}
          //     // badge={{ status: item.name.status as PresenceBadgeStatus }}
          //   />
          // }
        >
          {item.name.label}
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        return a.name.label.localeCompare(b.name.label);
      },
    }),
    createTableColumn<Item>({
      columnId: "produced",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Produced</span>,
      renderCell: (item: Item) => (
        <TableCellLayout style={{ color: "green" }}>
          {item.produced.label}
        </TableCellLayout>
      ),
      compare: (a, b) => {
        return Number(a.produced.label) - Number(b.produced.label);
      },
    }),
    createTableColumn<Item>({
      columnId: "lacks",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Lacks</span>,
      renderCell: (item: Item) => (
        <TableCellLayout style={{ color: "red" }}>
          {Number(item.inplan.label) - Number(item.produced.label)}
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        const aLackValue = Number(a.inplan.label) - Number(a.produced.label);
        const bLackValue = Number(b.inplan.label) - Number(b.produced.label);
        // return Number(a.lacks?.label) - Number(b.lacks?.label);
        return aLackValue - bLackValue;
      },
    }),
    createTableColumn<Item>({
      columnId: "inplan",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Inplan</span>,
      renderCell: (item: Item) => (
        // <TableCellLayout media={item.inplan.icon}>
        <TableCellLayout>{item.inplan.label}</TableCellLayout>
      ),
  
      compare: (a, b) => {
        return a.inplan.label.localeCompare(b.inplan.label);
      },
    }),
  
    createTableColumn<Item>({
      columnId: "producedPercent",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>%</span>,
      renderCell: (item: Item) => (
        <TableCellLayout>
          {getProducedPercent(item.produced.label, item.inplan.label)}%
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        const aProducedPercentValue = Number(getProducedPercent(a.produced.label, a.inplan.label));
        const bProducedPercentValue = Number(getProducedPercent(b.produced.label, b.inplan.label));
        return aProducedPercentValue - bProducedPercentValue;
      },
    }),
  ];

  export const items: Item[] = [
    // {
    //   name: { label: "Thermion XP50 Pro" },
    //   cecode: { label: "00.20178" },
    //   produced: { label: "56", timestamp: 4 },
    //   inplan: { label: "800" },
    // },
    // {
    //   // name: { label: "Thermion LRF XQ50 Pro", icon: <FolderRegular /> },
    //   name: { label: "Thermion LRF XQ50 Pro" },
    //   cecode: { label: "00.45098" },
    //   produced: { label: "123", timestamp: 2 },
    //   inplan: { label: "800" },
    // },
    // {
    //   name: { label: "Thermion DXP55" },
    //   cecode: { label: "00.23017" },
    //   produced: { label: "145", timestamp: 3 },
    //   inplan: { label: "800" },
    // },
    // {
    //   name: { label: "Talion XG38" },
    //   cecode: { label: "00.11012" },
    //   produced: { label: "223", timestamp: 1 },
    //   inplan: { label: "800" },
    // },
  ];
