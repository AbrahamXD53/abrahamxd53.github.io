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
            
            while ((mLagTime>=kMPF) && mIsLoopRunning){
                gEngine.Input.update();
                this.update(mElapsedTime);
                mLagTime-=kMPF;
            }
            
            this.draw();
        }
    };
    var start = function(myGame)
    {
        mMyGame=myGame;
        
        mPreviousTime=Date.now();
        mLagTime=0;
 
        mIsLoopRunning=true;
        
        requestAnimationFrame( function (){ _runLoop.call(mMyGame); });
    }
    var mPublic = {
        start:start,
    };
    return mPublic;
}());