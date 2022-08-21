export interface CoverageResult {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}

export interface CoverageSummaryResult {
  lines: CoverageResult;
  statements: CoverageResult;
  functions: CoverageResult;
  branches: CoverageResult;
  branchesTrue?: CoverageResult;
}

export interface CoverageSummary {
  total: CoverageSummaryResult;
  [key: string]: CoverageSummaryResult;
}
