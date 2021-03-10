export function redirectToLogin() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
