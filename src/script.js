import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMapMarble.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
const geometry = new THREE.IcosahedronGeometry(80, 100);

// Materials

const material = new THREE.MeshPhysicalMaterial({
    opacity: 1,
    metalness: 0.05,
    roughness: 0.1,
    normalMap: normalTexture
})
material.color = new THREE.Color('rgba(255, 255, 255, 1)')

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Light1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

// Light2

const pointLight2 = new THREE.PointLight('rgba(255, 255, 255, 1)', 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 1

scene.add(pointLight2)

const light2 = gui.addFolder("Light 2")

light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-3).max(10).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(10).step(0.01)
light2.add(pointLight2, 'intensity').min(-3).max(3).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)

// Light3
const pointLight3 = new THREE.PointLight('rgba(173, 0, 0, 1)', 5)
pointLight3.position.set(-1, .5, .2)
pointLight3.intensity 
scene.add(pointLight3)
const light3 = gui.addFolder("Light 3")

light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'x').min(-3).max(10).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(10).step(0.01)
light3.add(pointLight3, 'intensity').min(-3).max(3).step(0.01)

const light1Color = {
    color: 0xff0000
}

const light2Color = {
    color: 0xff0000
}

const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper2)

light2.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light1Color.color)
    })

light3.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })


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
camera.position.x = 0
camera.position.y = 10
camera.position.z = 170
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

 let mouseX = 0
 let mouseY = 0

 let targetX = 0
 let targetY = 0

 const windowHalfX = window.innerWidth / 2;
 const windowHalfY = window.innerHeight / 2;

 let onDocumentMouseMove = (e) => {
     mouseX = (e.clientX - windowHalfX)
     mouseY = (e.clientY - windowHalfY)
 }

 let updateSphere = (event) => {
    
    sphere.scale.x += window.scrollY * .00001
    sphere.scale.y += window.scrollY * .00001
    sphere.scale.z += window.scrollY * .00001
 }

 window.addEventListener('scroll', updateSphere)
 
 document.addEventListener('mousemove', onDocumentMouseMove)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseX * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.x = .6 * elapsedTime
    sphere.rotation.z = .1 * elapsedTime
    
    sphere.rotation.x += .1 * (targetX - sphere.rotation.x)
    sphere.position.y += .5 * (targetY - sphere.rotation.y)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()