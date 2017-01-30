function Camera(wcCenter, wcWidth, viewPortArray) {
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewPortArray; //[x,y,width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    //Matrices de transformacion
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    //Color de fondo
    this.mBgColor = [0.3921, 0.5843, 0.9294,1];
}
Camera.prototype.setWCCenter = function (xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function () {
    return this.mWCCenter;
};
Camera.prototype.setWidth = function (width) {
    this.mWCWidth = width;
};
Camera.prototype.setViewport = function (viewportArray) {
    this.mViewport = viewportArray;
};
Camera.prototype.getViewport = function () {
    return this.mViewport;
};
Camera.prototype.setBackgroundColor = function (newColor) {
    this.mBgColor = newColor;
};
Camera.prototype.getBackgroundColor = function () {
    return this.mBgColor;
};
Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();
    //configurar el vp
    gl.viewport(
            this.mViewport[0],
            this.mViewport[1],
            this.mViewport[2],
            this.mViewport[3]
            );
    gl.scissor(
            this.mViewport[0],
            this.mViewport[1],
            this.mViewport[2],
            this.mViewport[3]
            );

    gl.clearColor(this.mBgColor[0],
            this.mBgColor[1],
            this.mBgColor[2],
            this.mBgColor[3]);

    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    //definir la matriz de proyeccion
    mat4.lookAt(this.mViewMatrix,
            [this.mWCCenter[0], this.mWCCenter[1], 10],
            [this.mWCCenter[0], this.mWCCenter[1], 0],
            [0, 1, 0]
            );
    var halfWCWidth = this.mWCWidth * 0.5;
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];

    mat4.ortho(this.mProjMatrix,
            -halfWCWidth,
            halfWCWidth,
            -halfWCHeight,
            halfWCHeight,
            this.mNearPlane,
            this.mFarPlane
            );

    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix); 
};



