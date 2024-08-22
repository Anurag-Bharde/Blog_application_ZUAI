import React, { useRef } from 'react'

function Modal({ OnClose, OnConfirm, children }) {
  const modalRef = useRef()

  const closeModal = (e) => {
    if (modalRef.current === e.target) OnClose();
  }

  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg flex flex-col gap-5'>
        {children}
        <div className='flex justify-end gap-2'>
          <button className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300' onClick={OnClose}>Cancel</button>
          <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={OnConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal