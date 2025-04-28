import React, { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CenteredModel from './CenteredModel'
import ForestScene from './ForestScene'
import AlertModal from './components/AlertModal'
import InstructionsModal from './components/InstructionsModal'
import ModalPortal from './components/ModalPortal'

function CameraSetter() {
  const { camera, scene } = useThree()

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)

    camera.position.set(center.x - 100, center.y + 20, center.z + 30)
    camera.lookAt(center)
  }, [camera, scene])

  return <OrbitControls makeDefault />
}

export default function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [instructionsAvailable, setInstructionsAvailable] = useState(false) // 👈 para saber cuándo mostrar el botón flotante

  useEffect(() => {
    // Mostrar la alerta de micrófono al inicio
    setShowAlert(true)
  }, [])

  const handleAlertClose = () => {
    setShowAlert(false)
    setShowInstructions(true)
  }

  const handleInstructionsClose = () => {
    setShowInstructions(false)
    setInstructionsAvailable(true) // 👈 habilitar el botón flotante una vez cerrados los modales iniciales
  }

  const handleOpenInstructions = () => {
    setShowInstructions(true)
  }

  return (
    <>
      {/* Portal de alertas */}
      {showAlert && (
        <ModalPortal>
          <AlertModal
            title="Permiso de micrófono"
            message="Este sitio hace uso del micrófono para las interacciones de voz."
            onClose={handleAlertClose}
          />
        </ModalPortal>
      )}

      {/* Portal de instrucciones */}
      {showInstructions && (
        <ModalPortal>
          <InstructionsModal onClose={handleInstructionsClose} />
        </ModalPortal>
      )}

      {/* Botón flotante visible solo después de cerrar los modales iniciales */}
      {instructionsAvailable && (
        <button
          onClick={handleOpenInstructions}
          className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-40"
        >
          Instrucciones
        </button>
      )}

      {/* Canvas de la escena */}
      <div className="bg-blue-500 h-screen w-screen flex justify-center items-center">
        <Canvas shadows camera={{ fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[3, 5, 5]}
            intensity={2}
            shadow-mapSize-width={3024}
            shadow-mapSize-height={5024}
          />

          <ForestScene
            url="/models/escegrassforest.glb"
            scale={720.5}
            position={[0, 0.2, 0.6]}
            rotationX={1}
            rotationY={1}
            rotationZ={-1}
          />

          <CenteredModel
            url="/models/parrot-red.glb"
            scale={0.2}
            position={[0, 0.6, 0.4]}
            rotation={[10, 0, 0]}
          />

          <CameraSetter />
        </Canvas>
      </div>
    </>
  )
}
