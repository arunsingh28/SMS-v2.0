import React from 'react'
import Head from 'next/head'

type Props = {
    title: string,
    description: string,
}

const SEO = ({ title, description }: Props) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    )
}


export default SEO
