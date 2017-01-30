var gEngine = gEngine || {};

gEngine.DefaultResources = (function () {
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    var mConstColorShader = null;

    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";
    var mTextureShader = null;
    
    var _getTextureShader = function ()
    {
        return mTextureShader;
    };

    var _getConstColorShader = function () {
        return mConstColorShader;
    };

    //load shaders
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS,kTextureFS);
        callBackFunction();
    };

    //comenzar la cargar
    var _initialize = function (callbackFunction) {
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        
        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callbackFunction);
        });
        
    };
    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader,
        getTextureSahder: _getTextureShader
    };
    return mPublic;
}());