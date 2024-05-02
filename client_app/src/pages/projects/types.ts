import { User } from "../users/types";

export type Project = {
  id: number;
  project_name: string;
  project_owner: Omit<User, "projects">;
  team: Omit<User, "projects">[];
  status: "important" | "completed" | "archived" | "in progress";
  creation_date: string;
  taskType: "MT" | "PE"; // 작업 유형
  estimate: number; // 견적가
  originalLanguage: string; // 원본 언어
  targetLanguage: string; // 목표 언어
  targetWorkload: number; // 목표 작업량
};

export type EmptyProject = Omit<
  Project,
  "id" | "project_owner" | "creation_date" | "status"
> & {
  project_owner: Project["project_owner"] | undefined;
  status: Project["status"] | undefined;
  taskType: "MT" | "PE"; // 작업 유형
  estimate: number; // 견적가
  originalLanguage: string; // 원본 언어
  targetLanguage: string; // 목표 언어
  targetWorkload: number; // 목표 작업량
};
