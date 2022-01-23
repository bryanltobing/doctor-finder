import Link from 'next/link'

import { Doctor } from 'types/api'

type DoctorCardProps = {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div>
      <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
      <img src={doctor.photo.formats.thumbnail} />
      <p>{doctor.hospital[0].name}</p>
      <div dangerouslySetInnerHTML={{ __html: doctor.about }} />
      <p>{doctor.specialization.name}</p>
      <p>{doctor.price.formatted}</p>
    </div>
  )
}

export default DoctorCard
