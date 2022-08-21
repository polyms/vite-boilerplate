import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Table,
  ToggleButton,
} from 'react-bootstrap';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  GroupingState,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from 'react-query';
import { CoverageSummary, CoverageSummaryResult } from './coverage';

function Counter() {
  return (
    <div>
      <div className="fw-bold">100%</div>
      Branches <Badge>18/18</Badge>
    </div>
  );
}

const files = ['Tree', 'Flat'];
const filters = ['Low', 'Medium', 'High'];

const columns: ColumnDef<CoverageResult>[] = [
  {
    accessorKey: 'file',
    id: 'firstName',
    header: 'First Name',
    // cell: (info) => info.getValue(),
    // footer: (props) => props.column.id,
  },
];

export function CoveragePage() {
  const [radioValue, setRadioValue] = useState<'Tree' | 'Flat'>('Tree');

  const [grouping, setGrouping] = useState<GroupingState>([]);
  const { isLoading, error, data } = useQuery<CoverageResult>(['coverage-summary'], () =>
    fetch('/coverage/coverage-summary.json')
      .then<CoverageSummary>((res) => res.json())
      .then((res) =>
        Object.entries(res).map(([filePath, item]) => ({ ...item, filePath }))
      )
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  return (
    <Container fluid className="py-5">
      <h1>Code Coverage</h1>
      <Counter />
      <Counter />
      <Counter />
      Files
      <ButtonGroup>
        {files.map((radio) => (
          <ToggleButton
            key={radio}
            id={`radio-${radio}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio}
            checked={radioValue === radio}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
      Filters
      <ButtonGroup>
        {filters.map((radio) => (
          <ToggleButton
            key={radio}
            id={`radio-${radio}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio}
            checked={radioValue === radio}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <Button onClick={header.column.getToggleGroupingHandler()}>
                          {header.column.getIsGrouped()
                            ? `🛑(${header.column.getGroupedIndex()}) `
                            : `👊 `}
                        </Button>
                      ) : null}{' '}
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  {...{
                    key: cell.id,
                    style: {
                      background: cell.getIsGrouped()
                        ? '#0aff0082'
                        : cell.getIsAggregated()
                        ? '#ffa50078'
                        : cell.getIsPlaceholder()
                        ? '#ff000042'
                        : 'white',
                    },
                  }}
                >
                  {cell.getIsGrouped() ? (
                    <Button
                      onClick={row.getToggleExpandedHandler()}
                      style={{
                        cursor: row.getCanExpand() ? 'pointer' : 'normal',
                      }}
                    >
                      {row.getIsExpanded() ? '👇' : '👉'}{' '}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                      {row.subRows.length})
                    </Button>
                  ) : cell.getIsAggregated() ? (
                    // If the cell is aggregated, use the Aggregated
                    // renderer for cell
                    flexRender(
                      cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                    // Otherwise, just render the regular cell
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// ======================================================================================

type CoverageResult = {
  filePath: string;
  lines: CoverageResult;
  statements: CoverageResult;
  functions: CoverageResult;
  branches: CoverageResult;
  branchesTrue?: CoverageResult | undefined;
};
