"use strict";
//asignar asegurandose de no reescribir
var gEngine=gEngine || {};

gEngine.Core=(function (){
    var mGL=null;
    var getGL = function (){ return mGL; };
    var _initializeWebGL = function (htmlCanvasID)
    {
      var canvas= document.getElementById(htmlCanvasID);
      mGL=canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if(mGL===null)
      {
          document.write("</br><b>No se puede inicializar</b>");
          return;
      }
      //Call vertexbuffer
    };
    var initializeEngineCore=function (htmlCanvasID)
    {
       _initializeWebGL(htmlCanvasID);
       gEngine.VertexBuffer.initialize();
       gEngine.Input.initialize();
    }
    var clearCanvas=function(color)
    {
      mGL.clearColor(color[0],color[1],color[2],color[3]);
      mGL.clear(mGL.COLOR_BUFFER_BIT);
      
    };
    var mPublic={
      getGL:getGL,
      clearCanvas:clearCanvas,
      initializeEngineCore:initializeEngineCore
    };
    return mPublic;
}());
