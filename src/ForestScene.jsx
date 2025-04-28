// src/ForestScene.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function ForestScene({
  url,
  scale = 1.2,
  center = true,
  position = [0, 0, -1],
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
}) {
  const ref = useRef()
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (center && ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current)
      const c = new THREE.Vector3()
      box.getCenter(c)
      ref.current.position.sub(c)
    }
    ref.current.rotation.x = THREE.MathUtils.degToRad(rotationX)
    ref.current.rotation.y = THREE.MathUtils.degToRad(rotationY)
    ref.current.rotation.z = THREE.MathUtils.degToRad(rotationZ)
    ref.current.scale.set(scale, scale, scale)
    ref.current.position.add(new THREE.Vector3(...position))

    ref.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [center, scale, position, rotationX, rotationY, rotationZ])

  return <primitive ref={ref} object={scene} dispose={null} />
}
