import { defineMock } from "vite-plugin-mock-dev-server";

import Mock from "mockjs";

export default defineMock([
  {
    url: "/api/test",
    body: Mock.mock({
      count: "@integer(10, 30)", // generate a random integer between 1 and 10 for the count property
      "results|10": [
        {
          // generate an array of 10 items for the result property
          name: "@name", // generate a random name
          age: "@integer(18, 60)", // generate a random integer between 18 and 60 for the age property
          "career|1": ["student", "worker"], // randomly select a career from the given options
        },
      ],
    }),
  },
]);
