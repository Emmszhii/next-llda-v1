export const arrayPublicUrl = [
  "/",
  "login",
  "forgot-password",
  "system-login",
  "create-password",
  "forgot-system-password",
  "create-system-password",
];

export function isUrlPublic(path: string) {
  let res = false;

  res = arrayPublicUrl.includes(path);

  return res;
}
