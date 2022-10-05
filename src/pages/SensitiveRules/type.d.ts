import type { SorterResult } from 'antd/lib/table/interface';
export type DataType = {
  id: number;
  name: string;
  industryTypeId: number;
  rule: string;
};
export type TableDataType = {
  id: number;
  name: string;
  industryInfoId: number | undefined;
  industryTypeId: number;
  rule: string;
};

// 行业信息的的类型
export type IndustryInfoType = {
  id: number;
  industryName: string;
};
// 行业详情信息的的类型
export type industryDetailType = {
  id: number;
  industryId: number;
  industryTypeName: string;
  timestamp: string;
};
// 查询参数类型
export type selectDetailType = {
  skip: number;
  take: number;
  industryTypeId?: number;
};
export interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
}
