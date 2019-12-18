class GUIWindow extends GUIManager {

    constructor(id, options, guimanager) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.windowPosition = {x:options.x, y:options.y};
		this.windowSize = {width:options.w, height:options.h};
		this.colorWindow = options.backgroundColor || null;
		this.imageWindow = options.backgroundImage || null;
		this.colorContent = options.colorContent || null;
		this.imageContent = options.imageContent;
		this.buttonClose = typeof options.closeButton;
		this.overflow = options.overflow || "auto";
		this.borderWindow = options.borderWindow || null;
		this.borderTitle = options.borderTitle || null;
		this.heightTitle = options.heightTitle || 30;
		this.fontSize = options.titleFontSize || 12; 
		this.radiusWindow = options.radiusWindow || 8;
		this.colorTitle = options.colorTitle || "rgba(0, 0, 0, 0.4)";
		this.imageTitle = options.imageTitle || null;
		this.textAlign = options.titleTextAlign || "center";
		this.colorTextTitle = options.titleColor || null;
		this.title = options.textTitle || "Title";
		if(options.draggable == true || options.draggable == undefined) {
			this.draggable = true;
		} else {
			this.draggable = false;
		}
		this.zIndex = options.zIndex || 0;
		this.windowVisible = false;

		this.addElement();
	}

	addElement()  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let window = document.createElement("div");
		window.style.position = "absolute";
		window.style.width = this.windowSize.width+"px";
		window.style.height = this.windowSize.height+"px";
		if(GUIManager.convertPixelToPercent == true) {			
			window.style.top = this.convertPixelToPercentHeight(this.windowPosition.y + this.getCanvasOrigine().top)+"%";
			window.style.left = this.convertPixelToPercentWidth(this.windowPosition.x + this.getCanvasOrigine().left)+"%";
		} else {
			window.style.top = (this.windowPosition.y + this.getCanvasOrigine().top)+signe;
			window.style.left = (this.windowPosition.x + this.getCanvasOrigine().left)+signe;			
		}
		window.style.borderRadius = this.radiusWindow+"px";
		window.id = this.id;
		window.name = this.id;
		window.className = "GUIWindow";
		window.style.zIndex = this.zIndex || 0;
		window.style.backgroundColor = this.colorWindow;		
		window.style.backgroundImage = "url("+this.imageWindow+")";
		window.style.border = this.borderWindow;
		window.style.wordWrap = "break-word";
		window.style.display = "none";

		let titreWindow = document.createElement("div");
		titreWindow.className  = "titleWindoWGUI";
		titreWindow.style.width = this.windowSize.width+"px";		
		titreWindow.style.height = this.heightTitle+"px";
		titreWindow.style.textAlign = this.textAlign;
		titreWindow.style.fontSize = this.fontSize+"px";
		titreWindow.style.borderRadius = this.radiusWindow+"px "+this.radiusWindow+"px 0 0";
		titreWindow.id = this.id+"_titre";
		titreWindow.style.backgroundColor = this.colorTitle;
		titreWindow.style.backgroundImage = "url("+this.imageTitle+")";
		titreWindow.style.borderBottom = this.borderTitle;
		if(this.draggable == true) {
			titreWindow.ondragstart = draggable(window, titreWindow);
			titreWindow.style.cursor = "move";
		}
		titreWindow.innerHTML = this.title;
		titreWindow.style.zIndex = this.zIndex + 1;
		titreWindow.style.color = this.colorTextTitle;
		titreWindow.style.wordWrap = "break-word";

		let that = this;
		if(this.buttonClose == true || this.buttonClose == "undefined") {
			var close = document.createElement("button");
			close.innerHTML = "X";
			close.id = this.id+"_button";
			close.style.position = "absolute";
			close.style.borderRadius = "12px";			
			close.style.left = this.windowSize.width - 12+"px";
			close.style.marginTop = "-12px";
			close.style.width = "24px";
			close.style.height = "24px";
			close.style.zIndex = 10000;
			close.onclick = function() {
				that.getElementById(that.id).style.display = "none";
				that.windowVisible = false;
			};
		}

		let contentWindow = document.createElement("div");
		contentWindow.id = this.id+"_content";		
		contentWindow.style.width = this.windowSize.width+"px";
		contentWindow.style.height = this.windowSize.height - 38 +"px";
		contentWindow.style.overflow = this.overflow;
		contentWindow.style.wordBreak = "keep-all";
		contentWindow.style.marginTop = "0px";
		contentWindow.style.paddingTop = "5px";
		contentWindow.style.borderRadius = "8px";
		contentWindow.style.backgroundColor = this.colorContent;
		contentWindow.style.backgroundImage = "url("+this.imageContent+")";
		contentWindow.style.zIndex = this.zIndex + 2;

		this.html.appendChild(window);
		this.getElementById(this.id).appendChild(titreWindow);
		if(this.buttonClose == true || this.buttonClose == "undefined") {
			this.getElementById(this.id+"_titre").appendChild(close);
		}
		this.getElementById(this.id).appendChild(contentWindow);

		this.addGuiElements(window);
    }

	add(element)
	{
		let contentForm = this.getElementById(this.id+"_content");
		contentForm.style.zIndex = this.zIndex + 1;
		element.addElement(false, contentForm);
	}

	dispose() {
		return this.html.removeChild(this.getElementById(this.id));
    }

    setVisible(bool, fade) {
		let display = null;
		if(fade == undefined) fade = true;
		let element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.windowVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.windowVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.windowVisible;
    }

}