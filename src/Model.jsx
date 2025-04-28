// // src/Model.jsx
// import React, { useRef, useEffect } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';

// export default function Model({ url }) {
//   const group = useRef();
//   const { scene, animations } = useGLTF(url);
//   const { actions } = useAnimations(animations, group);

//   useEffect(() => {
//     // Reproducir todas las animaciones disponibles
//     Object.values(actions).forEach((action) => {
//       action.reset().fadeIn(0.5).play();
//     });
//     return () => {
//       Object.values(actions).forEach((action) => {
//         action.fadeOut(0.5);
//       });
//     };
//   }, [actions]);

//   return <primitive ref={group} object={scene} dispose={null} />;
// }

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ url }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    Object.values(actions).forEach(action =>
      action.reset().fadeIn(0.5).play()
    )
  }, [actions])

  return <primitive ref={group} object={scene} dispose={null} />
}
