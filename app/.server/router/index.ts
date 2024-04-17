import { unDoneTask } from "./action/unDoneTask";
import { doneTask } from "./action/doneTask";
import { addTask } from "./action/addTask";
import { register } from "./action/register";
import { logout } from "./action/logout";
import { login } from "./action/login";
import { getUserList } from "./loader/getUserList";
import { getMyUserInfo } from "./loader/getMyUserInfo";
import { getMyTaskList } from "./loader/getMyTaskList";
import { t } from "../trpc";

export const appRouter = t.router({
  loader: t.router({
    getMyTaskList,
    getMyUserInfo,
    getUserList,
  }),
  action: t.router({
    login,
    logout,
    register,
    addTask,
    doneTask,
    unDoneTask,
  }),
});

export type AppRouter = typeof appRouter;
