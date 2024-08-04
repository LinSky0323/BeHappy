"use client"
import { useDispatch,useSelector,useStore } from "react-redux";
import type { RootState,AppDispatch,AppStore } from "./store";

export const useAppStore = useStore.withTypes<AppStore>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()