function MyGameDFR(htmlCanvasID)
{
    this.mConstColorShader = null;

    // variables for the squares
    this.mBlueSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Setup the camera
    this.mCamera = new Camera(
            vec2.fromValues(20, 60), // center of the WC
            20, // width of WC
            [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
            );

    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    // Step D: Create the Renderable objects:
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

    // Step E: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas

    // Step F: Starts the drawing by activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();

    // Step G: Draw the blue square
    // Centre Blue, slightly rotated square
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2); // In Radians
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);

    // Step H: Draw the center and the corner squares
    // centre red square
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // top left
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);

    // top right
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);

    // bottom right
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);

    // bottom left
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
}
function MyGame(htmlCanvasID)
{
    this.mConstColorShader = null;

    this.mWhiteSq = null;
    this.mRedSq = null;

    this.mCamera = null;

    gEngine.Core.initializeEngineCore(htmlCanvasID);
    //gEngine.Core.clearCanvas([.5,.6,.9,1]);

    this.initialize();

}
MyGame.prototype.initialize = function ()
{
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // center of the WC
            40, // width of WC
            [0, 0, 640, 480]         // viewport (orgX, orgY, width, height)
            );
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");

    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.getXform().setPosition(0, 0);
    this.mWhiteSq.getXform().setSize(5, 5);

    gEngine.GameLoop.start(this);
};
MyGame.prototype.update = function (x)
{
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.RightArrow)) {
        if (whiteXform.getXPos() > 35)
            whiteXform.setPosition(8, whiteXform.getYPos());
        whiteXform.incXPosBy(deltaX);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.LeftArrow)) {
        //if (whiteXform.getXPos() < 8)
        //    whiteXform.setPosition(35, whiteXform.getYPos());
        whiteXform.incXPosBy(-deltaX);
    }
    //console.log(x);
    whiteXform.incRotationByDegree(20*x/1000);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.UpArrow))
        whiteXform.incRotationByDegree(1);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keyCode.DownArrow))
        whiteXform.incRotationByDegree(-1);
};
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([.3, .3, .3, 1]);
    this.mCamera.setupViewProjection();
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());
};