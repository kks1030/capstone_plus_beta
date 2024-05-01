export interface INavigationRoute {
  name: string;
  displayName: string;
  meta: { icon: string };
  path?: string; // 경로 속성을 추가합니다.
  children?: INavigationRoute[];
}

export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    {
      name: "dashboard",
      displayName: "menu.dashboard",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
    },
    {
      name: "users",
      displayName: "menu.users",
      meta: {
        icon: "group",
      },
    },
    {
      name: "project",
      displayName: "menu.projects",
      meta: {
        icon: "folder_shared",
      },
      children: [
        {
          name: "project-management",
          displayName: "menu.project-management",
        },
        {
          name: "project-progress",
          displayName: "menu.project-progress",
        },
      ],
    },
    {
      name: "worker-management",
      displayName: "menu.worker-management",
      meta: {
        icon: "group",
      },
    },
    {
      name: "work-verification",
      displayName: "menu.work-verification",
      meta: {
        icon: "check_circle",
      },
      children: [
        {
          name: "data-view",
          displayName: "menu.data-view",
        },
        {
          name: "translation",
          displayName: "menu.translation",
        },
        {
          name: "proofreading",
          displayName: "menu.proofreading",
        },
        {
          name: "final-review",
          displayName: "menu.final-review",
        },
      ],
    },
    {
      name: "request",
      displayName: "menu.uploader",
      meta: {
        icon: "upload_file",
      },
    },

    {
      name: "me",
      displayName: "menu.me",
      meta: {
        icon: "person",
      },
    },
    {
      name: "users1",
      displayName: "menu.users1",
      meta: {
        icon: "group",
      },
    },
    /*({
      name: 'control',
      displayName: 'menu.control',
      meta: {
        icon: 'control_camera',
      },
    },*/

    {
      name: "auth",
      displayName: "menu.auth",
      meta: {
        icon: "login",
      },
      children: [
        {
          name: "login",
          displayName: "menu.login",
        },
        {
          name: "signup",
          displayName: "menu.signup",
        },
        {
          name: "recover-password",
          displayName: "menu.recover-password",
        },
      ],
    },

    {
      name: "preferences",
      displayName: "menu.preferences",
      meta: {
        icon: "manage_accounts",
      },
    },
  ] as INavigationRoute[],
};
