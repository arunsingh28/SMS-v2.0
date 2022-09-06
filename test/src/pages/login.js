import React from 'react'

const Login = () => {
    const errRef = React.useRef()


    const [email, setUser] = React.useState('')
    const [password, setPwd] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [success, setSuccess] = React.useState(false)

    React.useEffect(() => {
        errRef.current.focus()
    }, [])

    React.useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.table(email, password)
        await fetch('https://sms-api-1.herokuapp.com/api/login', {
            method: 'post',
            headers: {
                'content-Type': "application/json"
            },
            body: JSON.stringify(email, password),
            credentials: 'include'
        }).then(d => d.json())
            .then(res => console.log(res))
    }
    return (
        <main>
            <div class="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
                <div class="bg-white md:shadow-lg shadow-none rounded p-6 w-96" >
                    <h1 class="text-3xl font-bold leading-normal" >Sign in</h1>
                    <p class="text-sm leading-normal">Stay updated on your professional world</p>
                    <p ref={errRef}>{errMsg}</p>
                    <form class="space-y-5 mt-5" onSubmit={handleSubmitLogin}>
                        <div class="mb-4 relative">
                            <input
                                value={email}
                                onChange={(e) => setUser(e.target.value)}
                                class="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none" type="text" autofocus
                                placeholder='username'
                                autoComplete />
                        </div>
                        <div class="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
                            <input
                                value={password}
                                onChange={(e) => setPwd(e.target.value)}
                                class="w-full rounded px-3 pt-5 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500" type="password"
                                placeholder='Password'
                            />
                            <a class="text-sm font-bold text-blue-700 hover:bg-blue-100 rounded-full px-2 py-1 mr-1 leading-normal cursor-pointer">show</a>
                        </div>
                        <div class="-m-2">
                            <a class="font-bold text-blue-700 hover:bg-blue-200 hover:underline hover:p-5 p-2 rounded-full" href="#">Forgot password?</a>
                        </div>
                        <button class="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white py-3 font-medium">Sign in</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login