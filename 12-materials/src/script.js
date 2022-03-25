import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
'/textures/environmentMaps/3/px.jpg',
'/textures/environmentMaps/3/nx.jpg',
'/textures/environmentMaps/3/py.jpg',
'/textures/environmentMaps/3/ny.jpg',
'/textures/environmentMaps/3/pz.jpg',
'/textures/environmentMaps/3/nz.jpg'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.FrontSide

// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

/**
 * More performant than phong, but lines are visible
 */
// const material = new THREE.MeshLambertMaterial()

/**
 * More polished feel than Lambert, but less performant
 */
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 2
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// /**
//  * Don't combine metalness and metalnessMap
//  * Don't combine roughnessMap and roughnessMapMap
//  */
// // material.metalness = 0.45
// // material.roughness = 0.65
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// /** must set transparent = true when using alphaMap */
// material.transparent = true
// // material.wireframe = true

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8
material.roughness = 0.2
material.envMap = environmentMapTexture

gui.add(material, 'metalness', 0.1, 1, 0.0001)
gui.add(material, 'roughness', 0.1, 1, 0.0001)
gui.add(material, 'aoMapIntensity', 0, 10, 0.0001)
gui.add(material, 'displacementScale', 0, 1, 0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(ambientLight, pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Animate
    sphere.rotation.x = 0.1 * elapsedTime
    sphere.rotation.y = 0.15 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    plane.rotation.y = 0.15 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime
    torus.rotation.y = 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()