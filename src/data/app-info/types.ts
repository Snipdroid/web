export interface AppInfoRequest {
  /**
   * 页码
   */
  page?: number;
  /**
   * 每页数量
   */
  per?: number;
  /**
   * 普通搜索关键词
   */
  q?: string;
  /**
   * 正则搜索表达式
   */
  regex?: string;
}

export interface AppInfoResponse {
  items: AppInfoItem[];
  /**
   * 分页数据
   */
  metadata: Metadata;
}

export interface AppInfoItem {
  /**
   * 启动项
   */
  activityName: string;
  /**
   * 应用名称
   */
  appName: string;
  /**
   * 提交次数
   */
  count: number;
  /**
   * 创建时间，ISO-8601
   */
  createdAt: null | string;
  /**
   * UUID
   */
  id: string;
  /**
   * 包名
   */
  packageName: string;
  requests?: Request[];
  /**
   * 推荐命名
   */
  suggestedName: null | string;
  /**
   * 标签
   */
  tags?: Tag[];
  /**
   * 最近提交时间，ISO-8601
   */
  updatedAt: null | string;
}

export interface Request {
  appInfo: AppInfo;
  count: number;
  fromIconPack: FromIconPack;
  id: string;
  /**
   * 版本号
   */
  version: number;
}

export interface AppInfo {
  id: string;
}

export interface FromIconPack {
  id: string;
}

export interface Tag {
  /**
   * TagID
   */
  id: string;
  name: string;
}

/**
 * 分页数据
 */
export interface Metadata {
  page: number;
  per: number;
  total: number;
}
