import Link from 'next/link'
import Image from 'next/image'

import { Doctor } from 'types/api'

type DoctorCardProps = {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="border-muted shadow-muted / overflow-hidden p-4 bg-white rounded-md shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-2">
        <div className="flex justify-center w-full sm:w-1/3">
          <Image
            src={doctor.photo.formats.thumbnail}
            className="rounded-md"
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col space-y-2 w-full sm:w-2/3">
          <Link href={`/doctors/${doctor.slug}`}>
            <a className="focus:outline-none focus:ring-secondary focus:underline">
              <h4 className="a">{doctor.name}</h4>
            </a>
          </Link>

          <p className="font-bold">
            Hospital:{' '}
            <span className="font-normal">{doctor.hospital[0].name}</span>
          </p>

          <p className="font-bold">
            Specialization :{' '}
            <span className="bg-primary / inline-flex px-2 py-1 font-normal text-white rounded-md">
              {doctor.specialization.name}
            </span>
          </p>
          <p className="font-bold">About : </p>
          <div
            className="line-clamp-4 / font-normal break-words"
            dangerouslySetInnerHTML={{
              __html: doctor.about,
            }}
          />

          <Link href={`/doctors/${doctor.slug}`}>
            <a className="bg-secondary focus:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary hover:bg-secondaryHover hover:no-underline / px-4 py-2 text-center text-white rounded-md transition-colors">
              Consult - {doctor.price.formatted}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
