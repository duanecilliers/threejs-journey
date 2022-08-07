uniform vec3 uDeptchColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
  float mixStrength = vElevation * uColorMultiplier + uColorOffset;
  vec3 color = mix(uDeptchColor, uSurfaceColor, mixStrength);
  gl_FragColor = vec4(color, 1.0);
}