import type { StatusType } from './status-type'

export interface Project {
  projectName: string
  description: string
  githubUrl: string | null
  technologies: string[]
  status: StatusType
}

export interface WebProject extends Project {
  imageSrc: string
  websiteUrl: string | null
  devWebsiteUrl: string | null
}
