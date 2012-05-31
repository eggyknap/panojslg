/*******************************************************************************
  Controls - creates buttons for zooming and, full screen 
  
  GSV 3.0 : PanoJS3
  @author Dmitry Fedorov  <fedorov@ece.ucsb.edu>   
  
  Copyright (c) 2010 Dmitry Fedorov, Center for Bio-Image Informatics
  
  using: isClientTouch() and isClientPhone() from utils.js

*******************************************************************************/

PanoJSLG.CONTROL_IMAGE_ZOOMIN   = "images/32px_plus.png";
PanoJSLG.CONTROL_IMAGE_ZOOM11   = "images/32px_11.png";
PanoJSLG.CONTROL_IMAGE_ZOOMOUT  = "images/32px_minus.png";
PanoJSLG.CONTROL_IMAGE_MAXIMIZE = "images/32px_show.png";

PanoJSLG.CONTROL_IMAGE_ZOOMIN_TOUCH   = "images/64px_plus.png";
PanoJSLG.CONTROL_IMAGE_ZOOM11_TOUCH   = "images/64px_11.png";
PanoJSLG.CONTROL_IMAGE_ZOOMOUT_TOUCH  = "images/64px_minus.png";
PanoJSLG.CONTROL_IMAGE_MAXIMIZE_TOUCH = "images/64px_show.png";

PanoJSLG.CONTROL_STYLE = "position: absolute; z-index: 30; "; //opacity:0.5; filter:alpha(opacity=50); ";

PanoJSLG.CONTROL_ZOOMIN = {
    className : "zoomIn",
    image : (isClientTouch() ? PanoJSLG.CONTROL_IMAGE_ZOOMIN_TOUCH : PanoJSLG.CONTROL_IMAGE_ZOOMIN),
    title : "Zoom in",
    style : PanoJSLG.CONTROL_STYLE + " top: 10px; left: 10px; width: 20px;",
};

PanoJSLG.CONTROL_ZOOM11 = {
    className : "zoom11",
    image : (isClientTouch() ? PanoJSLG.CONTROL_IMAGE_ZOOM11_TOUCH : PanoJSLG.CONTROL_IMAGE_ZOOM11),
    title : "Zoom 1:1",
    style : PanoJSLG.CONTROL_STYLE + " top: 40px; left: 10px; width: 20px;",
};

PanoJSLG.CONTROL_ZOOMOUT = {
    className : "zoomOut",
    image : (isClientTouch() ? PanoJSLG.CONTROL_IMAGE_ZOOMOUT_TOUCH : PanoJSLG.CONTROL_IMAGE_ZOOMOUT),
    title : "Zoom out",
    style : PanoJSLG.CONTROL_STYLE + " top: 70px; left: 10px; width: 20px;",
};

PanoJSLG.CONTROL_MAXIMIZE = {
    className : "maximize",
    image : (isClientTouch() ? PanoJSLG.CONTROL_IMAGE_MAXIMIZE_TOUCH : PanoJSLG.CONTROL_IMAGE_MAXIMIZE),
    title : "Maximize",
    style : PanoJSLG.CONTROL_STYLE + " top: 10px; right: 10px; width: 20px;",
};

if (isClientTouch()) {
  PanoJSLG.CONTROL_ZOOMIN.style   = PanoJSLG.CONTROL_STYLE + " top: 15px;  left: 15px;  width: 36px;";
  PanoJSLG.CONTROL_ZOOM11.style   = PanoJSLG.CONTROL_STYLE + " top: 75px;  left: 15px;  width: 36px;";
  PanoJSLG.CONTROL_ZOOMOUT.style  = PanoJSLG.CONTROL_STYLE + " top: 135px; left: 15px;  width: 36px;";
  PanoJSLG.CONTROL_MAXIMIZE.style = PanoJSLG.CONTROL_STYLE + " top: 15px;  right: 15px; width: 36px;";
}

if (isClientPhone()) {
  PanoJSLG.CONTROL_ZOOMIN.style   = PanoJSLG.CONTROL_STYLE + " top: 30px;  left: 30px;  width: 96px;";
  PanoJSLG.CONTROL_ZOOM11.style   = PanoJSLG.CONTROL_STYLE + " top: 180px; left: 30px;  width: 96px;";
  PanoJSLG.CONTROL_ZOOMOUT.style  = PanoJSLG.CONTROL_STYLE + " top: 320px; left: 30px;  width: 96px;";
  PanoJSLG.CONTROL_MAXIMIZE.style = PanoJSLG.CONTROL_STYLE + " top: 30px;  right: 30px; width: 96px;";
}



function PanoControls(viewer) {
    this.viewer = viewer;  
    this.initControls();
    this.createDOMElements();
}

PanoControls.prototype.initControls = function() {
  if (PanoJSLG.CONTROL_UPDATED_URLS) return;
  PanoJSLG.CONTROL_ZOOMIN.image   = PanoJSLG.STATIC_BASE_URL+PanoJSLG.CONTROL_ZOOMIN.image;
  PanoJSLG.CONTROL_ZOOM11.image   = PanoJSLG.STATIC_BASE_URL+PanoJSLG.CONTROL_ZOOM11.image;
  PanoJSLG.CONTROL_ZOOMOUT.image  = PanoJSLG.STATIC_BASE_URL+PanoJSLG.CONTROL_ZOOMOUT.image;
  PanoJSLG.CONTROL_MAXIMIZE.image = PanoJSLG.STATIC_BASE_URL+PanoJSLG.CONTROL_MAXIMIZE.image;
  PanoJSLG.CONTROL_UPDATED_URLS   = true;
}

PanoControls.prototype.createDOMElements = function() {
    this.dom_element = this.viewer.viewerDomElement();
      
    this.createButton (PanoJSLG.CONTROL_ZOOMIN);
    this.createButton (PanoJSLG.CONTROL_ZOOM11);
    this.createButton (PanoJSLG.CONTROL_ZOOMOUT);
    this.createButton (PanoJSLG.CONTROL_MAXIMIZE);  
}

PanoControls.prototype.createButton = function(control) {
      
    var className = control.className;
    var src = control.image;
    var title = control.title;
    var style = control.style;
    
    var btn = document.createElement('span');
    btn.className = className;
    this.dom_element.appendChild(btn); 

    if (style) {
      btn.setAttribute("style", style);
      btn.style.cssText = style;   
    }
    
    var img = document.createElement('img');
    img.src = src;
    if (title) img.title = title;
    if (btn.style.width) img.style.width = btn.style.width;
    btn.appendChild(img);    
    
    btn.onclick = callback(this.viewer, this.viewer[btn.className + 'Handler']); 
                
    return btn;
}

