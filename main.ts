import { Application, Router } from "jsr:@oak/oak";
import { getGameOnline } from "./api.ts";

const router = new Router();

router.get("/online/:id", async (ctx) => {
	ctx.response.body = await getGameOnline(ctx.params.id);
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8369;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
