// src/hooks/useParrotActions.js
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import canto from '../../public/models/canto-p.mp3'
import atacarcanto from '../../public/models/atac.mp3'

export default function useParrotActions(groupRef, actions) {
  const [isFlying, setIsFlying] = useState(false)

  // Centrar y detener animaciones al montar
  useEffect(() => {
    Object.values(actions).forEach(a => a.stop())
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = new THREE.Vector3()
    box.getCenter(center)
    groupRef.current.position.sub(center)
  }, [actions, groupRef])

  // Reconocimiento de voz con logs detallados y resultado por index
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition no soportado')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'es-ES'
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onstart = () => console.log('SpeechRecognition iniciada')
    recognition.onresult = (event) => {
      const resultIndex = event.resultIndex
      const result = event.results[resultIndex]
      const transcriptRaw = result[0].transcript.trim()
      const transcript = transcriptRaw.toLowerCase()
      console.log(`SpeechRecognition onresult [${resultIndex}]:`, transcriptRaw)

      if (transcript.includes('volar')) {
        console.log('Comando voz: volar')
        setIsFlying(true)
        Object.values(actions).forEach(a => a.fadeIn(2).play())
      } else if (transcript.includes('parar')) {
        console.log('Comando voz: parar')
        setIsFlying(false)
        Object.values(actions).forEach(a => a.stop())
      } else if (transcript.includes('cantar')) {
        console.log('Comando voz: cantar')
        new Audio(canto).play()
      } else if (transcript.includes('atacar')) {
        console.log('Comando voz: atacar')
        new Audio(atacarcanto).play()
        Object.values(actions).forEach(a => a.fadeIn(4).play())
      }
    }
    recognition.onerror = (e) => console.error('SpeechRecognition Error:', e)
    recognition.onend = () => {
      console.log('SpeechRecognition finalizada, reiniciando...')
      recognition.start()
    }

    recognition.start()
    return () => {
      recognition.onend = null
      recognition.stop()
    }
  }, [actions])

  // Control por teclado (igual que antes)
  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase()
      console.log('Tecla presionada:', key)
      if (e.code === 'Space' || key === ' ') {
        console.log('Comando tecla: volar')
        setIsFlying(true)
        Object.values(actions).forEach(a => a.fadeIn(2).play())
      } else if (key === 'p') {
        console.log('Comando tecla: parar')
        setIsFlying(false)
        Object.values(actions).forEach(a => a.stop())
      } else if (key === 'c') {
        console.log('Comando tecla: cantar')
        new Audio(canto).play()
      } else if (key === 'a') {
        console.log('Comando tecla: atacar')
        new Audio(atacarcanto).play()
        Object.values(actions).forEach(a => a.fadeIn(4).play())
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [actions])

  return isFlying
}

