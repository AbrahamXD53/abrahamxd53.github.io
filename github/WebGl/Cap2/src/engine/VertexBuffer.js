"use strict";
var gEngine=gEngine || {};

//Objeto
gEngine.VertexBuffer= (function()
{
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,        
        0.5, -0.5, 0.0,        
        -0.5, -0.5, 0.0 
    ];
    var mSquareVertexBuffer=null;
    var getGLVertexRef=function (){ return mSquareVertexBuffer; };
    var initialize= function ()
    {
      var gl= gEngine.Core.getGL();
      
      //create
      mSquareVertexBuffer = gl.createBuffer();
      
      //activate vertex buffer
      gl.bindBuffer(gl.ARRAY_BUFFER,mSquareVertexBuffer);
      
      //Cargar los vertices al buffer
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
      
    };
    var mPublic = {
        initialize:initialize,
        getGLVertexRef:getGLVertexRef
    };
    return mPublic;
}());