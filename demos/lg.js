PanoJSLG.MSG_BEYOND_MIN_ZOOM = null;
PanoJSLG.MSG_BEYOND_MAX_ZOOM = null;
PanoJSLG.INITIAL_PAN = { 'x' : 1, 'y' : .5 };
var viewer1 = null;

function createViewer( viewer, dom_id, url, prefix, w, h ) {
    if (viewer) return;
  
    var MY_URL      = url;
    var MY_PREFIX   = prefix;
    var MY_TILESIZE = 512;
    var MY_WIDTH    = w;
    var MY_HEIGHT   = h;
    var MY_MAXZOOM  = 5;

    PanoJSLG.CREATE_CONTROLS = false;
    PanoJSLG.CREATE_INFO_CONTROLS = false;
    PanoJSLG.CREATE_OSD_CONTROLS = false;
    PanoJSLG.CREATE_THUMBNAIL_CONTROLS = false;
    PanoJSLG.USE_MOUSE = false;
    
    var myProvider = new PanoJSLG.TileUrlProvider('','','');
    myProvider.assembleUrl = function(xIndex, yIndex, zoom) {
//        return MY_URL + '/' + MY_PREFIX + myPyramid.tile_filename( zoom, xIndex, yIndex );
        //window.console.log("zoom: " + zoom + "  xindex: " + xIndex);
        return MY_URL + '/' + MY_PREFIX + '-' + zoom + '-' + xIndex + '-' + yIndex + '.jpg';
    }    
    
    viewer = new PanoJSLG(dom_id, {
        tileUrlProvider : myProvider,
        tileSize        : MY_TILESIZE,
        maxZoom         : MY_MAXZOOM,
        imageWidth      : MY_WIDTH,
        imageHeight     : MY_HEIGHT,
        blankTile       : 'images/blank.gif',
        loadingTile     : 'images/progress.gif'
    });

    Ext.EventManager.addListener( window, 'resize', callback(viewer, viewer.resize) );
    viewer.init();
    viewer.zoom(1);
    viewer.zoom(1);

    var i = 0
    var moveViewer = function() {
        // XXX HACK -- make this support 360 degree motion
        //i++;
        //if (i > MY_WIDTH) {
        //    i = 0
        //    viewer.moveViewerBy({ x: MY_WIDTH, y: 0})
        //}
        viewer.moveViewerBy({ x: -1, y: 0 })
        setTimeout(moveViewer, 20)
    }

    setTimeout(moveViewer, 20)
};

function initViewers() {
  createViewer( viewer1, 'viewer1', 'images/', 'test', 3076, 650);
}
  
Ext.onReady(initViewers);
