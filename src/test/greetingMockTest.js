
const { doGreeting } = require("../models/GreetingModel");
const oracledb = require("oracledb");
const assert = require("assert");

describe("Greeting Model - doGreeting (mocked)", () => {
  it("should save a greeting without hitting the real database", async () => {
    // 🔹 Mock the connection object
    const mockConnection = {
      execute: async () => ({
        outBinds: {
          id: [1],
          created_at: [new Date("2025-01-01")]
        }
      }),
      commit: async () => {},
      close: async () => {}
    };

    // 🔹 Mock oracledb.getConnection to return new fake connection
    const getConnectionStub = async () => mockConnection;
    oracledb.getConnection = getConnectionStub;

    const message = "Hello Test!";
    const result = await doGreeting(message);

    assert.strictEqual(result.id, 1);
    assert.strictEqual(result.message, message);
    assert.ok(result.created_at instanceof Date);
  });
});
