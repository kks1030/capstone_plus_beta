import { Ref, ref, unref } from "vue";
import {
  getTasks,
  addTask,
  updateTask,
  removeTask,
  Sorting,
  Pagination,
} from "../../../../data/pages/tasks";
import { Task } from "../../types";
import { watchIgnorable } from "@vueuse/core";

const makePaginationRef = () =>
  ref<Pagination>({ page: 1, perPage: 10, total: 0 });
const makeSortingRef = () =>
  ref<Sorting>({ sortBy: "startDate", sortingOrder: "desc" });

// Add new refs for search and filter
const searchQuery = ref("");
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

export const useTasks = (options?: {
  sorting?: Ref<Sorting>;
  pagination?: Ref<Pagination>;
}) => {
  const isLoading = ref(false);
  const tasks = ref<Task[]>([]);

  const { sorting = makeSortingRef(), pagination = makePaginationRef() } =
    options ?? {};

  const fetch = async () => {
    isLoading.value = true;
    const { data, pagination: newPagination } = await getTasks({
      ...unref(sorting),
      ...unref(pagination),
      searchQuery: unref(searchQuery),
      startDate: unref(startDate),
      endDate: unref(endDate),
    });
    tasks.value = data as Task[];

    ignoreUpdates(() => {
      pagination.value = newPagination;
    });

    isLoading.value = false;
  };

  const { ignoreUpdates } = watchIgnorable(
    [pagination, sorting, searchQuery, startDate, endDate],
    fetch,
    {
      deep: true,
    }
  );

  fetch();

  return {
    isLoading,
    tasks,
    fetch,
    async add(task: Omit<Task, "id" | "startDate">) {
      isLoading.value = true;
      await addTask({
        ...task,
        worker: task.worker.id, // worker 필드를 User 객체가 아닌 사용자 이름으로 변환
      });
      await fetch();
      isLoading.value = false;
    },
    async update(task: Task) {
      isLoading.value = true;
      await updateTask({
        ...task,
        worker: task.worker.id, // worker 필드를 User 객체가 아닌 사용자 이름으로 변환
      });
      await fetch();
      isLoading.value = false;
    },

    async remove(task: Task) {
      isLoading.value = true;
      await removeTask({
        ...task,
        worker: task.worker.id, // worker 필드를 User 객체가 아닌 사용자 이름으로 변환
      });
      await fetch();
      isLoading.value = false;
    },

    pagination,
    sorting,
    searchQuery,
    startDate,
    endDate,
  };
};
