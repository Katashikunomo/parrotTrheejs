// src/CenteredModel.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useParrotActions from './hooks/useParrotActions'

export default function CenteredModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)
  const isFlying = useParrotActions(group, actions)

  const { camera, scene: fullScene } = useThree()

  // Ajustes básicos de props
  useEffect(() => {
    if (!group.current) return
    group.current.rotation.set(
      THREE.MathUtils.degToRad(rotation[0]),
      THREE.MathUtils.degToRad(rotation[1]),
      THREE.MathUtils.degToRad(rotation[2])
    )
    group.current.scale.set(scale, scale, scale)
    group.current.position.set(...position)
  }, [scale, position, rotation])

  // Reset de la cámara cuando se detiene el vuelo
  useEffect(() => {
    if (!isFlying) {
      const box = new THREE.Box3().setFromObject(fullScene)
      const center = new THREE.Vector3()
      box.getCenter(center)

      camera.position.set(center.x - 100, center.y + 20, center.z + 30)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }
  }, [isFlying, camera, fullScene])

  // Orbita y cámara chase mientras vuela
  useFrame((_, delta) => {
    if (!isFlying || !group.current) return

    const axisY = new THREE.Vector3(0, 1, 0)
    group.current.position.applyAxisAngle(axisY, delta * 0.5)

    const targetPos = group.current.position.clone()
    const behindOffset = new THREE.Vector3(0, 10, -20).applyQuaternion(group.current.quaternion)
    const desiredCamPos = targetPos.clone().add(behindOffset)
    camera.position.lerp(desiredCamPos, 0.1)
    camera.lookAt(targetPos)
  })

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}