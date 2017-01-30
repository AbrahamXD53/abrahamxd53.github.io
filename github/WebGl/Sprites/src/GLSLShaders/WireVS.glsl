varying vec3 vBC;
attribute vec3 aSquareVertexPosition, barycentric;
uniform mat4 uModelTransform, uViewProjTransform;
void main(){
    vBC = barycentric;
    gl_Position = uModelTransform * uViewProjTransform * vec4(aSquareVertexPosition, 1.0);
}
