import { sleep } from "../../services/utils";
import tasksDb from "./tasks-db.json";
import usersDb from "./users-db.json";

// Simulate API calls
export type Pagination = {
  page: number;
  perPage: number;
  total: number;
};

export type Sorting = {
  sortBy: keyof (typeof tasksDb)[number] | undefined;
  sortingOrder: "asc" | "desc" | null;
};

// Add new types for search and filter
export type Search = {
  searchQuery: string;
};

export type Filter = {
  startDate: Date | null;
  endDate: Date | null;
};

const getSortItem = (obj: any, sortBy: keyof (typeof tasksDb)[number]) => {
  if (sortBy === "worker") {
    return obj.worker;
  }

  if (sortBy === "startDate" || sortBy === "endDate") {
    return new Date(obj[sortBy]);
  }

  return obj[sortBy];
};

export const getTasks = async (
  options: Sorting & Pagination & Search & Filter
) => {
  await sleep(1000);

  let tasks = tasksDb.map((task) => {
    const worker = usersDb.find((user) => user.id === task.worker);
    return {
      ...task,
      worker: worker || null, // worker가 undefined일 경우 null로 처리
    };
  });

  if (options.searchQuery) {
    tasks = tasks.filter(
      (task) => task.worker?.fullname.includes(options.searchQuery) // worker가 undefined일 수 있으므로 옵셔널 체이닝 사용
    );
  }

  if (options.startDate || options.endDate) {
    tasks = tasks.filter((task) => {
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      if (options.startDate && startDate < options.startDate) return false;
      if (options.endDate && endDate > options.endDate) return false;
      return true;
    });
  }

  if (options.sortBy && options.sortingOrder) {
    tasks.sort((a, b) => {
      a = getSortItem(a, options.sortBy!);
      b = getSortItem(b, options.sortBy!);
      if (a < b) {
        return options.sortingOrder === "asc" ? -1 : 1;
      }
      if (a > b) {
        return options.sortingOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const normalizedTasks = tasks.slice(
    (options.page - 1) * options.perPage,
    options.page * options.perPage
  );

  return {
    data: normalizedTasks,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: tasks.length,
    },
  };
};

export const addTask = async (
  task: Omit<(typeof tasksDb)[number], "id" | "startDate">
) => {
  await sleep(1000);

  const newTask = {
    ...task,
    id: tasksDb.length + 1,
    startDate: new Date().toLocaleDateString("gb", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  tasksDb.push(newTask);

  const worker = usersDb.find((user) => user.id === newTask.worker);
  return {
    ...newTask,
    worker: worker || null, // worker가 undefined일 경우 null로 처리
  };
};

export const updateTask = async (task: (typeof tasksDb)[number]) => {
  await sleep(1000);

  const index = tasksDb.findIndex((t) => t.id === task.id);
  tasksDb[index] = task;

  return task;
};

export const removeTask = async (task: (typeof tasksDb)[number]) => {
  await sleep(1000);

  const index = tasksDb.findIndex((t) => t.id === task.id);
  tasksDb.splice(index, 1);

  return task;
};
