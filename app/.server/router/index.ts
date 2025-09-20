import { t } from "~/.server/common/trpc";

// loaders
import { getMyTaskList } from "./loader/getMyTaskList";
import { getMyUserInfo } from "./loader/getMyUserInfo";
import { getUserList } from "./loader/getUserList";

// actions
import { addTask } from "./action/addTask";
import { deleteTask } from "./action/deleteTask";
import { doneTask } from "./action/doneTask";
import { login } from "./action/login";
import { logout } from "./action/logout";
import { register } from "./action/register";
import { unDoneTask } from "./action/unDoneTask";

const loader = t.router({
  getMyTaskList,
  getMyUserInfo,
  getUserList,
});

const action = t.router({
  login,
  logout,
  register,
  addTask,
  doneTask,
  unDoneTask,
  deleteTask,
});

export const appRouter = t.router({
  loader,
  action,
});

export type AppRouter = typeof appRouter;
