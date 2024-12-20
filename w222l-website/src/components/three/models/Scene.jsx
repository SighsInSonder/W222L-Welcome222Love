import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Scene( props ) {
  const { nodes, materials } = useGLTF( '/models/scene.glb' )
  return (
    <group { ...props } dispose={ null }>
      <group>

        <mesh geometry={ nodes[ 'floor-table' ].geometry } material={ materials.table } />
        <mesh geometry={ nodes[ 'table-cloth' ].geometry } material={ materials[ 'table-cloth' ] } />
        <mesh geometry={ nodes[ 'card-stack' ].geometry } material={ materials[ 'card-deck' ] } />
        <mesh geometry={ nodes[ 'candle-tray' ].geometry } material={ materials[ 'candle-tray' ] } />

        <group>
          <mesh geometry={ nodes.Cylinder001.geometry } material={ materials.candle } />
          <mesh geometry={ nodes.Cylinder001_1.geometry } material={ materials[ 'candle-wick' ] } />
        </group>

        <group>
          <mesh geometry={ nodes.Cylinder002.geometry } material={ materials.candle } />
          <mesh geometry={ nodes.Cylinder002_1.geometry } material={ materials[ 'candle-wick' ] } />
        </group>
        
        <group>
          <mesh geometry={ nodes.Cylinder.geometry } material={ materials.candle } />
          <mesh geometry={ nodes.Cylinder_1.geometry } material={ materials[ 'candle-wick' ] } />
        </group>

      </group>
    </group>
  )
}

useGLTF.preload( '/models/scene.glb' )
