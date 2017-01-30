function BlueLevel()
{
    this.kSceneFile = "assets/BlueLevel.xml";
    this.kPortal="assets/minion_portal.jpg";
    this.kCollector="assets/minion_collector.jpg"
    this.mSqSet = [];
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);
BlueLevel.prototype.loadScene = function ()
{
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
            gEngine.TextFileLoader.eTextFileType.eXMLFile
            );
    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kCollector);
};
BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
    sceneParser.parseTextureSquares(this.mSqSet);
};
BlueLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([.3, .3, .3, 1]);
    this.mCamera.setupViewProjection();
    for (var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};
BlueLevel.prototype.update = function (time) {
    // ... identical to MyGame.update from previous project ...
    var xform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.LeftArrow))
    {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11)
        {
            // this is the left-boundary            
            gEngine.GameLoop.stop();
        }
    }
};
BlueLevel.prototype.unloadScene = function () {
    // unload the scene flie    
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kCollector);
    var nextLevel = new MyGame();
    // the next level    
    gEngine.Core.startScene(nextLevel);
};