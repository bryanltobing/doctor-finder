import Link from 'next/link'
import Image from 'next/image'

import { Doctor } from 'types/api'

type DoctorCardProps = {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="rounded-lg border-muted shadow-muted shadow-sm p-4 sm:p-6 overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
        <div className="w-full sm:w-1/3 flex justify-center">
          <Image
            src={doctor.photo.formats.thumbnail}
            className="rounded-lg"
            width={120}
            height={120}
          />
        </div>
        <div className="w-full sm:w-2/3 flex flex-col space-y-2">
          <Link href={`/doctors/${doctor.slug}`}>
            <a className="focus:ring-secondary focus:underline   focus:outline-none">
              <h4 className="a">{doctor.name}</h4>
            </a>
          </Link>

          <p className="font-bold">
            Hospital:{' '}
            <span className="font-normal">{doctor.hospital[0].name}</span>
          </p>

          <p className="font-bold">
            Specialization :{' '}
            <span className="inline-flex font-normal bg-primary text-white px-2 py-1 rounded-lg">
              {doctor.specialization.name}
            </span>
          </p>
          <p className="font-bold">About : </p>
          <div
            className="break-words line-clamp-4 font-normal"
            dangerouslySetInnerHTML={{
              __html: doctor.about,
            }}
          />

          <Link href={`/doctors/${doctor.slug}`}>
            <a className="text-white hover:no-underline text-center bg-secondary rounded-lg px-4 py-2 focus:ring-secondary focus:bg-secondary-hover focus:ring-2 focus:outline-none hover:bg-secondaryHover transition-colors">
              Consult - {doctor.price.formatted}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
