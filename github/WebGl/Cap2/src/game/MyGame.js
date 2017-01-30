function MyGame(htmlCanvasId)
{
    this.mShader=null;
    gEngine.Core.initializeWebGL(htmlCanvasId);
    this.mShader=new SimpleShader("src/GLSLShaders/SimpleVS.glsl", "src/GLSLShaders/SimpleFS.glsl");
    gEngine.Core.clearCanvas([.3,.3,.3,1]);
    this.mShader.activateShader([1,1,0,.5]);
    
    var gl= gEngine.Core.getGL();
    //solicitar la geometria en el indice 0
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    
}