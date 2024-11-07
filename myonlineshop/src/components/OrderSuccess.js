import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Success Message */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-green-500 text-6xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order Successful!</h2>
        <p className="text-gray-700">Thank you for your purchase.</p>

        {/* Order Summary */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <p className="text-gray-700">Order Number: <strong>#123456</strong></p>
          <p className="text-gray-700">Total Amount: <strong>$199.99</strong></p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            className=""
            component={Link}
            to="/userdashboard"
            variant='contained'
          >
            View Orders
          </Button>
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
