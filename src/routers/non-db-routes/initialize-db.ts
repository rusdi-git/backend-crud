import { Router } from "express";
import { generateSuccessResponse, generateFailedResponse } from "../../helpers/response";
import InternalDbManager from "../../services/internal-db-manager";

const initializeDbRouter = Router();

initializeDbRouter.post('/',async (req,res) => {
    try {
        await new InternalDbManager().initialize();
        return res.status(200).json(generateSuccessResponse(null));
    } catch (error) {
        return res.status(500).json(generateFailedResponse((error as Error).message));
    }    
});

export default initializeDbRouter;