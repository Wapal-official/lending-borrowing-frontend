export const state = () => ({
  message: "",
  error: false,
});

export const mutations = {
  showToast(state: any, payload: any) {
    state.message = payload.message;
    state.error = payload.error;
  },

  clearToast(state: any) {
    state.message = "";
  },
};
