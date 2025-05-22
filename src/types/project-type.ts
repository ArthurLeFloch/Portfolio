import type { StatusType } from './status-type'

export interface Project {
  title: string
  description: string
  githubUrl: string | null
  technologies: string[]
  status: StatusType
}

export interface WebProject extends Project {
  imageUrl: string
  websiteUrl: string | null
  devWebsiteUrl: string | null
}
