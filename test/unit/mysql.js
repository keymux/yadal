describe("mysql.js", () => {
  describe.skip("_fieldsFromMappedDataRows()", () => {
    const fixtures = [
      {
        description:
          "should find the largest set of keys given a set of objects",
        expected: ["a", "b", "c", "d", "e"],
        input: [
          {
            a: 0,
            b: 1,
          },
          {
            b: 2,
            c: 3,
          },
          {
            b: 4,
            c: 5,
            d: 6,
            e: 7,
          },
        ],
      },
    ];

    fixtures.forEach(({ description, expected, input }) =>
      it(description, () =>
        expect(_fieldsFromMappedDataRows(input)).to.deep.equal(expected)
      )
    );
  });

  describe("queryPromiseCreator()", () => {
    //
  });
});
