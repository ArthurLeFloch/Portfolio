export function githubUrl(username: string, project: string): string {
  return `https://github.com/${username}/${project}`
}

export function myGithubUrl(projectName: string): string {
  return githubUrl('ArthurLeFloch', projectName)
}

export function assetUrl(assetName: string): string {
  return `${import.meta.env.BASE_URL}assets/projects/${assetName}`
}
