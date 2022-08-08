import { signOut } from 'firebase/auth'
import React, { useCallback, useEffect } from 'react'
import ButtonPay from './ButtonPay'
import { auth } from './config/firebase'
import Wrapper from './Wrapper'

declare global {
  interface Window {
    snap: any
  }
}

const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY

const App = () => {
  useEffect(() => {
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const myMidtransClientKey = `${CLIENT_KEY}`
    const script = document.createElement('script')
    script.src = snapSrcUrl
    script.setAttribute('data-client-key', myMidtransClientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const onPressPay = async () => {
    const data = await fetch('http://127.0.0.1:8080/transaction')
    const res = await data.json()
    const snapToken = res.token
    window.snap.pay(snapToken, {
      onSuccess: () => {
        console.log('success')
      },
      onPending: (result: any) => {
        console.log('pending transaction', result)
      },
      onError: (result: any) => {
        console.log('error transaction', result)
      },
      onClose: () => {
        console.log('customer close the popup window without the finishing the payment')
      },
    })
  }

  const onPressLogout = useCallback(() => {
    signOut(auth)
      .then(() => {
        return alert('logout success')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Wrapper>
        <a href='' onClick={onPressLogout}>
          logout
        </a>
        <ButtonPay onPress={onPressPay} />
      </Wrapper>
    </div>
  )
}

export default App
