import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { HiShieldCheck } from 'react-icons/hi'

import { DoctorListType } from 'types/swr'
import { Doctor } from 'types/api'
import { fetcher } from 'lib/helpers'
import Button from 'components/_base/Button'
import Link from 'next/link'

type DoctorDetailsPageProps = {
  doctor: Doctor
}

const DoctorDetailsPage: NextPage<DoctorDetailsPageProps> = ({ doctor }) => {
  return (
    <>
      <Head>
        <title>{doctor.name} - Doctor Finder</title>
      </Head>
      <header className="bg-gradient-to-r from-primary-500 py-8 to-primary-50">
        <div className="layout">
          <Link href="/">
            <a className="hover:no-underline">
              <h1 className="flex gap-2 items-center text-white w-full sm:gap-4">
                Doctor Finder <HiShieldCheck />
              </h1>
            </a>
          </Link>
        </div>
      </header>

      <section className="py-8">
        <div className="layout">
          <h3 className="text-center text-secondary-500">{doctor.name}</h3>

          <div className="flex flex-col gap-4 justify-between mt-4 w-full sm:flex-row sm:mt-8">
            <div className="w-full sm:w-1/2">
              <Image
                className="rounded-md"
                width="400"
                height="400"
                src={doctor.photo.formats.large}
                alt={`Photo of ${doctor.name}`}
              />
            </div>

            <div className="bg-white border border-muted border-opacity-25 h-full overflow-hidden p-4 rounded-md w-full sm:p-6 sm:w-1/2">
              <div className="flex flex-col space-y-4 w-full">
                <p className="font-bold">
                  Hospital :{' '}
                  <span className="font-normal">{doctor.hospital[0].name}</span>
                </p>

                <p className="font-bold">
                  Specialization :{' '}
                  <span className="bg-gradient-to-r font-normal from-primary-500 inline-flex px-2 py-1 rounded-md text-white to-primary-200">
                    {doctor.specialization.name}
                  </span>
                </p>
                <div>
                  <p className="font-bold">About : </p>
                  <div
                    className="break-words font-normal"
                    dangerouslySetInnerHTML={{
                      __html: doctor.about,
                    }}
                  />
                </div>

                <p className="font-bold">
                  Experience :{' '}
                  <span className="font-normal">{doctor.experience}</span>
                </p>

                <p className="font-bold">
                  SIP : <span className="font-normal">{doctor.sip}</span>
                </p>

                <Button variant="secondary" isCentered disabled>
                  Consultation {`isn't`} available right now -{' '}
                  {doctor.price.formatted}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const doctorList = await fetcher<DoctorListType>(
    '/c9a2b598-9c93-4999-bd04-0194839ef2dc'
  )

  return {
    paths: doctorList.data.map((data) => ({
      params: {
        slug: data.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const doctorList = await fetcher<DoctorListType>(
    '/c9a2b598-9c93-4999-bd04-0194839ef2dc'
  )

  return {
    props: {
      doctor: doctorList.data.find((data) => data.slug === slug),
    },
  }
}

export default DoctorDetailsPage
