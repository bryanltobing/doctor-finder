export type Doctor = {
  doctor_id: string
  name: string
  slug: string
  is_popular: boolean
  about: string
  photo: Image
  sip: string
  experience: string
  price: {
    raw: number
    formatted: string
  }
  specialization: {
    id: string
    name: string
  }
  hospital: Hospital[]
}

export type Hospital = {
  id: string
  name: string
  image: Image
  icon: Image
}

export type Image = {
  size_formatted: string
  url: string
  formats: {
    thumbnail: string
    large: string
    medium: string
    small: string
  }
}
