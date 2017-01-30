"use strict";
var gEngine = gEngine || {};

//Objeto
gEngine.VertexBuffer = (function () {
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0];
    var verticesOfTriangle = [
        0, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0];
    var mTriangleVertexBuffer = null;
    var mSquareVertexBuffer = null;
    var mTextureCoordBuffer = null;
    var textureCoordinates=[
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0,
    ];
    var textureCoordinatesTriangle=[
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0,
        //0.0, 0.0,
    ];
    var getGLVertexRef = function () {
        return mSquareVertexBuffer;
    };
    var initialize = function ()
    {
        var gl = gEngine.Core.getGL();

        //create
        mSquareVertexBuffer = gl.createBuffer();

        //activate vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        //Cargar los vertices al buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

        mTextureCoordBuffer= gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER,mTextureCoordBuffer);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
    
       mTriangleVertexBuffer = gl.createBuffer();
       gl.bindBuffer(gl.ARRAY_BUFFER,mTriangleVertexBuffer);
       gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticesOfTriangle),gl.STATIC_DRAW);
    };
    var getTriangleGLVertexRef= function()
    {
        return mTriangleVertexBuffer;
    };
    var getGLTextCoordRef=function (){ return mTextureCoordBuffer; };
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTextCoordRef:getGLTextCoordRef,
        getTriangleGLVertexRef:getTriangleGLVertexRef
    };
    return mPublic;
}());