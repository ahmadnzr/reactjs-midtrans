import React, { useEffect } from 'react'

declare global {
  interface Window {
    snap: any
  }
}

const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY

const App = () => {
  const totalAmounts = 10000000

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
      onSuccess: () => {console.log('success')},
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
      <h2>
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
          totalAmounts,
        )}
      </h2>
      <button
        style={{
          padding: '8px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          background: 'blue',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={onPressPay}
      >
        PAY
      </button>
    </div>
  )
}

export default App
