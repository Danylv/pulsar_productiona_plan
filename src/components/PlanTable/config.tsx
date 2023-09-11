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
      allInPlanValue = Number(allInPlanValue) + Number(item.inplan)
     );
     items.map((item) => 
     allProducedValue = Number(allProducedValue) + Number(item.produced)
    );

    let result = getProducedPercent(allProducedValue, allInPlanValue)
     return (
      result
    )
  }

  // type LackCell = {
  //   label: number;
  // };

  export type Item = {
    name: string;
    cecode: string;
    produced: number;
    timestamp?: number;
    lacks?: any;
    inplan: number;
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
          {item.cecode}
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        return a.cecode.localeCompare(b.cecode);
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
          {item.name}
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        return a.name.localeCompare(b.name);
      },
      
    }),
    createTableColumn<Item>({
      columnId: "produced",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Produced</span>,
      renderCell: (item: Item) => (
        <TableCellLayout style={{ color: "green" }}>
          {item.produced}
        </TableCellLayout>
      ),
      compare: (a, b) => {
        return Number(a.produced) - Number(b.produced);
      },
    }),
    createTableColumn<Item>({
      columnId: "lacks",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Lacks</span>,
      renderCell: (item: Item) => (
        <TableCellLayout style={{ color: "red" }}>
          {Number(item.inplan) - Number(item.produced)}
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        const aLackValue = Number(a.inplan) - Number(a.produced);
        const bLackValue = Number(b.inplan) - Number(b.produced);
        // return Number(a.lacks?.label) - Number(b.lacks?.label);
        return aLackValue - bLackValue;
      },
    }),
    createTableColumn<Item>({
      columnId: "inplan",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>Inplan</span>,
      renderCell: (item: Item) => (
        // <TableCellLayout media={item.inplan.icon}>
        <TableCellLayout>{item.inplan}</TableCellLayout>
      ),
  
      compare: (a, b) => {
        return Number(a.inplan) - Number(b.inplan);
      },
    }),
  
    createTableColumn<Item>({
      columnId: "producedPercent",
      renderHeaderCell: () => <span style={{ color: "#0077c1" }}>%</span>,
      renderCell: (item: Item) => (
        <TableCellLayout>
          {getProducedPercent(item.produced, item.inplan)}%
        </TableCellLayout>
      ),
  
      compare: (a, b) => {
        const aProducedPercentValue = Number(getProducedPercent(a.produced, a.inplan));
        const bProducedPercentValue = Number(getProducedPercent(b.produced, b.inplan));
        return aProducedPercentValue - bProducedPercentValue;
      },
    }),
  ];

  export const items: Item[] = [
    {
      name:"Thermion XP50 Pro",
      cecode: "00.20178",
      produced: 56, timestamp: 4,
      inplan: 800,
    },
    {
      name: "APS5 Battery Unit",
      cecode: "11.13124",
      produced: 988, timestamp: 7,
      inplan: 1550,
    },
    {
      name: "Thermion DXP55",
      cecode: "00.23017",
      produced: 145, timestamp: 3,
      inplan: 800,
    },
    {
      name: "Talion XG38",
      cecode: "00.11012",
      produced: 223, timestamp: 1,
      inplan: 800,
    },
  ];
