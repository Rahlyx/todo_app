import router from "./routes.js";

describe("routes.js tests", () => {
  describe("GET /", () => {
    it("should return 200", async () => {
      await router.get("/").then((res) => {
        expect(res.statusCode).toBe(200);
      });
    });

    it("should return html", async () => {
      await router.get("/").then((res) => {
        expect(res.type).toBe("text/html");
      });
    });
    it("should return index.html", async () => {
      await router.get("/").then((res) => {
        expect(res.text).toContain("index.html");
      });
    });
  });

  describe("GET /all-tasks", () => {
    it("should return 200", async () => {
      await router.get("/all-tasks").then((res) => {
        expect(res.statusCode).toBe(200);
      });
    });
    it("should return html", async () => {
      await router.get("/all-tasks").then((res) => {
        expect(res.type).toBe("text/json");
      });
    });
  });
});
