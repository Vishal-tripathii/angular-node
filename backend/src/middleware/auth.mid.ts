import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, resp: any, next: any) => {
    const token = req.headers.access_token as string;
    if (!token) return resp.send(HTTP_UNAUTHORIZED).send();

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!)
        req.user = decodedUser
    } catch (error) {
        resp.status(HTTP_UNAUTHORIZED).send();
    }
    
    return next();
}