import { action, observable, makeObservable } from "mobx"

export class StateStore {
  loading = false

  editIdx = -1 // 编辑索引

  constructor(value) {
    makeObservable(this, {
      loading: observable,
      editIdx: observable,
      handleSetLoading: action.bound
    })
    this.value = value
  }

  handleSetLoading(state) {
    this.loading = state
  }
  handleSetEditIdx(idx) {
    this.editIdx = idx
  }
  handleResetEditIdx() {
    this.editIdx = -1
  }
}

export const STATE_KEY = "stateStore"
