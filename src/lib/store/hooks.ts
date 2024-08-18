"use client"
import { useDispatch,useSelector,useStore } from "react-redux";
import type { PersonPageState,PersonPageDispatch,PersonPageStore, UserBuildStore, UserBuildDispatch, UserBuildState } from "./store";

export const usePersonPageStore = useStore.withTypes<PersonPageStore>()
export const usePersonPageDispatch = useDispatch.withTypes<PersonPageDispatch>()
export const usePersonPageSelector = useSelector.withTypes<PersonPageState>()

export const useUserBuildStore = useStore.withTypes<UserBuildStore>()
export const useUserBuildDispatch = useDispatch.withTypes<UserBuildDispatch>()
export const useUserBuildSelector = useSelector.withTypes<UserBuildState>()

