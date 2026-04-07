import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donateRouter from "./donate";
import authRouter from "./auth";
import progressRouter from "./progress";
import subscriptionsRouter from "./subscriptions";
import paymentsRouter from "./payments";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donateRouter);
router.use(authRouter);
router.use(progressRouter);
router.use(subscriptionsRouter);
router.use(paymentsRouter);

export default router;
