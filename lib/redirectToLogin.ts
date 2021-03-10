export function redirectToLogin() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
