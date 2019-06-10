export function insertLegend(view){
	var lut = view.lut;
	var options = view.options;
	var legend = lut.setLegendOn( {  'position': { 'x': options.legendX, 'y': options.legendY, 'z': 0 }, 'dimensions': { 'width': options.legendWidth, 'height': options.legendHeight } } );
	view.sceneHUD.add( legend );
	view.legend = legend;
	var labels = lut.setLegendLabels( { /*'title': title,*/ 'ticks': options.legendTick ,'fontsize': options.legendFontsize} );

	//view.sceneHUD.add ( labels['title'] );

	for ( var i = 0; i < options.legendTick; i++ ) {
		view.sceneHUD.add ( labels[ 'ticks' ][ i ] );
		view.sceneHUD.add ( labels[ 'lines' ][ i ] );
	}
}


export function removeLegend(view) {
	var sceneHUD = view.sceneHUD;
	var elementsInTheScene = sceneHUD.children.length;

	for ( var i = elementsInTheScene-1; i > 0; i-- ) {

		if ( sceneHUD.children [ i ].name != 'camera' &&
			 sceneHUD.children [ i ].name != 'ambientLight' &&
			 sceneHUD.children [ i ].name != 'border' &&
			 sceneHUD.children [ i ].name != 'directionalLight') {

			//console.log(sceneHUD.children [ i ].name);
			sceneHUD.remove ( sceneHUD.children [ i ] );

		}

	}

}

export function changeLegend(view) {
	removeLegend(view);
	insertLegend(view);
}

export function insertLegendMolecule(view){
	var lut = view.moleculeLut;
	var options = view.options;
	var legend = lut.setLegendOn( {  'position': { 'x': options.legendXMolecule, 'y': options.legendYMolecule, 'z': 0 }, 'dimensions': { 'width': options.legendWidthMolecule, 'height': options.legendHeightMolecule } } );
	view.sceneHUD.add( legend );
	view.legendMolecule = legend;
	var labels = lut.setLegendLabels( { /*'title': title,*/ 'ticks': options.legendTickMolecule ,'fontsize': options.legendFontsizeMolecule} );

	//view.sceneHUD.add ( labels['title'] );

	for ( var i = 0; i < options.legendTickMolecule; i++ ) {
		view.sceneHUD.add ( labels[ 'ticks' ][ i ] );
		view.sceneHUD.add ( labels[ 'lines' ][ i ] );
	}
}


export function removeLegendMolecule(view) {
	var sceneHUD = view.sceneHUD;
	var elementsInTheScene = sceneHUD.children.length;

	for ( var i = elementsInTheScene-1; i > 0; i-- ) {

		if ( sceneHUD.children [ i ].name != 'camera' &&
			 sceneHUD.children [ i ].name != 'ambientLight' &&
			 sceneHUD.children [ i ].name != 'border' &&
			 sceneHUD.children [ i ].name != 'directionalLight') {

			//console.log(sceneHUD.children [ i ].name);
			sceneHUD.remove ( sceneHUD.children [ i ] );

		}

	}

}

export function changeLegendMolecule(view) {
	removeLegendMolecule(view);
	insertLegendMolecule(view);
	//if (view.options.moleculeColorCodeBasis != "atom"){insertLegendMolecule(view);}
	
}