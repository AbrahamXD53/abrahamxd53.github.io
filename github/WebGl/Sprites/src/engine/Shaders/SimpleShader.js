function SimpleShader(vertexShaderId, fragmentShaderId) {
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor =null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    
    var gl = gEngine.Core.getGL();
    
    var vertexShader = this._compileShader(vertexShaderId, gl.VERTEX_SHADER);
    var fragmentShader = this._compileShader(fragmentShaderId, gl.FRAGMENT_SHADER);
    
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shaders");
        return null;
    }
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}
SimpleShader.prototype._compileShader = function (filePath,shaderType)
{
    var shaderSource, compiledShader;    
    var gl = gEngine.Core.getGL(); 
    shaderSource = gEngine.ResourceMap.retriveAsset(filePath);
    
    compiledShader = gl.createShader(shaderType); 
    
    gl.shaderSource(compiledShader, shaderSource);    
    gl.compileShader(compiledShader); 

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    } 
    return compiledShader;
};
SimpleShader.prototype._loadAndCompileShader= function(filePath, shaderType) {
    var shaderSource, compiledShader;    
    var gl = gEngine.Core.getGL(); 
    // Step A: Get the shader source from index.html    
    
    xmlReq = new XMLHttpRequest(); 
    xmlReq.open('GET', filePath, false); 
    try {    
        xmlReq.send(); 
    } 
    catch (error) {
        alert("Failed to load shader: " + filePath);
        return null; 
    } 
    shaderSource = xmlReq.responseText; 
    
    //shaderText = document.getElementById(id);    shaderSource = shaderText.firstChild.textContent; 
    
    // Step B: Create the shader based on the shader type: vertex or fragment    
    compiledShader = gl.createShader(shaderType); 
    // Step C: Compile the created shader    
    gl.shaderSource(compiledShader, shaderSource);    
    gl.compileShader(compiledShader); 
    // Step D: check for errors and return results (null if error)    
    // The log info is how shader compilation errors are typically displayed.    
    // This is useful for debugging the shaders.    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    } 
    return compiledShader;
};

SimpleShader.prototype.activateShader= function (pixelColor, vpMatrix)
{
  var gl= gEngine.Core.getGL();
  gl.useProgram(this.mCompiledShader);
  gl.uniformMatrix4fv(this.mViewProjTransform,false,vpMatrix );
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
    //alert(modelTransform);
    gl.uniformMatrix4fv(this.mModelTransform,false,modelTransform);
};

SimpleShader.prototype.getShader= function ()
{
    return this.mCompiledShader;  
};