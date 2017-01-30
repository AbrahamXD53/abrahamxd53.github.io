"use strict";

var gEngine = gEngine || {};

gEngine.ResourceMap=(function (){
    //Resource staorage
    var mResoourceMap={};
    //numero de operaciones
    var mNumOutstandingLoads = 0;
    //callback
    var mLoadCompleteCallback = null;
    
    var MapEntry=function (rName)
    {
        this.mAsset = rName;  
    };
    var _checkForAllLoadCompleted = function (){
        if((mNumOutstandingLoads===0) && (mLoadCompleteCallback!==null))
        {
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback=null;
            funToCall();
        }
    };
    var setLoadCompleteCallback= function (funct){
        mLoadCompleteCallback=funct;
      //check if its done
        _checkForAllLoadCompleted();
    };
    var asyncLoadRequested = function(rName){
        mResoourceMap[rName] = new MapEntry(rName);
        //agregar como pendiente
        ++mNumOutstandingLoads;
    };
    var asyncLoadCompleted = function (rName,loadedAsset){
        if(!isAssetLoaded(rName))
            alert("gEngine.asyncLoadCompleted: ["+ rName + "] not in map!");
        mResoourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };
    var isAssetLoaded = function (rName)
    {
        return (rName in mResoourceMap);
    };
    var retriveAsset = function (rName)
    {
        var r=null;
        if (rName in mResoourceMap)
            r= mResoourceMap[rName].mAsset;
        else
            alert("gEngine.retriveAsset: [" + rName + "] not in map");
        return r;
    };
    var unloadAsset = function (rName)
    {
        if(rName in mResoourceMap)
            delete mResoourceMap[rName];
    };
    var mPublic={
        asyncLoadRequested:asyncLoadRequested,
        asyncLoadCompleted:asyncLoadCompleted,
        setLoadCompleteCallback:setLoadCompleteCallback,
        
        retriveAsset:retriveAsset,
        unloadAsset:unloadAsset,
        isAssetLoaded:isAssetLoaded
    };
    return mPublic;
}());;