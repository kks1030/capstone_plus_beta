import { Project } from '../projects/types'

export type UserRole = '관리자'| 'PM'| '작업자'| '고객'

export type User = {
  id: number
  fullname: string
  email: string
  username: string
  role: UserRole
  department: string
  avatar: string
  projects: Project[]
  notes: string
  active: boolean
}
