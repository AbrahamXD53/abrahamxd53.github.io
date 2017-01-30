function TextureShader(vertexShaderPath,fragmentShaderPath)
{
    SimpleShader.call(this,vertexShaderPath,fragmentShaderPath);
    this.mShaderTextureCoordAttribute = null;
    
    var gl= gEngine.Core.getGL();
   
    
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader,"aTextureCoordinate");
    
}
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

TextureShader.prototype.activateShader= function (pixelColor,vpMatrix)
{
    SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);
    
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTextCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    
};