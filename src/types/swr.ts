import { Doctor } from 'types/api'

export type DoctorListType = {
  status: boolean
  message: 'OK'
  data: Doctor[]
}
