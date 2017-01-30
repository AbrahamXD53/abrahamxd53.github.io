"use strict";
//asignar asegurandose de no reescribir
var gEngine = gEngine || {};

gEngine.Core = (function () {
    var mGL = null;
    var getGL = function () {
        return mGL;
    };
    var mCanvas = null;
    var getCanvas = function () {
        return mCanvas;
    };
    var _initializeWebGL = function (htmlCanvasID)
    {
        mCanvas = document.getElementById(htmlCanvasID);
        mGL = mCanvas.getContext("webgl", {alpha: false}) || canvas.getContext("experimental-webgl", {alpha: false});
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

        if (mGL === null)
        {
            document.write("</br><b>No se puede inicializar</b>");
            return;
        }
        //Call vertexbuffer
    };
    var inheritPrototype = function (subClass, superClass)
    {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    var startScene = function (myGame)
    {
        myGame.loadScene.call(myGame);
        //myGame.initialize.call(myGame);
        gEngine.GameLoop.start(myGame);
    };
    var initializeEngineCore = function (htmlCanvasID, myGame)
    {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();
        gEngine.DefaultResources.initialize(function () {
            startScene(myGame);
        });
    };
    var clearCanvas = function (color)
    {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);

    };
    var mPublic = {
        getGL: getGL,
        clearCanvas: clearCanvas,
        initializeEngineCore: initializeEngineCore,
        startScene: startScene,
        inheritPrototype: inheritPrototype,
        getCanvas: getCanvas
    };
    return mPublic;
}());
