/* src/components/ModalPortal.jsx */
import React from 'react'
import { createPortal } from 'react-dom'

export default function ModalPortal({ children }) {
  // Render children into document.body to keep the modal outside the Canvas hierarchy
  return createPortal(children, document.body)
}