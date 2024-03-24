"use client";

import { Provider } from "react-redux";

interface IRtkProviderProps {
  children: React.ReactNode;
  store: any;
}

const RtkProvider = ({ store, children }: IRtkProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RtkProvider;
