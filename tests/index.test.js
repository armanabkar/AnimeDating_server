import chai from "chai";
import chaiHttp from "chai-http";
import { app, shuffle } from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("Test utility methods", () => {
  it("should return a html", () => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.headers["content-type"].should.have.string("text/html");
      });
  });

  it("should return a image", (done) => {
    chai
      .request(app)
      .get("/images/shuutsukiyama.jpg")
      .end((err, res) => {
        res.should.have.status(200);
        res.headers["content-type"].should.have.string("image/jpeg");
        done();
      });
  });

  it("should shuffle the array", () => {
    chai.assert.notEqual([1, 2, 3, 4, 5], shuffle([1, 2, 3, 4, 5]));
  });
});

describe("Test characters methods", () => {
  it("should get all characters", (done) => {
    chai
      .request(app)
      .get("/api/v1/characters")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body.should.have.lengthOf(75);
        res.body[0].name.should.be.a("string");
        done();
      });
  });

  it("should get a character by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/character/10")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.character.name.should.be.equal("Lord Pain");
        res.body.character.neighborhood.should.be.equal("Hidden Rain Village");
        res.body.character.age.should.be.equal(35);
        res.body.character.image.should.be.equal("images/lordpain.png");
        done();
      });
  });
});

describe("Test users methods", () => {
  it("should get all users", (done) => {
    chai
      .request(app)
      .get("/api/v1/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body.should.have.lengthOf(5);
        res.body[0].name.should.be.a("string");
        done();
      });
  });
});

describe("Test suggestions methods", () => {
  it("should get all suggestions", (done) => {
    chai
      .request(app)
      .get("/api/v1/suggestions")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        res.body.should.have.lengthOf(75);
        res.body[0].should.be.a("string");
        done();
      });
  });
});
