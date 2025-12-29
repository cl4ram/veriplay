export const useUiStore = defineStore('ui', {
  state: () => ({
    isCreateMovieModalOpen: false,
  }),
  actions: {
    openCreateModal() {
      this.isCreateMovieModalOpen = true
    },
    closeCreateModal() {
      this.isCreateMovieModalOpen = false
    }
  }
})