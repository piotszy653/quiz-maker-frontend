export function sortUsers (users) {
  return users.sort((a, b) => a.username < b.username ? -1 : 1)
}
