// import { Router } from "express";
// // import { validate } from "@syncellus/middlewares/validator.middleware.js";
// import { DatabaseService } from "@syncellus/database/database.js";
// import { hw } from "@syncellus/utils/handlerWrapper.js";
// import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
// import { WorkspacesRepository } from "@syncellus/modules/workspaces/repository.js";
// import { WorkspacesService } from "@syncellus/modules/workspaces/service.js";
// import { WorkspacesController } from "@syncellus/modules/workspaces/controller.js";

// const router = Router();
// const db = DatabaseService.getInstance();

// const repo = new WorkspacesRepository(db);
// const service = new WorkspacesService(repo);

// const controller = new WorkspacesController(service);

// router.use(authenticate("jwt"));

// router.get("/",  () => { return { ok: "ok" }});

// export default router;
