## new [GUIManager](#)(canvas, css)
Creates a new GUIManager

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| **canvas** | object | The element canvas |
| **css** | string | The css GUI for all element |
| **options** | object | The option of theme GUI for all element |
---

## Options

### themeRoot (string: root fileName)
Root of file css of theme

### themeGUI (string: fileName)
file css of theme

### pixel (bool)
use pixel or percentage

## Methods

### makeContainerSVG()
Create element SVG

### addGUIContainerOnSVG(element)
Add element on SVG (Buttons, test fields and link does not work. SVG draws elements on the canvas but does not make them clickable.)

### GUIManager.setConvertPixelToPercent(bool) → static
Set option converted pixels in poucentage (false by default)

### GUIManager.getConvertPixelToPercent() → static
return pixels or poucentage (if return true = pixels)

### convertPixelToPercentWidth(pixel) → void
Return convert pixel width in percentage

### convertPixelToPercentHeight(pixel) → void
Return convert pixel height in percentage

### addStyle(string:css) → void
Add style on GUI

### getElementById(string) → [GUIElement]()
Returns the element corresponding.

### getCanvasOrigine() → void
Returns the origine canvas (x,y)

### getCanvasWidth(string) → void
Returns the size canvas (width, height)

### fadeIn(element) → void
Set fade in element

### fadeOut(element) → void
Set fade out element

### setVisible(bool, fade) → void
Set this GUI all element to visible or invisible

### isVisible() → void
Returns all element if is visible or no

### dispose() → void
Dispose the GUIManager, and delete all elements.
