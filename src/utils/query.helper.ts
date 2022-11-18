import { Query, ReturnQuery } from "../types/request.types";

function getQueryParams(query: Query): ReturnQuery {
  let sort = query.sort ?? "-_id";
  sort = sort.trim().replaceAll(",", " ");
  const page = getPageParams(query.page);
  delete query.sort;
  delete query.page;

  return { sort, page, filter: query };
}

function getPageParams(page = "1") {
  return (+page - 1) * 10;
}

export { getQueryParams };
