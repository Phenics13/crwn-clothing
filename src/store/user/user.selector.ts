import { User } from "./user.types";

export const selectCurrentUser = (state): User => state.user.currentUser;