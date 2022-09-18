import React from 'react'
import AuthContext from '../context/authProvider'

const Login = () => {
    const URL = 'https://sms-api-1.herokuapp.com/api'
    const errRef = React.useRef()

    const { setAuth } = React.useContext(AuthContext)

    const [email, setUser] = React.useState('')
    const [password, setPwd] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [fmail, setFmail] = React.useState('')
    const [sucMes, setSucMes] = React.useState('')
    const [isOtp, setIsOtp] = React.useState(false)
    const [otp, setOtp] = React.useState('')

    // new password input
    const [newPassword, setNewPassword] = React.useState('')
    const [newConPassword, setNewConPassword] = React.useState('')

    const [isOtpMatch, setIsOtpMatch] = React.useState(false)

    const [result, setResult] = React.useState()

    React.useEffect(() => {
        errRef.current.focus()
    }, [])

    React.useEffect(() => {
        setErrMsg('')
    }, [email, password])
    let mail = ''
    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        mail = email + '@gmail.com';
        const result = await fetch(`${URL}/login`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: mail, password }),
        }).then(d => d.json())
        if (result.code == 200) {
            const name = result?.data?.name;
            const accessToken = result?.accessToken;
            window.confirm(accessToken)
            localStorage.setItem('acessToken', 'Bearer ' + accessToken)
            setAuth({ email, name })
            setErrMsg(result?.message)
            setResult(result)
            setSuccess(true)
        } else {
            setSuccess(false)
            setErrMsg(result?.message)
        }
    }


    const handleForgotPassword = async (e) => {
        e.preventDefault()
        const result = await fetch(`${URL}/v1/forgotpassword/otp`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: fmail || mail }),
        }).then(d => d.json())
        if (result.code === 200) {
            setIsOtp(true)
        }
        setSucMes(result.message)
    }
    const handleOtpSumit = async (e) => {
        e.preventDefault()
        const result = await fetch(`${URL}/otp/forgot/${fmail}`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ otp })
        }).then(d => d.json())
        if (result.code == 200) {
            setIsOtpMatch(true)
            setIsOtpMatch(true)
            setSucMes('OTP Verified!!')
        } else {
            setSucMes(result.message)
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if (newPassword != newConPassword) {
            setSucMes('Both Password are not same')
        } else {
            const result = await fetch(`${URL}/forgot-password`, {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ password: newPassword })
            }).then(d => d.json())
            setSucMes(result.message)
            setIsOtpMatch(false)
            setIsOtp(false)
        }
    }
    return (
        <main>
            <div className="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
                <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96" >
                    <h1 className="text-3xl font-bold leading-normal" >Sign in</h1>
                    <p className="text-sm leading-normal">Stay updated on your professional world</p>
                    <p className='text-red-700' ref={errRef}>{errMsg}</p>
                    <div className='my-5'>
                        {
                            success ? <div>
                                <div className="avatar online">
                                    <div className="w-24 rounded-full">
                                        <img src={result.data.img} />
                                    </div>
                                </div>
                                <h2 className="text-center">{result.data.name}</h2>
                            </div>
                                : null
                        }
                    </div>
                    <form className="space-y-5 mt-5" onSubmit={handleSubmitLogin}>
                        <div className="mb-4 relative">
                            <input
                                value={email}
                                onChange={(e) => setUser(e.target.value)}
                                className="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none" type="text" autoFocus
                                placeholder='username'
                                autoComplete="false" />
                        </div>
                        <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
                            <input
                                value={password}
                                onChange={(e) => setPwd(e.target.value)}
                                className="w-full rounded px-3 pt-5 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500" type="password"
                                placeholder='Password'
                            />
                            <a className="text-sm font-bold text-blue-700 hover:bg-blue-100 rounded-full px-2 py-1 mr-1 leading-normal cursor-pointer">show</a>
                        </div>
                        <div className="-m-2">
                            <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Forgot Password</label>
                        </div>
                        <button className="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white py-3 font-medium">Sign in</button>
                    </form>
                </div>
            </div>

            <div>



                {
                    isOtp ? isOtpMatch ? <><input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" for="">
                                <h3 className="text-lg font-bold">Enter New Password</h3>
                                <p className="py-4">Setup your new password</p>
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className='flex flex-col items-center'>
                                        <input type="password"
                                            value={newPassword}
                                            onChange={(e) => { setNewPassword(e.target.value) }}
                                            placeholder="New Password" className="input input-bordered input-info w-full max-w-xs" />
                                        <input type="password"
                                            value={newConPassword}
                                            onChange={(e) => { setNewConPassword(e.target.value) }}
                                            placeholder="confirm password" className="mt-2 input input-bordered input-info w-full max-w-xs" />
                                    </div>
                                    <button className="btn mt-2 btn-outline ml-4" type='submit'>Save</button>
                                    {
                                        sucMes && <p className='p-2 text-white'>{sucMes}</p>
                                    }
                                </form>
                            </label>
                        </label></> : <>
                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" for="">
                                <h3 className="text-lg font-bold">Verify OTP</h3>
                                <p className="py-4">Enter the otp. We send it to your register email.</p>
                                <form onSubmit={handleOtpSumit}>
                                    <input type="number"
                                        value={otp}
                                        onChange={(e) => { setOtp(e.target.value) }}
                                        placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                    <button className="btn btn-outline ml-4" type='submit'>Verify</button>
                                    {
                                        sucMes && <p className='p-2 text-white'>{sucMes}</p>
                                    }
                                </form>
                            </label>
                        </label>
                    </> : <>
                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" for="">
                                <h3 className="text-lg font-bold">Forgot Password </h3>
                                <p className="py-4">Enter your email id so we can send you the OTP to your register email</p>
                                <form onSubmit={handleForgotPassword}>
                                    <input type="email"
                                        value={fmail}
                                        onChange={(e) => { setFmail(e.target.value) }}
                                        placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                    <button className="btn btn-outline ml-4" type='submit'>Send</button>
                                    {
                                        sucMes && <p className='p-2 text-white'>{sucMes}</p>
                                    }
                                </form>
                            </label>
                        </label>
                    </>
                }
            </div>
        </main >
    )
}

export default Login