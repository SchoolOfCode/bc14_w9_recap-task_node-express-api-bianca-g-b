import app from "../../app.js";
import users from "../../data/users.js";
import supertest from "supertest";
import { it, expect, describe, beforeAll } from "@jest/globals";

const request = supertest(app);
const path = "/users";

const replacements = users.map((user) => {
  return { ...user, last_name: `${user.last_name} Jr.` };
});

describe(`GET ${path}`, () => {
  let response;

  beforeAll(async () => {
    response = await request.get(path);
  });

  it("should respond with http status 200", () => {
    expect(response.statusCode).toBe(200);
  });

  it("should respond with json and include a content-type response header", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should include a correctly shaped response containing all users", () => {
    expect(response.body).toStrictEqual({
      success: true,
      payload: users,
    });
  });
});

describe(`GET ${path}/:id`, () => {
  describe.each(users)(`GET ${path}/$id`, (user) => {
    let response;

    beforeAll(async () => {
      response = await request.get(path.concat("/", user.id));
    });

    it("should respond with http status 200", () => {
      expect(response.statusCode).toBe(200);
    });

    it("should include an appropriate content-type response header", () => {
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should include a correctly shaped response containing the specific user", () => {
      expect(response.body).toStrictEqual({
        success: true,
        payload: user,
      });
    });
  });
});

describe.each(users.map(({ id, ...rest }) => rest))(
  `POST ${path} (%p)`,
  (newUser) => {
    let creationResponse;

    beforeAll(async () => {
      creationResponse = await request.post(path).send(newUser);
    });

    it("should respond with http status 201", () => {
      expect(creationResponse.statusCode).toBe(201);
    });

    it("should include an appropriate content-type response header", () => {
      expect(creationResponse.headers["content-type"]).toMatch(
        /application\/json/
      );
    });

    it("should include a correctly shaped response containing the newly created user", () => {
      expect(creationResponse.body).toStrictEqual({
        success: true,
        payload: {
          ...newUser,
          id: expect.any(Number),
        },
      });
    });

    it("should persist the newly created user across the requests", async () => {
      const createdUser = creationResponse.body.payload;
      const idOfCreatedUser = createdUser.id;
      const response = await request.get(path.concat("/", idOfCreatedUser));
      expect(response.body?.payload).toStrictEqual(createdUser);
    });
  }
);

describe(`PUT ${path}/:id`, () => {
  describe.each(replacements)(`PUT ${path}/$id`, (replacement) => {
    let response;

    beforeAll(async () => {
      response = await request
        .put(path.concat("/", replacement.id))
        .send(replacement);
    });

    it("should respond with http status 200", () => {
      expect(response.statusCode).toBe(200);
    });

    it("should include an appropriate content-type response header", () => {
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should include a correctly shaped response containing the specific user", () => {
      expect(response.body).toStrictEqual({
        success: true,
        payload: replacement,
      });
    });

    it("should persist the replacement across requests", async () => {
      const response = await request.get(path.concat("/", replacement.id));
      expect(response.body?.payload).toStrictEqual(replacement);
    });
  });
});

describe(`DELETE ${path}/:id`, () => {
  describe.each(replacements)(`DELETE ${path}/$id`, (user) => {
    let response;

    beforeAll(async () => {
      response = await request.delete(path.concat("/", user.id));
    });

    it("should respond with http status 200", () => {
      expect(response.statusCode).toBe(200);
    });

    it("should include an appropriate content-type response header", () => {
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should include a correctly shaped response containing the deleted user", () => {
      expect(response.body).toStrictEqual({
        success: true,
        payload: user,
      });
    });

    it("should persist the deletion across requests", async () => {
      const response = await request.get(path.concat("/", user.id));
      expect(response.body?.payload).not.toStrictEqual(user);
    });
  });
});
