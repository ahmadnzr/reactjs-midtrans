import React, { useCallback, useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'

interface Props {
  children: React.ReactNode
}
const Wrapper = ({ children }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)

  const onPressLogin = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          setLoading(false)
          console.log(userCred.user)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
        })
    },
    [email, password, auth],
  )

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setUser(user)
      }
    })
  }, [auth, user])

  if (user) {
    return <>{children}</>
  }

  if (loading) {
    return <p>loading....</p>
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p>LOGIN SEK BOSS...</p>
      <form action='' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email...'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={onPressLogin} disabled={!email || !password}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Wrapper
