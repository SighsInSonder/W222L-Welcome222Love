export default function Ground() {
    return <mesh rotation-x={ -Math.PI / 2 }>
        <planeGeometry args={[ 100, 100 ]} />
        <meshStandardMaterial color='#FFFFFF' />
    </mesh>
}