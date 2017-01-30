var gEngine = gEngine || {};

gEngine.GameLoop = (function () {
    var kFPS = 60;
    var kMPF = 1000 / kFPS;

    //Variables de tiempo
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    var mIsLoopRunning = false;

    var mMyGame = null;

    var _runLoop = function ( ) {
        if (mIsLoopRunning)
        {
            //hay que hacer el update
            requestAnimationFrame(function () {
                _runLoop.call(mMyGame);
            });

            //Verificar timers
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update(mElapsedTime);
                gEngine.Input.LateUpdate();
                mLagTime -= kMPF;
            }

            this.draw();
        } else {
            mMyGame.unloadScene();
        }
    };
    var _startLoop = function () {
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        mIsLoopRunning = true;
        requestAnimationFrame(function () {
            _runLoop.call(mMyGame);
        });
    };
    var start = function (myGame)
    {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
                function () {
                    mMyGame.initialize();
                    _startLoop();
                }
        );
    };
    var stop = function ()
    {
        mIsLoopRunning = false;
    };
    var mPublic = {
        start: start,
        stop: stop
    };
    return mPublic;
}());