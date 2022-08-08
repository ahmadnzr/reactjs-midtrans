import React from 'react'

interface Props {
  onPress: () => void
}
const ButtonPay = ({ onPress }: Props) => {
  const totalAmounts = 10000000

  return (
    <div style={{textAlign: 'center'}}
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
        onClick={onPress}
      >
        PAY
      </button>
    </div>
  )
}

export default ButtonPay
