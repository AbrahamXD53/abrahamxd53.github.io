function MyGame()
{
    this.kBgClip = "assets/snd/BGClip.mp3";
    this.kCue = "assets/snd/MyGame_cue.wav";
    this.kPortal = "assets/minion_portal.png";
    this.kCollector = "assets/minion_collector.png";
    this.mPortal = null;
    this.mCollector;
    this.kSceneFile = "assets/level1.xml";
    this.mSqSet = [];
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);
MyGame.prototype.loadScene = function ()
{
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
            gEngine.TextFileLoader.eTextFileType.eXMLFile
            );
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kCollector);
    gEngine.Textures.loadTexture(this.kPortal);
};
MyGame.prototype.initialize = function ()
{
    var sceneParser = new SceneFileParser(this.kSceneFile);
    this.mCamera = sceneParser.parseCamera();
    this.mPortal = new TextureRenderable(this.kPortal);
    this.mPortal.setColor([1, 0, 0, 0]); // tints red
    this.mPortal.getXform().setPosition(25, 60);
    this.mPortal.getXform().setSize(96, 96);
    this.mCollector = new TextureRenderable(this.kCollector);
    this.mCollector.setColor([0, 0, 0, 0]); // No tinting
    this.mCollector.getXform().setPosition(15, 60);
    this.mCollector.getXform().setSize(96, 96);
    sceneParser.parseSquares(this.mSqSet);

    var cv = gEngine.Core.getCanvas();
    console.log(cv.x);
    //gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([.3, .3, .3, 1]);
    this.mCamera.setupViewProjection();
    var vpM = this.mCamera.getVPMatrix();
    for (var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(vpM);
    }
    this.mCollector.draw(vpM);
    this.mPortal.draw(vpM);
};
MyGame.prototype.update = function (time)
{
    var xform = this.mPortal.getXform();
    var deltaX = 100*time/1000;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.LeftArrow))
    {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < -250)
        {
            // this is the left-boundary            
            gEngine.GameLoop.stop();
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.RightArrow))
    {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 250)
        {
            // this is the left-boundary            
            gEngine.GameLoop.stop();
        }
    }
    var dr = gEngine.Input.isKeyPressed(gEngine.Input.keyCode.UpArrow) ? 1 : gEngine.Input.isKeyPressed(gEngine.Input.keyCode.DownArrow) ? -1 : 0;
    if (dr !== 0)
    {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incYPosBy(deltaX * dr);
    }
    var touches = gEngine.Input.getTouches();
    if (touches.length > 0)
    {
        for (var i = 0; i < touches.length; i++) {
           // console.log(this.mCamera.getPoint(touches[i]).y);
        }
        if (touches[0].phase === "began" || touches[0].phase === "moved")
        {
            touches[0].phase = "";
            this.mCollector.setColor([1, 0, 0, 0.5]);
            var pos=this.mCamera.getPoint(touches[0]);
            this.mCollector.getXform().setPosition(pos.x-320,240-pos.y);
            //console.log(pos.y,pos.y-240,this.mCollector.getXform().getYPos());
        } else
        {
            this.mCollector.setColor([1, 1, 1, 0]);
        }

    }
}
;
MyGame.prototype.unloadScene = function () {
    // unload the scene flie    
    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kCollector);
    gEngine.AudioClips.stopBackgroundAudio();
    //gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    var nextLevel = new BlueLevel();
    // the next level    
    gEngine.Core.startScene(nextLevel);
};