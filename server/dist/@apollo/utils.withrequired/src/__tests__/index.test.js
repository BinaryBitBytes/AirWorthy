// This "test suite" actually does all its work at compile time.
function isWRFoo(_) { }
it("can plug in all now-required fields", () => {
    isWRFoo({
        startsOutOptional: 5,
        alsoStartsOutOptional: "asdf",
        alwaysRequired: "bla",
    });
});
it("now-required fields are required", () => {
    // @ts-expect-error
    isWRFoo({
        startsOutOptional: 5,
        alwaysRequired: "bla",
    });
});
export {};
