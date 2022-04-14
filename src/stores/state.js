import { action, observable, makeObservable } from "mobx"

export class StateStore {
  loading = false

  constructor(value) {
    makeObservable(this, {
      loading: observable,
      handleSetLoading: action.bound
    })
    this.value = value
  }

  handleSetLoading(state) {
    this.loading = state
  }
}

export const STATE_KEY = "stateStore"
