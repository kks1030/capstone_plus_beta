<script setup lang="ts">
import { ref } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { User } from './types'
import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { users, isLoading, filters, sorting, pagination,searchUsers, ...usersApi } = useUsers()

const userToEdit = ref<User | null>(null)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (user: User) => {
  if (userToEdit.value) {
    await usersApi.update(user)
    notify({
      message: `${user.fullname} has been updated`,
      color: 'success',
    })
  } else {
    usersApi.add(user)
    notify({
      message: `${user.fullname} has been created`,
      color: 'success',
    })
  }
}

const onUserDelete = async (user: User) => {
  await usersApi.remove(user)
  notify({
    message: `${user.fullname} has been deleted`,
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">Users</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="filters.searchOption"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'name', value: 'name' },
              { label: 'Email', value: 'email' },
            ]"
          />
          <VaInput v-model="filters.search" placeholder="이름 혹은 이메일로 검색" @keyup.enter="searchUsers">
  <template #prependInner>
    <VaIcon name="search" color="secondary" size="small" />
  </template>
</VaInput>

          <VaSelect
            v-model="filters.role"
            placeholder="역할"
            :options="['관리자', 'PM', '작업자','고객']"
            clearable
            clearable-icon="cancel"
            style="width: 130px"
          />
          <VaSelect
            v-model="filters.department"
            placeholder="소속"
            :options="['Department1', 'Department2', 'Department3']"
            clearable
            clearable-icon="cancel"
            style="width: 200px"
          />
          <VaButton @click="searchUsers">
            <VaIcon name="person_search" size="large" />
          </VaButton>
        </div>
        <VaButton @click="showAddUserModal">Add user</VaButton>
      </div>

      <UsersTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :users="users"
        :loading="isLoading"
        :pagination="pagination"
        @editUser="showEditUserModal"
        @deleteUser="onUserDelete"
      />
    </VaCardContent>
  </VaCard>
  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? 'Edit user' : 'Add user' }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? '저장' : '추가'"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user)
          ok()
        }
      "
    />
  </VaModal>
</template>
