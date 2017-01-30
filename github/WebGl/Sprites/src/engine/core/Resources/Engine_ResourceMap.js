"use strict";

var gEngine = gEngine || {};

gEngine.ResourceMap = (function () {
    //Resource staorage
    var mResourceMap = {};
    //numero de operaciones
    var mNumOutstandingLoads = 0;
    //callback
    var mLoadCompleteCallback = null;

    var MapEntry = function (rName)
    {
        this.mAsset = rName;
        this.mRefCount = 1;
    };
    var _checkForAllLoadCompleted = function () {
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null))
        {
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        //check if its done
        _checkForAllLoadCompleted();
    };
    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName);
        //agregar como pendiente
        ++mNumOutstandingLoads;
    };
    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };
    var isAssetLoaded = function (rName)
    {
        return (rName in mResourceMap);
    };
    var incAssetRefCount = function (rName) {
        mResourceMap[rName].mRefCount += 1;
    };
    var retriveAsset = function (rName)
    {
        var r = null;
        if (rName in mResourceMap)
            r = mResourceMap[rName].mAsset;
        else
            alert("gEngine.retriveAsset: [" + rName + "] not in map");
        return r;
    };
    var unloadAsset = function (rName)
    {
        var c = 0;
        if (rName in mResourceMap) {
            mResourceMap[rName].mRefCount -= 1;
            c = mResourceMap[rName].mRefCount;
            if (c === 0) {
                delete mResourceMap[rName];
            }
        }
        return c;
    };
    var mPublic = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        retriveAsset: retriveAsset,        
        retrieveAsset: retriveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded,
        incAssetRefCount: incAssetRefCount
    };
    return mPublic;
}());
;