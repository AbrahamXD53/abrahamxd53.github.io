var gEngine = gEngine || {};

gEngine.Input = (function () {
    var keyCode = {
        LeftArrow: 37,
        UpArrow: 38,
        RightArrow: 39,
        DownArrow: 40,
        SpaceBar: 32,
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five: 53,
        Six: 54,
        Seven: 55,
        Eight: 56,
        Nine: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        R: 82,
        S: 83,
        W: 87,
        LastKeyCode: 222
    };
    //Prev key state
    var mKeyPreviousState = [];
    var mIsKeyPressed = [];
    var mIsKeyClicked = [];
    var mTouches = [];
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true;
    };
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };

    var initialize = function ()
    {
        for (var i = 0; i < keyCode.LastKeyCode; i++) {
            mIsKeyPressed[i] = false;
            mKeyPreviousState[i] = false;
            mIsKeyClicked[i] = false;
        }
        //Agregar los listeners
        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);

        var canvas = gEngine.Core.getCanvas();
        canvas:addEventListener("touchstart", onTouchStart, true);
        canvas:addEventListener("touchmove", onTouchMove, true);
        canvas:addEventListener("touchend", onTouchEnd, true);

    };
    var update = function ()
    {
        for (var i = 0; i < keyCode.LastKeyCode; i++) {
            mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }

    };
    var onTouchStart = function (event)
    {
        event.preventDefault();
        for (var i = 0; i < event.touches.length; i++) {
            //var touch= event.touches[i];
            //console.log(touch.screenX+" |"+touch.identifier+": "+touch.pageX+" : "+touch.pageY);
        }
        mTouches = event.touches;
        for (var i = 0; i < event.touches.length; i++) {
            mTouches[i].phase = "began";
        }
        for (var i = 0; i < mTouches.length; i++) {
            if (mTouches[i].phase === undefined)
                delete mTouches[i];
        }
    };
    var onTouchMove = function (event)
    {
        event.preventDefault();
        mTouches = event.touches;
        for (var i = 0; i < mTouches.length; i++) {
            //mTouches[i] = event.touches[i];
            //mTouches[i].clientX = event.touches[i].clientX;
            //mTouches[i].clientY = event.touches[i].clientY;
            mTouches[i].phase = "moved";
        }
        for (var i = 0; i < mTouches.length; i++) {
            if (mTouches[i].phase === undefined)
                delete mTouches[i];
        }
    };
    var LateUpdate = function ()
    {
        delete mTouches;
        /*for (var i = 0; i < mTouches.length; i++) {
         if(mTouches[i].phase===undefined)
         delete mTouches[i];
         if(mTouches[i].phase==="began")
         mTouches[i].phase="ended";
         }*/
    };
    var onTouchEnd = function (event)
    {
        event.preventDefault();
        mTouches = event.changedTouches;
        for (var i = 0; i < event.changedTouches.length; i++) {
            mTouches[i].phase = "began";
        }
        for (var i = 0; i < mTouches.length; i++) {
            if (mTouches[i].phase === undefined)
                delete mTouches[i];
        }
    };
    var getTouches = function () {
        return mTouches;
    };
    var isKeyPressed = function (keyCod) {
        return mIsKeyPressed[keyCod];
    };
    var isKeyClicked = function (keyCod)
    {
        return mIsKeyClicked[keyCod];
    };
    var mPublic = {
        initialize: initialize,
        update: update,
        isKeyPressed: isKeyPressed,
        isKeyClicked: isKeyClicked,
        keyCode: keyCode,
        getTouches: getTouches,
        LateUpdate: LateUpdate
    };
    return mPublic;
}());