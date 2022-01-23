import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { DoctorListType } from 'types/swr'
import { Doctor } from 'types/api'
import { fetcher } from 'lib/helpers'

type DoctorDetailsPageProps = {
  doctor: Doctor
}

const DoctorDetailsPage: NextPage<DoctorDetailsPageProps> = ({ doctor }) => {
  return <div>{doctor.name}</div>
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
