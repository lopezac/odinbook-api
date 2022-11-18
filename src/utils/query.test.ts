import { getQueryParams } from "./query.helper";

describe("getQueryParams works", () => {
  test("works with full queries, page, filter and sort", () => {
    const query = {
      page: "2",
      gender: "male",
      sort: " birthday,-firstName",
      lastName: "lopez",
    };
    const params = getQueryParams(query);
    expect(params).toStrictEqual({
      sort: "birthday -firstName",
      page: 10,
      filter: { gender: "male", lastName: "lopez" },
    });
  });

  test("works with filter alone", () => {
    const query = { gender: "female", lastName: "perez" };
    const params = getQueryParams(query);
    expect(params).toStrictEqual({
      page: 0,
      sort: "-_id",
      filter: { gender: "female", lastName: "perez" },
    });
  });
});
