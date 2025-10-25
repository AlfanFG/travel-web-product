interface IPagination {
  page: number;
  limit: number;
  title?: string;
  category?: string;
}

interface IPaginateResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface IPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface IPaginateResponseById<T> {
  data: T;
  meta: {};
}
