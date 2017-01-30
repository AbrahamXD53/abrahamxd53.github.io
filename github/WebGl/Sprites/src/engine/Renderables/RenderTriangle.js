"use strict";

function RenderTriangle()
{
    this.mShader=gEngine.DefaultResources.getConstColorShader();
    this.mColor=[1,1,1,1];
    this.mXform = new Transform();
}
RenderTriangle.prototype.draw=function (vpMatrix){
    var gl= gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor,vpMatrix);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 1, 3);
};
RenderTriangle.prototype._setShader = function (s) { this.mShader= s};
RenderTriangle.prototype.getXform = function() { return this.mXform; };
RenderTriangle.prototype.getColor = function () { return this.mColor; };
RenderTriangle.prototype.setColor = function (color) { this.mColor=color; };



