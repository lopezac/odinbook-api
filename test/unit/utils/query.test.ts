import {
  getLastPathWord,
  getQueryParams,
} from "../../../src/utils/query.helper";

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

test("getLastPathWord works", () => {
  const path = "/users/nth753TN753H7N5T3/photos";
  const lastWord = getLastPathWord(path);
  expect(lastWord).toBe("photos");
});
