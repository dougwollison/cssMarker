function cssMarker( options ) {
	this.options_ = options;
	this.map_ = options.map;
	this.position_ = options.position;
	this.div_ = null;

	this.setMap( options.map );
}

cssMarker.prototype = new google.maps.OverlayView();

cssMarker.prototype.onAdd = function() {
	var div = document.createElement( 'div' );

	div.className = 'cssmarker';
	div.style.position = 'absolute';
	div.innerHTML = this.options_.contents ? this.options_.contents : '';

	this.div_ = div;

	var panes = this.getPanes();
	panes.overlayMouseTarget.appendChild( div );
}

cssMarker.prototype.draw = function() {
	var projection = this.getProjection();

	var position = projection.fromLatLngToDivPixel( this.position_ );

	var div = this.div_;
	div.style.top = position.y + 'px';
	div.style.left = position.x + 'px';

	this.addClass( this.options_.classes );
}

cssMarker.prototype.onRemove = function() {
	this.div_.parentNode.removeChild( this.div_ );
	this.div_ = null;
};

cssMarker.prototype.hide = function() {
	if ( this.div_ ) {
		this.div_.style.visibility = 'hidden';
	}
};

cssMarker.prototype.show = function() {
	if ( this.div_ ) {
		this.div_.style.visibility = 'visible';
	}
};

cssMarker.prototype.toggle = function() {
	if ( this.div_) {
		if ( this.div_.style.visibility == 'hidden' ) {
			this.show();
		} else {
			this.hide();
		}
	}
};

cssMarker.prototype.getPosition = function() {
	return this.position_;
};

cssMarker.prototype.hasClass = function( name ) {
	var div = this.div_;
	return ( ' ' + div.className + ' ') .indexOf( ' ' + name + ' ' ) >= 0;
};

cssMarker.prototype.addClass = function( name ) {
	var div = this.div_;

	if ( ! this.hasClass( name ) ) {
		div.className += ( div.className ? ' ' : '' ) + name;
	}

	return this;
};

cssMarker.prototype.removeClass = function( classes ) {
	var div = this.div_;

	var set = ' '+div.className+' ';

	// Class name may appear multiple times
	while(set.indexOf(' '+name+' ') >= 0){
		set = set.replace(' '+name+' ', ' ');
	}

	div.className = typeof set.trim === 'function' ? set.trim() : set.replace( /^\s+|\s+$/g, '' );

	return this;
};

cssMarker.prototype.toggleClass = function( classes, toggle ) {
	if ( this.hasClass( name ) || toggle === false ) {
		this.removeClass( name );
	} else if ( ! this.hasClass( name ) || toggle === true ) {
		this.addClass( name );
	}

	return this;
};
