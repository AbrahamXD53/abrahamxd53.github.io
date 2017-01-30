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
    };
    var update = function ()
    {
        for (var i = 0; i < keyCode.LastKeyCode; i++) {
            mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
    }
    var isKeyPressed= function (keyCod){
        return mIsKeyPressed[keyCod];
    };
    var isKeyClicked= function (keyCod)
    {
        return mIsKeyClicked[keyCod];  
    };
    var mPublic = {
        initialize:initialize,
        update:update,
        isKeyPressed:isKeyPressed,
        isKeyClicked:isKeyClicked,
        keyCode:keyCode
    };
    return mPublic;
}());