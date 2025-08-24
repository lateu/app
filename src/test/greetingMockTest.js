const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("Greeting Model - doGreeting (mocked)", function () {
  let oracledbMock, greetingModel;

  beforeEach(() => {
    // Mock the oracledb module
    oracledbMock = {
      BIND_OUT: "BIND_OUT",
      NUMBER: "NUMBER",
      DATE: "DATE",
      getConnection: sinon.stub()
    };

    // Inject the mock into the model
    greetingModel = proxyquire("../models/GreetingModel", {
      oracledb: oracledbMock
    });
  });

  it("should save a greeting without hitting the real  database", async function () {
    // Fake connection object
    const fakeConnection = {
      execute: sinon.stub().resolves({ outBinds: { id: [1], created_at: [new Date()] } }),
      commit: sinon.stub().resolves(),
      close: sinon.stub().resolves()
    };

    oracledbMock.getConnection.resolves(fakeConnection);

    const result = await greetingModel.doGreeting("Hello Mocked");

    expect(result).to.have.property("id", 1);
    expect(result).to.have.property("message", "Hello Mocked");
    expect(result).to.have.property("created_at").that.is.a("date");
  });
});
