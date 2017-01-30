var gEngine = gEngine || {};
gEngine.AudioClips = (function () {
    var mAudioContext = null;
    var mBgAudioNode = null;
    var initAudioContext = function () {
        try {
            var AudioContext = window.getAudioContext || window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
        } catch (e) {
            alert("Web audio is not supported");
        }
    };
    var loadAudio = function (clipName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(clipName)))
        {
            gEngine.ResourceMap.asyncLoadRequested(clipName);

            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(clipName + ": loading failed! ");
                }
            };
            req.open('GET', clipName, true);
            //peticion de datos binarios
            req.responseType = 'arraybuffer';

            req.onload = function () {
                mAudioContext.decodeAudioData(req.response, function (buffer) {
                    gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
                }
                );
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };
    var unloadAudio = function (clipName) {
        gEngine.ResourceMap.unloadAsset(clipName);
    };
    var playACue = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retriveAsset(clipName);
        if (clipInfo !== null) {
            var sourceNode = mAudioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(mAudioContext.destination);
            sourceNode.start(0);
        }
    };
    var playBackgroundAudio = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retriveAsset(clipName);
        if (clipName !== null)
        {
            stopBackgroundAudio();
            mBgAudioNode = mAudioContext.createBufferSource();
            mBgAudioNode.buffer = clipInfo;
            mBgAudioNode.connect(mAudioContext.destination);
            mBgAudioNode.loop = true;
            mBgAudioNode.start(0);
        }
    };
    var stopBackgroundAudio = function () {
        if (mBgAudioNode !== null) {
            mBgAudioNode.stop(0);
            mBgAudioNode = null;
        }
    };
    var isBackgroundAudioPlaying = function () {
        return (mBgAudioNode !== null);
    };
    var mPublic = {
        initAudioContext:initAudioContext,
        loadAudio:loadAudio,
        unloadAudio:unloadAudio,
        playACue:playACue,
        playBackgroundAudio:playBackgroundAudio,
        stopBackgroundAudio:stopBackgroundAudio,
        isBackgroundAudioPlaying:isBackgroundAudioPlaying
    };
    return mPublic;
}());