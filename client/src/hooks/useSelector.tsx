import { useSelector as useReduxSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@/store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
