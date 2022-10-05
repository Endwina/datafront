import type { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
type DataType = {
  id: number;
  industryName: string;
};

interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
}
