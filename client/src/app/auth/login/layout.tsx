type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
  return <div>auth layout{props.children}</div>;
};

export default AuthLayout;
