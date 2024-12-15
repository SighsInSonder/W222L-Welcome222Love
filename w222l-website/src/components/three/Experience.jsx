import { OrbitControls } from '@react-three/drei'

export default function Experience() {
    return <>
        <OrbitControls />

        <ambientLight intensity={ 2 } />
        <directionalLight position={[ 1, 2, 3 ]} intensity={ 2 } />

        <mesh>
            <boxGeometry />
            <meshStandardMaterial color='#F7B9D7' />
        </mesh>
    </>
}