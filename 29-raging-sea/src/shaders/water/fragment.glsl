uniform vec3 uDeptchColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main() {
  vec3 color = mix(uDeptchColor, uSurfaceColor, vElevation);
  gl_FragColor = vec4(color, 1.0);
}