"use client"
import { useDispatch,useSelector,useStore } from "react-redux";
import type { PersonPageState,PersonPageDispatch,PersonPageStore, UserBuildStore, UserBuildDispatch, UserBuildState,TransactionDispatch,TransactionState,TransactionStore,BookingListDispatch,BookingListState,BookingListStore, ProfileStore, ProfileDispatch, ProfileState } from "./store";

export const usePersonPageStore = useStore.withTypes<PersonPageStore>()
export const usePersonPageDispatch = useDispatch.withTypes<PersonPageDispatch>()
export const usePersonPageSelector = useSelector.withTypes<PersonPageState>()

export const useUserBuildStore = useStore.withTypes<UserBuildStore>()
export const useUserBuildDispatch = useDispatch.withTypes<UserBuildDispatch>()
export const useUserBuildSelector = useSelector.withTypes<UserBuildState>()

export const useTransactionStore = useStore.withTypes<TransactionStore>()
export const useTransactionDispatch = useDispatch.withTypes<TransactionDispatch>()
export const useTransactionSelector = useSelector.withTypes<TransactionState>()

export const useBookingListStore = useStore.withTypes<BookingListStore>()
export const useBookingListDispatch = useDispatch.withTypes<BookingListDispatch>()
export const useBookingListSelector = useSelector.withTypes<BookingListState>()

export const useProfileStore = useStore.withTypes<ProfileStore>()
export const useProfileDispatch = useDispatch.withTypes<ProfileDispatch>()
export const useProfileSelector = useSelector.withTypes<ProfileState>()
