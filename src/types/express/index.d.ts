import { IUser } from "../../models/user.model";  

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Now TypeScript recognizes req.user
    }
  }
}