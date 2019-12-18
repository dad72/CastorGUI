class GUISelect extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {

		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.selectPosition = {x:options.x, y:options.y};
		this.selectSize = {width:options.w, height:options.h};
		this.zIndex = options.zIndex || 1;
		this.selectVisible = true;
		this.onchangeSelectoptions = callback || false;
		this.tabindex = options.tabindex || 0;
		this.optionsListe = [];		

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }		
		let select = document.createElement("select");
		select.style.width = this.selectSize.width+"px";
		select.style.height = this.selectSize.height+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				select.style.top = this.convertPixelToPercentHeight(this.selectPosition.y + this.getCanvasOrigine().top)+"%";
				select.style.left = this.convertPixelToPercentWidth(this.selectPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				select.style.top = (this.selectPosition.y)+"px";
				select.style.left = (this.selectPosition.x)+"px";
			}
		} else {
			if(append == true) {
				select.style.top = (this.selectPosition.y + this.getCanvasOrigine().top)+signe;
				select.style.left = (this.selectPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				select.style.top = this.selectPosition.y+signe;
				select.style.left = this.selectPosition.x+signe;
			}
		}		
		select.style.position = "absolute";
		select.id = this.id;
		select.name = this.id;
		select.className = "GUISelect";
		select.tabindex = this.tabindex;
		select.style.zIndex = this.zIndex;
		select.onchange = this.onchangeSelectoptions;

		if(append == true) {
			this.html.appendChild(select);
		} else {
			element.appendChild(select);
			this.optionsListe.forEach((options) => {
				this.getElementById(this.id).appendChild(options);
			});
		}

		this.addGuiElements(select);
    }

	addOptions(value, text) {
		let options = document.createElement("option");
		options.value = value;
		options.innerHTML = text;
		if(this.append == false) {
			this.optionsListe.push(options);
		} else{
			this.getElementById(this.id).appendChild(options);
		}
	}
	
	findOptionSelected(withIndex) {
		if(withIndex == undefined) withIndex = false;
		let elSel = this.getElementById(this.id);
		let str = elSel.options[elSel.selectedIndex].text;		
		if(withIndex == true) {
			return elSel.selectedIndex;
		} else {
			return str;
		}
	}
	
	removeOption(value) {
		let elSel = this.getElementById(this.id);
		for(let i = 0; i <= elSel.length - 1; i++) {
			if(elSel.options[i].text == value) {
				elSel.remove(i);
				break;
			}
		}
		if(this.append == false) {
			for(let b in arr ){
				if(arr[b] == value) {
					arr.splice(b, 1);
					break;
				} 
			} 
		}	
		return;
	}
	
	changeItem(oldValue, newValue) {
		let elSel = this.getElementById(this.id);
		for(let i = 0; i <= elSel.length - 1; i++) {
			if(elSel.options[i].text == oldValue) {
				elSel.options[i].text = newValue;
				elSel.options[i].value = newValue;
				break;
			}
		}
		return;
	}
	
	selectedItem(item) {
		let elSel = this.getElementById(this.id);
		for(let i = 0; i <= elSel.length - 1; i++) {
			if(elSel.options[i].text == item) {
				elSel.options[i].setAttribute('selected', true);				
			} else {
				elSel.options[i].removeAttribute('selected');
			}
		}
		return;
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
			this.selectVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.selectVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.selectVisible;
    }

}