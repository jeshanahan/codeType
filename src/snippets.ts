export type Snippet = {
  id: string
  language: 'JavaScript' | 'Python'
  title: string
  text: string
}

export const starterSnippet: Snippet = {
  id: 'js-active-users',
  language: 'JavaScript',
  title: 'Find active users',
  text: 'const activeUsers = users.filter(user => user.isActive);',
}
