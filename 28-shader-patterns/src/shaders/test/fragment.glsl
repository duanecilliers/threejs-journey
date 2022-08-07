varying vec2 vUv;

void main()
{
    // Pattern 3
    float strength = vUv.x;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}