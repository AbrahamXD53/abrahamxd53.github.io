precision mediump float;   // sets the precision for floating point computation 
uniform vec4 uPixelColor;  // to transform the vertex position 
#extension GL_OES_standard_derivatives : enable
float edgeFactor(){
    vec3 d = fwidth(vBC);
    vec3 a3 = smoothstep(vec3(0.0), d*1.5, vBC);
    return min(min(a3.x, a3.y), a3.z);
}
void main(void) {    
    gl_FragColor = vec4(0.0, 0.0, 0.0, (1.0-edgeFactor())*0.95);; 
}

