import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Doctor } from 'types/api'
import Button from 'components/_base/Button'

type DoctorCardProps = {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const router = useRouter()

  return (
    <div className="/ border-muted overflow-hidden p-4 bg-white rounded-md border border-opacity-25 sm:p-6">
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
            <a className="focus:underline focus:ring-secondary-500 focus:outline-none">
              <h4 className="a">{doctor.name}</h4>
            </a>
          </Link>

          <p className="font-bold">
            Hospital :{' '}
            <span className="font-normal">{doctor.hospital[0].name}</span>
          </p>

          <p className="font-bold">
            Specialization :{' '}
            <span className="inline-flex px-2 py-1 font-normal text-white bg-primary-500 rounded-md">
              {doctor.specialization.name}
            </span>
          </p>
          <p className="font-bold">About : </p>
          <div
            className="/ line-clamp-4 font-normal break-words"
            dangerouslySetInnerHTML={{
              __html: doctor.about,
            }}
          />

          <Button
            variant="secondary"
            onClick={() => router.push(`/doctors/${doctor.slug}`)}
            isCentered
          >
            Consult - {doctor.price.formatted}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
