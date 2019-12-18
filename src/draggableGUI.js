var CASTORGUI = CASTORGUI || {};

!(function(moduleName, definition) {
	if (typeof define === 'function' && typeof define.amd === 'object') {
		define(definition);
	} else {
		this[moduleName] = definition();
	}
})('draggable', function definition() {

	let currentElement, fairlyHighZIndex = '10';

	CASTORGUI.addEventListener = function(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, handler);
        } else {
             element['on' + eventName] = handler;
        }
    };

	CASTORGUI.removeEventListener = function(element, eventName, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(eventName, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + eventName,handler);
		} else {
			element['on' + eventName] = null;
		}
    };

	CASTORGUI.draggable = function(element, handle) {
		handle = handle || element;
		CASTORGUI.setPositionType(element);
		CASTORGUI.setDraggableListeners(element);
		CASTORGUI.addEventListener(handle,'mousedown', function(event) {
			CASTORGUI.startDragging(event, element);
		});
	};

	CASTORGUI.setPositionType = function(element) {
		element.style.position = 'absolute';
	};

	CASTORGUI.setDraggableListeners = function(element) {
		element.draggableListeners = {
			start: [],
			drag: [],
			stop: []
		};
		element.whenDragStarts = CASTORGUI.addListener(element, 'start');
		element.whenDragging = CASTORGUI.addListener(element, 'drag');
		element.whenDragStops = CASTORGUI.addListener(element, 'stop');
	};

	CASTORGUI.startDragging = function(event, element) {
		currentElement && CASTORGUI.sendToBack(currentElement);
		currentElement = CASTORGUI.bringToFront(element);
		let initialPosition = CASTORGUI.getInitialPosition(currentElement);
		currentElement.style.left = CASTORGUI.inPixels(initialPosition.left);
		currentElement.style.top = CASTORGUI.inPixels(initialPosition.top);
		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;
		let okToGoOn = CASTORGUI.triggerEvent('start', { x: initialPosition.left, y: initialPosition.top, mouseEvent: event });
		if (!okToGoOn) { return; }
		CASTORGUI.addDocumentListeners();
	};

	CASTORGUI.addListener = function(element, type) {
		return function(listener) {
			element.draggableListeners[type].push(listener);
		};
	};

	CASTORGUI.triggerEvent = function(type, args) {
		let result = true;
		let listeners = currentElement.draggableListeners[type];
		for (let i = listeners.length - 1; i >= 0; i--) {
			if (listeners[i](args) === false) { result = false; }
		};
		return result;
	};

	CASTORGUI.sendToBack = function(element) {
		let decreasedZIndex = fairlyHighZIndex - 1;
		element.style['z-index'] = decreasedZIndex;
		element.style['zIndex'] = decreasedZIndex;
	};

	CASTORGUI.bringToFront = function(element) {
		element.style['z-index'] = fairlyHighZIndex;
		element.style['zIndex'] = fairlyHighZIndex;
		return element;
	};

	CASTORGUI.addDocumentListeners = function() {
		CASTORGUI.addEventListener(document, 'selectstart', CASTORGUI.cancelDocumentSelection);
		CASTORGUI.addEventListener(document, 'mousemove', CASTORGUI.repositionElement);
		CASTORGUI.addEventListener(document, 'mouseup', CASTORGUI.removeDocumentListeners);
		CASTORGUI.addEventListener(document, "touchstart", CASTORGUI.cancelDocumentSelection);
		CASTORGUI.addEventListener(document, "touchmove", CASTORGUI.repositionElement);
		CASTORGUI.addEventListener(document, "touchend", CASTORGUI.removeDocumentListeners);
		CASTORGUI.addEventListener(document, "touchcancel", CASTORGUI.removeDocumentListeners);
	};

	CASTORGUI.getInitialPosition = function(element) {
		let boundingClientRect = element.getBoundingClientRect();
		return {
			top: boundingClientRect.top,
			left: boundingClientRect.left
		};
	};

	CASTORGUI.inPixels = function(value) {
		return value + 'px';
	};

	CASTORGUI.cancelDocumentSelection = function(event) {
		event.preventDefault && event.preventDefault();
		event.stopPropagation && event.stopPropagation();
		event.returnValue = false;
		return false;
	};

	CASTORGUI.repositionElement = function(event) {
		event.preventDefault && event.preventDefault();
		event.returnValue = false;
		let style = currentElement.style;
		let elementXPosition = parseInt(style.left, 10);
		let elementYPosition = parseInt(style.top, 10);

		let elementNewXPosition = elementXPosition + (event.clientX - currentElement.lastXPosition);
		let elementNewYPosition = elementYPosition + (event.clientY - currentElement.lastYPosition);

		style.left = CASTORGUI.inPixels(elementNewXPosition);
		style.top = CASTORGUI.inPixels(elementNewYPosition);

		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;

		CASTORGUI.triggerEvent('drag', { x: elementNewXPosition, y: elementNewYPosition, mouseEvent: event });
	};

	CASTORGUI.removeDocumentListeners = function(event) {
		CASTORGUI.removeEventListener(document, 'selectstart', CASTORGUI.cancelDocumentSelection);
		CASTORGUI.removeEventListener(document, 'mousemove', CASTORGUI.repositionElement);
		CASTORGUI.removeEventListener(document, 'mouseup', CASTORGUI.removeDocumentListeners);
		CASTORGUI.removeEventListener(document, "touchstart", CASTORGUI.cancelDocumentSelection);
		CASTORGUI.removeEventListener(document, "touchmove", CASTORGUI.repositionElement);
		CASTORGUI.removeEventListener(document, "touchend", CASTORGUI.removeDocumentListeners);
		CASTORGUI.removeEventListener(document, "touchcancel", CASTORGUI.removeDocumentListeners);

		var left = parseInt(currentElement.style.left, 10);
		var top = parseInt(currentElement.style.top, 10);
		CASTORGUI.triggerEvent('stop', { x: left, y: top, mouseEvent: event });
	};

	return CASTORGUI.draggable;
});