import { createContext, useContext } from "react"
import { STATE_KEY, StateStore } from "./state"

export const stores = { [STATE_KEY]: new StateStore()}

const StoresContext = createContext(stores)

export const useStateStore = () => {
  const { stateStore } = useContext(StoresContext)
  return stateStore
}
