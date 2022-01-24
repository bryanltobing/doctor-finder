import { useRouter } from 'next/router'
import { HiSearch, HiArrowCircleDown } from 'react-icons/hi'
import qs from 'querystringify'

import Button from 'components/_base/Button'
import Select from 'components/_base/Select'

import { Doctor } from 'types/api'

type DoctorFilterSectionProps = {
  doctors: Doctor[]
}

const DoctorFilterSection = ({ doctors }: DoctorFilterSectionProps) => {
  const router = useRouter()

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-white flex items-center overflow-hidden rounded-md">
        <div className="pl-4 py-2 text-muted text-xl">
          <HiSearch />
        </div>
        <input
          className="bg-transparent border-none px-4 w-full"
          type="search"
          placeholder="Type to search..."
          value={router.query.search || ''}
          onChange={(evt) => {
            const inputValue = evt.target.value

            router.push(
              `/?${qs.stringify({
                ...router.query,
                search: inputValue,
              })}`,
              undefined,
              { shallow: true }
            )
          }}
        />
        <Button
          variant="secondary"
          className="border-none gap-2 rounded-l-none"
        >
          <HiSearch /> Cari
        </Button>
      </div>
      <div className="flex flex-col gap-4 mx-auto sm:flex-row">
        <div className="relative w-full">
          <HiArrowCircleDown className="-translate-y-1/2 absolute bottom-1/2 right-4 text-secondary-500 top-1/2 z-50" />
          <Select
            value={router.query.hospitalName || ''}
            className="text-muted"
            placeholder="Hospital"
            options={[
              ...new Set(
                doctors.map((doctor) => doctor.hospital?.[0].name) || []
              ),
            ].map((hospitalName) => ({
              label: hospitalName,
              value: hospitalName,
            }))}
            onChange={(evt) => {
              const selectValue = evt.target.value

              router.push(
                `/?${qs.stringify({
                  ...router.query,
                  hospitalName: selectValue,
                })}`,
                undefined,
                { shallow: true }
              )
            }}
          />
        </div>
        <div className="relative w-full">
          <HiArrowCircleDown className="-translate-y-1/2 absolute bottom-1/2 right-4 text-secondary-500 top-1/2 z-50" />
          <Select
            value={router.query.specializationName || ''}
            className="text-muted"
            placeholder="Specialization"
            options={[
              ...new Set(
                doctors.map((doctor) => doctor.specialization.name) || []
              ),
            ].map((specializationName) => ({
              label: specializationName,
              value: specializationName,
            }))}
            onChange={(evt) => {
              const selectValue = evt.target.value

              router.push(
                `/?${qs.stringify({
                  ...router.query,
                  specializationName: selectValue,
                })}`,
                undefined,
                { shallow: true }
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DoctorFilterSection
