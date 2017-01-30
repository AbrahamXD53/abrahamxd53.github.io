var gEngine = gEngine || {};

gEngine.TextFileLoader=(function () {
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1,
        eTMXFile: 2
    });
    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName)))
        {
            //Empezar la carga
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            //hacer la peticion al servidor
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200))
                {
                    alert(fileName + ": loading failed! [To execute this you need a web-server]");
                }
            };
            req.open('GET', fileName, true);
            req.setRequestHeader('Content-Type', 'text*/*xml');

            req.onload = function () {
                var fileContent = null;
                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, 'text/xml');
                } else {
                    fileContent = req.responseText;
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);

                if ((callbackFunction !== null) && (callbackFunction !== undefined))
                    callbackFunction(fileName);
            };
            req.send();
        } else {
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
                    callbackFunction(fileName);
        }
    };
    var unloadTextFile = function (fileName)
    {
        gEngine.ResourceMap.unloadAsset(fileName);
    };
    var mPublic = {
        unloadTextFile:unloadTextFile,
        loadTextFile:loadTextFile,
        eTextFileType:eTextFileType
    };
    return mPublic;
}());