/*jslint node: true */
"use strict";

function Renderable()
{
    this.mShader=gEngine.DefaultResources.getConstColorShader();
    this.mColor=[1,1,1,1];
    this.mXform = new Transform();
}
Renderable.prototype.draw=function (vpMatrix){
    var gl= gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor,vpMatrix);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
Renderable.prototype._setShader = function (s) { this.mShader= s};
Renderable.prototype.getXform = function() { return this.mXform; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype.setColor = function (color) { this.mColor=color; };



