- Version 2.0:

	- The source code was converted to ECEMAScript6
	- Update Demo
	- Update Readme with demo on playground
	- Fixed some bugs
	- Added SVG to draw the elements in the canvas.
	
	- Breaking changes
		- In GUIManager : the property GUIManager.convertPixelToPercent removed. Use static GUIManager.setConvertPixelToPercent(bool) or GUIManager.getConvertPixelToPercent();	
	

- Version 1.6:

	- New functionnality:
		- Added function findOptionSelected(withIndex), removeOption(value), changeItem(oldValue, newValue) for GUISelect
		- Added function selectedItem(item) for GUISelect
		- Added event reload after fullscreen browser
		- Added getValue for GUISlider
		- System convertion pixel to percentage with option for GUIManager for use pixel or percent
		- Permanent or temporary data storage system (localStorage or sessionStorage)
		- Added option titleFontSize for title GUIWindow
		- Added systeme of database (localStorage and sessionStorage)
		- Added class GUITextLink
		
	- Bugs:
		- Fixe all backgroundImage (Textures did not display) 
		- Fixe backgroundColor for GUIWindow
		- Fixe updateText
		- Fixe background and color text for GUITextarea and GUITextfield
		- Fixed loading custom CSS theme
	
	- Update:
		- Change getNumber for getValue in the GUISpinner
		- Update doc
	
- Version 1.5:

	- New functionnality:
		- Added class GUIColor (commpatible IE and Edge also)
		- Added setChecked() and isChecked() for GUIRadio and GUICheckbox
		- Added theme for GUIManager for all elements (with css)
		- Added group for GUIRadio (option name)
		- Added getNumber() for GUISpinner

	- Bugs:
		- Fixed step for GUISpinner and GUISlider
		- Fixed for the element in the window no moves the window when selecting an input or text
		- Fixed for GUIPanel with append false
		- Fixed GUISelect when added in a window (with append false)

	- Update:
		- Update doc.
		- Drad and drop window compatible IPhone, Ipad... (event touch)
		- rename class by className for the options GUI.

- Version 1.4:

	- New functionnality:
		- Added isChecked() and setChecked() for GUIRadio and GUICheckbox
		- Added classe "GUIText" for edit css
		- Added Drag and Drop for IPhone, IPad (event touch)
		- Added options name for GUIRadio to group button
		- Added tabindex for all element of form.
		- Added option "position" absolute or relative for GUIText
		- Added option overflow for GUIPanel, GUIWindow and GUIDialog.
		- Added option inline for GUIText for support back to the line of text
	- Bugs:
		- Fixed the bad position of checkbox resize
		- Fixed for GUISelect and addOptions
		- Fixed resize the button radio and checkbox
		- Fixed GUIPanel with append false
	- Update:
		- Change callback: event onInput in GUISlider and GUIspinner
		- Change to the text position in a container window and improvement of container
		- Update doc.
		- Update demo.

- Version 1.3:

	- New functionnality:
		- Added getValue() and setValue() for GUITextfield, GUITextarea
		- Added getValue() for GUIProgress
		- Added function add() for GUIPanel
	- Bugs:
		- Fixed Method SetVisible for GUIGroup
		- Fixed GUIPanel Init
		- Fixed divers all GUIxxx
		- Fixed Close Button for GUIWindow
		- Fixed GUIWindow
		- Fixed dispose for GUIManager
		- Fixed ZIndex element container
		- Fixed position of elements added in container and callback in GUITexture
	- Update:
		- Updated demo

- Version 1.2:

	- New functionnality:
		- Added GUISpinner, GUIMeter and GUIProgress
		- Added Method updateText() for GUIText
		- Added fadIn fadOut for SetVisible
		- Added image button with event customise or button close for GUIDialog
- Version 1.1

	- Bugs:
		- Fixed divers all GUIxxx

- Version 1.0

	- Initial commit
