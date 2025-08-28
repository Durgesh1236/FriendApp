import { generateStreamToken } from "../db/stream.js";
import TryCatch from "../utils/TryCatch.js";

export const getStreamToken = TryCatch(async(req, res) => {
    const token = generateStreamToken(req.user.id);
    return res.json({ token })
})