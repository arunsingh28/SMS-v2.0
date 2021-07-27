import React, { useEffect } from 'react'
import { useState } from 'react'
import SEO from '../components/SEO'


const Uploader = () => {

    useEffect(() => {
        let email = prompt('username/email')
    }, [])


    return (
        <div>
            <SEO title="file uploader" description="File uploade to " />
        </div>
    )
}

export default Uploader
