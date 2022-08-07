uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
  
  // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
  
  // Attributes
  // modelPosition.z += aRandom * 0.1;
  
  // Uniforms
  modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  modelPosition.y += sin(modelPosition.x * uFrequency.y - uTime) * 0.1;  

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vRandom = aRandom;
  vUv = uv;

  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}