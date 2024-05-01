import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userName: "글나무",
      email: "글나무@voctree.com",
      memberSince: "2024/04/08",
      pfp: "https://picsum.photos/id/22/200/300",
      is2FAEnabled: false,
    };
  },

  actions: {
    toggle2FA() {
      this.is2FAEnabled = !this.is2FAEnabled;
    },

    changeUserName(userName: string) {
      this.userName = userName;
    },
  },
});
