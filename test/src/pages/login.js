import React from 'react'
import AuthContext from '../context/authProvider'

const Login = () => {
    const errRef = React.useRef()

    const { setAuth } = React.useContext(AuthContext)

    const [email, setUser] = React.useState('')
    const [password, setPwd] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [success, setSuccess] = React.useState(false)

    const [result, setResult] = React.useState()

    React.useEffect(() => {
        errRef.current.focus()
    }, [])

    React.useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.table(email, password)
        const result = await fetch('http://localhost:8080/api/login', {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password }),
        }).then(d => d.json())
        if (result.code == 200) {
            const name = result?.data?.name;
            const accessToken = result?.accessToken;
            window.confirm(accessToken)
            localStorage.setItem('acessToken', 'Bearer ' + accessToken)
            setAuth({ email, name, authState: true })
            setErrMsg(result?.message)
            setResult(result)
        } else {
            setAuth({ authState: true })
            setErrMsg(result?.message)
        }
    }
    console.log(result)
    return (
        <main>
            <div className="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
                <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96" >
                    <h1 className="text-3xl font-bold leading-normal" >Sign in</h1>
                    <p className="text-sm leading-normal">Stay updated on your professional world</p>
                    <p className='text-red-700' ref={errRef}>{errMsg}</p>
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
                            <a className="font-bold text-blue-700 hover:bg-blue-200 hover:underline hover:p-5 p-2 rounded-full" href="#">Forgot password?</a>
                        </div>
                        <button className="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white py-3 font-medium">Sign in</button>
                    </form>
                    <div className='mt-10'>
                        {result && result.data.name}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login