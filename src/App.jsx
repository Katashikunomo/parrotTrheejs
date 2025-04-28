// // src/App.jsx
// import React, { useEffect } from 'react'
// import { Canvas, useThree } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import * as THREE from 'three'
// import CenteredModel from './CenteredModel.jsx'
// import ForestScene from './ForestScene.jsx'

// function CameraSetter() {
//   const { camera, scene } = useThree()

//   useEffect(() => {
//     const box = new THREE.Box3().setFromObject(scene)
//     const center = new THREE.Vector3()
//     box.getCenter(center)

//     camera.position.set(center.x - 100, center.y + 20, center.z + 30)
//     camera.lookAt(center)
//   }, [camera, scene])

//   return <OrbitControls makeDefault />
// }

// export default function App() {
//   useEffect(() => {
//     alert('Este sitio hace uso del micrófono')
//   }, [])

//   return (
//     <div className="bg-blue-500 h-screen w-screen flex justify-center items-center">
//       <Canvas shadows camera={{ fov: 60 }}>
//         <ambientLight intensity={0.4} />
//         <directionalLight
//           castShadow
//           position={[3, 5, 5]}
//           intensity={2}
//           shadow-mapSize-width={3024}
//           shadow-mapSize-height={5024}
//         />

//         {/* Bosque en el fondo */}
//         <ForestScene
//           url="/models/escegrassforest.glb"
//           scale={720.5}
//           position={[0, 0.2, 0.6]}
//           rotationX={1}
//           rotationY={1}
//           rotationZ={-1}
//         />

//         {/* Loro en primer plano */}
//         <CenteredModel
//           url="/models/parrot-red.glb"
//           scale={0.2}
//           position={[0, 0.6, 0.4]}
//           rotation={[10, 0, 0]}
//         />

//         <CameraSetter />
//       </Canvas>
//     </div>
//   )
// }


/* src/App.jsx */
import React, { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CenteredModel from './CenteredModel'
import ForestScene from './ForestScene'
import AlertModal from './components/AlertModal'
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
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Abrir el modal una sola vez al montar
    setShowModal(true)
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      {/* Modal en un portal para evitar re-mounts dentro del Canvas */}
      {showModal && (
        <ModalPortal>
          <AlertModal
            title="Permiso de micrófono"
            message="Este sitio hace uso del micrófono para las interacciones de voz."
            onClose={handleClose}
          />
        </ModalPortal>
      )}

      {/* Contenedor de la escena 3D */}
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
