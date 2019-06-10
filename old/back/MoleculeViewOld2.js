import {colorSetup, atomRadius} from "./AtomSetup.js";
import {shaderMaterial2, shaderMaterial3} from "./PointCloudMaterials.js";
import {hexToRgb, colorToRgb} from "../Utilities/other.js";



function addAtom(view, atomGeometry, index, atomData, atomGroup, lut, moleculeObject){
	
	var options = view.options;
	var sizeCode = options.moleculeSizeCodeBasis;
	var colorCode = options.moleculeColorCodeBasis;
	var xPlotScale = view.xPlotScale;
	var yPlotScale = view.yPlotScale;
	var zPlotScale = view.zPlotScale;
/*
	if (sizeCode != "atom") {
		var sizeMax = options.moleculeSizeSettingMax;
		var sizeMin = options.moleculeSizeSettingMin;
	}
	
	//var atomGeometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments);

    //console.log(colorCode);
    if (colorCode == "atom") {
    	//console.log("atom color basis");
		var material = new THREE.MeshBasicMaterial( {color: colorSetup[atomData.atom]} );
	}
	else {
		//console.log("other color basis");
		var tempColor = lut.getColor( atomData[colorCode] );
		var material = new THREE.MeshBasicMaterial( {color: tempColor } );
	}
		
	
	var atom = new THREE.Mesh(atomGeometry, material);

	if (sizeCode == "atom") {
    	//console.log("atom color basis");
    	//console.log(atom);
		atom.scale.set(options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom]);
	}
	else {
		//console.log("other color basis");
		var tempSize = (atomData[sizeCode] - sizeMin)/(sizeMax - sizeMin);
		atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
	}
	//atom.position.set(xPlotScale(view.coordinates[i][1][0])*20.0, yPlotScale(view.coordinates[i][1][1])*20.0,zPlotScale(view.coordinates[i][1][2])*20.0);
	atom.position.set(atomData.xPlot*20.0, atomData.yPlot*20.0,atomData.zPlot*20.0);
	
	//atom.position.set(atomData.xPlot*20.0 + i*xStep, atomData.yPlot*20.0 + j*yStep, atomData.zPlot*20.0 + k*zStep);
	atom.dataIndex = index;
	view[moleculeObject].atoms.push(atom);
	atomGroup.add( atom );
	//scene.add(atom);*/
	


	var geometry = new THREE.BufferGeometry();
	var positions = new Float32Array(3);
	var colors = new Float32Array(3);
	var sizes = new Float32Array( 1);
	var alphas = new Float32Array( 1);


	positions[0] = atomData.xPlot*20.0;
	positions[1] = atomData.yPlot*20.0;
	positions[2] = atomData.zPlot*20.0;


	if (colorCode == "atom") {
    	//console.log("atom color basis");
		//var material = new THREE.MeshBasicMaterial( {color: colorSetup[atomData.atom]} );
		var color = colorToRgb(colorSetup[atomData.atom]);
	}
	else {
		//console.log("other color basis");
		var color = lut.getColor( atomData[colorCode] );
		//var material = new THREE.MeshBasicMaterial( {color: tempColor } );
	}
	

	colors[ 0 ] = color.r;
	colors[ 1 ] = color.g;
	colors[ 2 ] = color.b;
	//console.log(colors);

	if (sizeCode == "atom") {
		sizes[0] = options.atomSize*atomRadius[atomData.atom]*500;
		//atom.scale.set(options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom]);
	}
	else {
		var tempSize = (atomData[sizeCode] - sizeMin)/(sizeMax - sizeMin);
		sizes[0] = options.atomSize*tempSize*500;
		//atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
	}

	alphas[0] = 1;

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
	geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
	geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );

	var atom = new THREE.Points( geometry, shaderMaterial2 );

	//console.log(atom);
	atom.dataIndex = index;
	view[moleculeObject].atoms.push(atom);
	atomGroup.add( atom );
	//scene.add(atom);

}

function addAtomPeriodicReplicate(view, atomGeometry, i, j, k, xStep, yStep, zStep, atomData, atomGroup, lut, moleculeObject){
	var options = view.options;
	var sizeCode = options.moleculeSizeCodeBasis;
	var colorCode = options.moleculeColorCodeBasis;
	var xPlotScale = view.xPlotScale;
	var yPlotScale = view.yPlotScale;
	var zPlotScale = view.zPlotScale;
	if (sizeCode != "atom") {
		var sizeMax = options.moleculeSizeSettingMax;
		var sizeMin = options.moleculeSizeSettingMin;
	}

	//var atomGeometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments);

    //console.log(colorCode);
    if (colorCode == "atom") {
    	//console.log("atom color basis");
		var material = new THREE.MeshBasicMaterial( {color: colorSetup[atomData.atom]} );
	}
	else {
		//console.log("other color basis");
		var tempColor = lut.getColor( atomData[colorCode] );
		var material = new THREE.MeshBasicMaterial( {color: tempColor } );
	}
		
	
	var atom = new THREE.Mesh(atomGeometry, material);

	if (sizeCode == "atom") {
    	//console.log("atom color basis");
    	//console.log(atom);
		atom.scale.set(options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom]);
	}
	else {
		//console.log("other color basis");
		var tempSize = (atomData[sizeCode] - sizeMin)/(sizeMax - sizeMin);
		atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
	}
	//atom.position.set(xPlotScale(view.coordinates[i][1][0])*20.0, yPlotScale(view.coordinates[i][1][1])*20.0,zPlotScale(view.coordinates[i][1][2])*20.0);
	atom.position.set(atomData.xPlot*20.0 + i*xStep, atomData.yPlot*20.0 + j*yStep, atomData.zPlot*20.0 + k*zStep);
	
	atom.dataIndex = i;
	view[moleculeObject].atoms.push(atom);
	atomGroup.add( atom );
	//scene.add(atom);

}


function addBond(view, point1, point2, bondGroup, moleculeObject){
	var options = view.options;

	var direction = new THREE.Vector3().subVectors( point2, point1 );
	var orientation = new THREE.Matrix4();
    // THREE.Object3D().up (=Y) default orientation for all objects 
    orientation.lookAt(point1, point2, new THREE.Object3D().up);
    //* rotation around axis X by -90 degrees 
    //* matches the default orientation Y 
    //* with the orientation of looking Z 
    orientation.multiply(new THREE.Matrix4().set(1,0,0,0,
                                            0,0,1,0, 
                                            0,-1,0,0,
                                            0,0,0,1));

    // cylinder: radiusAtTop, radiusAtBottom, 
    //  height, radiusSegments, heightSegments 
    var bondGeometry = new THREE.CylinderGeometry( options.bondSize*10, options.bondSize*10, direction.length(), options.bondModelSegments, 1, true);
    //bondGeometry.translate( point1 );

    var bond = new THREE.Mesh( bondGeometry, 
            new THREE.MeshBasicMaterial( { color: 0xffffff } ) );

    bond.applyMatrix(orientation)
    bond.position.x = (point2.x + point1.x) / 2;
    bond.position.y = (point2.y + point1.y) / 2;
    bond.position.z = (point2.z + point1.z) / 2;
    view[moleculeObject].bonds.push(bond);
    bondGroup.add(bond);
    //scene.add(bond);


/*

	var geometry = new THREE.LineGeometry();
	var positions = [];
	//var colors = [0, 0, 0, 0, 0, 0];
	var colors = [1,1,1,1,1,1];
	positions.push(point1.x, point1.y, point1.z);
	positions.push(point2.x, point2.y, point2.z);
	geometry.setPositions( positions );
	geometry.setColors( colors );

	var bondMat = new THREE.LineMaterial( {

		color: 0xffffff,
		linewidth: 5, // in pixels
		vertexColors: THREE.VertexColors,
		//resolution:  // to be set by renderer, eventually
		dashed: false

	} );

	bondMat.resolution.set( view.windowWidth, view.windowHeight );

	var bond = new THREE.Line2( geometry, bondMat );
	bond.computeLineDistances();
	bond.scale.set( 1, 1, 1 );
	view[moleculeObject].bonds.push(bond);
	bondGroup.add(bond);
	//view.scene.add( line );*/


}

export function updateLineBond(view){
	for (var i = 0; i < view.molecule.bonds.length; i++) {
		var bond = view.molecule.bonds[i];
		var bondMat = bond.material;
		bondMat.resolution.set( view.windowWidth, view.windowHeight ); // resolution of the viewport
	}

}

export function getMoleculeGeometry(view){

	view.molecule = {};
	view.molecule.atoms = [];
	view.molecule.bonds = [];
	var options = view.options;
	var scene = view.scene;
	var moleculeData = view.systemMoleculeData;

	var sizeCode = options.moleculeSizeCodeBasis;
	var colorCode = options.moleculeColorCodeBasis;

	if (colorCode != "atom") {
		var colorMap = options.colorMap;
		var numberOfColors = 512;

		var lut = new THREE.Lut( colorMap, numberOfColors );
		lut.setMax( options.moleculeColorSettingMax );
		lut.setMin( options.moleculeColorSettingMin );
		view.moleculeLut = lut;
	}
	
	


	//var xPlotScale = view.xPlotScale;
	//var yPlotScale = view.yPlotScale;
	//var zPlotScale = view.zPlotScale;

	var atomGroup = new THREE.Group();
	var bondGroup = new THREE.Group();
	
	var atomGeometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments/2);
	//var bondGeometry = new THREE.CylinderGeometry( options.bondSize*10, options.bondSize*10, direction.length(), options.bondModelSegments, 1, true);

	if (view.frameBool){
		/*for (var i = 0; i < moleculeData.length; i++) {
			if (moleculeData[i].selected && moleculeData[i][view.frameProperty]== options.currentFrame) {
				addAtom(view, atomGeometry, i, moleculeData[i], atomGroup, lut, "molecule");
			}
		}*/

		for (var i = 0; i < moleculeData.length; i++) {
			if (moleculeData[i].selected && moleculeData[i][view.frameProperty] == options.currentFrame) {
				var coordinates1 = new THREE.Vector3(moleculeData[i].x, moleculeData[i].y, moleculeData[i].z);
				var point1 = new THREE.Vector3(moleculeData[i].xPlot*20.0, moleculeData[i].yPlot*20.0,moleculeData[i].zPlot*20.0);

			    for (var j = 0; j < moleculeData.length; j++) {
			    	var coordinates2 = new THREE.Vector3(moleculeData[j].x, moleculeData[j].y, moleculeData[j].z);
			    	var point2 = new THREE.Vector3(moleculeData[j].xPlot*20.0, moleculeData[j].yPlot*20.0,moleculeData[j].zPlot*20.0);
				    var bondlength = new THREE.Vector3().subVectors( coordinates2, coordinates1 ).length();
				    if (bondlength < options.maxBondLength && bondlength > options.minBondLength &&  moleculeData[j].selected && moleculeData[j][view.frameProperty] == options.currentFrame) {
				    	addBond(view, point1, point2, bondGroup, "molecule");
				    }
				}
			}
		}
	}
	else{
		/*for (var i = 0; i < moleculeData.length; i++) {
			if (moleculeData[i].selected) {
				addAtom(view, atomGeometry, i, moleculeData[i], atomGroup, lut, "molecule");
			}
		}*/

		var geometry = new THREE.BufferGeometry();
		var positions = new Float32Array(moleculeData.length * 3);
		var colors = new Float32Array( moleculeData.length* 3);
		var sizes = new Float32Array( moleculeData.length );
		var alphas = new Float32Array( moleculeData.length );

		var i3 = 0;
		for (var i = 0; i < moleculeData.length; i++) {
			var atomData = moleculeData[i];
			positions[i3+0] = atomData.xPlot*20.0;
			positions[i3+1] = atomData.yPlot*20.0;
			positions[i3+2] = atomData.zPlot*20.0;

			if (colorCode == "atom") {
		    	//console.log("atom color basis");
				//var material = new THREE.MeshBasicMaterial( {color: colorSetup[atomData.atom]} );
				var color = colorToRgb(colorSetup[atomData.atom]);
			}
			else {
				//console.log("other color basis");
				var color = lut.getColor( atomData[colorCode] );
				//var material = new THREE.MeshBasicMaterial( {color: tempColor } );
			}
			

			colors[ i3+0 ] = color.r;
			colors[ i3+1 ] = color.g;
			colors[ i3+2 ] = color.b;

			if (moleculeData[i].selected) {
				if (sizeCode == "atom") {
					sizes[i] = options.atomSize*atomRadius[atomData.atom]*500;
					//atom.scale.set(options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom], options.atomSize*atomRadius[atomData.atom]);
				}
				else {
					var tempSize = (atomData[sizeCode] - sizeMin)/(sizeMax - sizeMin);
					sizes[i] = options.atomSize*tempSize*500;
					//atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
				}

				alphas[i] = 1;
			}
			else{
				size[i] = 0;
				alphas[i] = 0;
			}

			i3 +=3;
		}
		


		
		//console.log(colors);

		

		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
		geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
		geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );

		var atoms = new THREE.Points( geometry, shaderMaterial2 );

		//console.log(atom);
		//atom.dataIndex = index;
		view.molecule.atoms.push(atoms);
		atomGroup.add( atoms );
		//scene.add(atom);



		for (var i = 0; i < moleculeData.length; i++) {
			if (moleculeData[i].selected) {
				var coordinates1 = new THREE.Vector3(moleculeData[i].x, moleculeData[i].y, moleculeData[i].z);
				var point1 = new THREE.Vector3(moleculeData[i].xPlot*20.0, moleculeData[i].yPlot*20.0,moleculeData[i].zPlot*20.0);

			    for (var j = 0; j < moleculeData.length; j++) {
			    	var coordinates2 = new THREE.Vector3(moleculeData[j].x, moleculeData[j].y, moleculeData[j].z);
			    	var point2 = new THREE.Vector3(moleculeData[j].xPlot*20.0, moleculeData[j].yPlot*20.0,moleculeData[j].zPlot*20.0);
				    var bondlength = new THREE.Vector3().subVectors( coordinates2, coordinates1 ).length();
				    if (bondlength < options.maxBondLength && bondlength > options.minBondLength &&  moleculeData[j].selected ) {
				    	addBond(view, point1, point2, bondGroup, "molecule");
				    }
				}
			}
		}
	}

	scene.add(atomGroup);
	scene.add(bondGroup);
	view.atomGroup = atomGroup;
	view.bondGroup = bondGroup;
}


export function updateMoleculeGeometry(view){
	
	/*for (var i = 0; i < view.molecule.bonds.length; i++) {
		view.scene.remove(view.molecule.bonds[i]);
	}

	for (var i = 0; i < view.molecule.atoms.length; i++) {
		var colorSetup = {"C":0x777777, "O":0xFF0000, "N":0x0000FF, "H":0xCCCCCC}
		var atomRadius = {
							"C":0.77,
							"O":0.73,
							"N":0.75,
							"H":0.37
						}
	}*/
	removeMoleculeGeometry(view);
	getMoleculeGeometry(view);

}


export function changeMoleculeGeometry(view){

	removeMoleculeGeometry(view);
	getMoleculeGeometry(view);

}

export function removeMoleculeGeometry(view){
	//console.log("delete molecule");
	//console.log(view.molecule);
	/*if (view.molecule != null ){
		//console.log("delete molecule");
		for (var i = 0; i < view.molecule.bonds.length; i++) {
			view.scene.remove(view.molecule.bonds[i]);
		}

		for (var i = 0; i < view.molecule.atoms.length; i++) {
			view.scene.remove(view.molecule.atoms[i]);
		}

		delete view.Molecule;
	}*/
	view.scene.remove(view.atomGroup);
	view.scene.remove(view.bondGroup);
	delete view.atomGroup;
	delete view.bondGroup;
	delete view.molecule;
}



export function addMoleculePeriodicReplicates(view){



	view.periodicReplicateMolecule = {};
	view.periodicReplicateMolecule.atoms = [];
	view.periodicReplicateMolecule.bonds = [];

	var options = view.options;
	var scene = view.scene;
	var moleculeData = view.systemMoleculeData;

	var sizeCode = options.moleculeSizeCodeBasis;
	var colorCode = options.moleculeColorCodeBasis;

	if (colorCode != "atom") {
		/*var colorMap = options.colorMap;
		var numberOfColors = 512;

		var lut = new THREE.Lut( colorMap, numberOfColors );
		lut.setMax( options.moleculeColorSettingMax );
		lut.setMin( options.moleculeColorSettingMin );
		view.moleculeLut = lut;*/
		var lut = view.moleculeLut;
	}
	
	if (sizeCode != "atom") {
		var sizeMax = options.moleculeSizeSettingMax;
		var sizeMin = options.moleculeSizeSettingMin;
	}

	var xPlotScale = view.xPlotScale;
	var yPlotScale = view.yPlotScale;
	var zPlotScale = view.zPlotScale;

	var xStep = 10.0*(view.xPlotMax - view.xPlotMin);
	var yStep = 10.0*(view.yPlotMax - view.yPlotMin);
	var zStep = 10.0*(view.zPlotMax - view.zPlotMin);


	var x_start = -1 * ((options.xPBC-1)/2);
	var x_end = ((options.xPBC-1)/2) + 1;
	var y_start = -1 * ((options.yPBC-1)/2);
	var y_end = ((options.yPBC-1)/2) + 1;
	var z_start = -1 * ((options.zPBC-1)/2);
	var z_end = ((options.zPBC-1)/2) + 1;

	var periodicReplicateAtomGroup = new THREE.Group();
	var periodicReplicateBondGroup = new THREE.Group();

	var atomGeometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments);
	//var bondGeometry = new THREE.CylinderGeometry( options.bondSize*10, options.bondSize*10, direction.length(), options.bondModelSegments, 1, true);

	if (view.frameBool){
		for ( var i = x_start; i < x_end; i ++) {
			for ( var j = y_start; j < y_end; j ++) {
				for ( var k = z_start; k < z_end; k ++) {
					if (((i == 0) && (j == 0) && (k == 0)) == false) {
						for (var ii = 0; ii < moleculeData.length; ii++) {
							
							if (moleculeData[ii].selected && moleculeData[ii][view.frameProperty]== options.currentFrame) {

								addAtomPeriodicReplicate(view, atomGeometry, i, j, k, xStep, yStep, zStep, moleculeData[ii], periodicReplicateAtomGroup, lut, "periodicReplicateMolecule");
							    /*
							    var geometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments);
									
								if (colorCode == "atom") {
									var material = new THREE.MeshBasicMaterial( {color: colorSetup[moleculeData[ii].atom]} );
								}
								else {
									var tempColor = lut.getColor( moleculeData[ii][colorCode] );
									var material = new THREE.MeshBasicMaterial( {color: tempColor } );
								}
								var atom = new THREE.Mesh(geometry, material);
								//atom.scale.set(options.atomSize*atomRadius[view.coordinates[ii][0]], options.atomSize*atomRadius[view.coordinates[ii][0]], options.atomSize*atomRadius[view.coordinates[ii][0]])
								//atom.position.set(xPlotScale(view.coordinates[ii][1][0])*20.0 + i*xStep, yPlotScale(view.coordinates[ii][1][1])*20.0 + j*yStep,zPlotScale(view.coordinates[ii][1][2])*20.0 + k*zStep);
								
								if (sizeCode == "atom") {
							    	//console.log("atom color basis");
									atom.scale.set(options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom]);
								}
								else {
									//console.log("other color basis");
									var tempSize = (moleculeData[ii][sizeCode] - sizeMin)/(sizeMax - sizeMin);
									atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
								}
								//atom.scale.set(options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom])
								atom.position.set(moleculeData[ii].xPlot*20.0 + i*xStep, moleculeData[ii].yPlot*20.0 + j*yStep, moleculeData[ii].zPlot*20.0 + k*zStep);

								view.periodicReplicateMolecule.atoms.push(atom);
								//scene.add(atom);
								periodicReplicateAtomGroup.add(atom);*/
							}
						}
					}
				}
			}
		}


		for ( var i = x_start; i < x_end; i ++) {
			for ( var j = y_start; j < y_end; j ++) {
				for ( var k = z_start; k < z_end; k ++) {
					if (((i == 0) && (j == 0) && (k == 0)) == false) {
						for (var ii = 0; ii < moleculeData.length; ii++) {
							if (moleculeData[ii].selected && moleculeData[ii][view.frameProperty]== options.currentFrame){
								var coordinates1 = new THREE.Vector3(moleculeData[ii].x, moleculeData[ii].y, moleculeData[ii].z);
								var point1 = new THREE.Vector3(moleculeData[ii].xPlot*20.0 + i*xStep, moleculeData[ii].yPlot*20.0 + j*yStep, moleculeData[ii].zPlot*20.0 + k*zStep);

							    for (var jj = 0; jj < moleculeData.length; jj++) {
							    	var coordinates2 = new THREE.Vector3(moleculeData[jj].x, moleculeData[jj].y, moleculeData[jj].z);
							    	var point2 = new THREE.Vector3(moleculeData[jj].xPlot*20.0 + i*xStep, moleculeData[jj].yPlot*20.0 + j*yStep, moleculeData[jj].zPlot*20.0 + k*zStep);

								    var bondlength = new THREE.Vector3().subVectors( coordinates2, coordinates1 ).length();
								    //console.log(direction.length());
								    if (bondlength < options.maxBondLength && bondlength > options.minBondLength &&  moleculeData[jj].selected && moleculeData[jj][view.frameProperty]== options.currentFrame) {
								    	addBond(view, point1, point2, periodicReplicateBondGroup, "periodicReplicateMolecule");


								    	/*var direction = new THREE.Vector3().subVectors( point2, point1 );
								    	var orientation = new THREE.Matrix4();
									    // THREE.Object3D().up (=Y) default orientation for all objects 
									    orientation.lookAt(point1, point2, new THREE.Object3D().up);
									    orientation.multiply(new THREE.Matrix4().set(1,0,0,0,
									                                            0,0,1,0, 
									                                            0,-1,0,0,
									                                            0,0,0,1));

									    var bondGeometry = new THREE.CylinderGeometry( options.bondSize*10, options.bondSize*10, direction.length(), options.bondModelSegments, 1, true);

									    var bond = new THREE.Mesh( bondGeometry, 
									            new THREE.MeshBasicMaterial( { color: 0xffffff } ) );

									    bond.applyMatrix(orientation)
							            bond.position.x = (point2.x + point1.x) / 2;
									    bond.position.y = (point2.y + point1.y) / 2;
									    bond.position.z = (point2.z + point1.z) / 2;
									    view.periodicReplicateMolecule.bonds.push(bond);
									    //scene.add(bond);

									    periodicReplicateBondGroup.add(bond);*/
								    }
							    }
							}
						}
					}
				}
			}
		}
	}
	else{

		for ( var i = x_start; i < x_end; i ++) {
			for ( var j = y_start; j < y_end; j ++) {
				for ( var k = z_start; k < z_end; k ++) {
					if (((i == 0) && (j == 0) && (k == 0)) == false) {
						for (var ii = 0; ii < moleculeData.length; ii++) {
							
							if (moleculeData[ii].selected) {
								addAtomPeriodicReplicate(view, atomGeometry, i, j, k, xStep, yStep, zStep, moleculeData[ii], periodicReplicateAtomGroup, lut, "periodicReplicateMolecule");
								/*
							    var geometry = new THREE.SphereGeometry(100, options.atomModelSegments, options.atomModelSegments);
									
								if (colorCode == "atom") {
									var material = new THREE.MeshBasicMaterial( {color: colorSetup[moleculeData[ii].atom]} );
								}
								else {
									var tempColor = lut.getColor( moleculeData[ii][colorCode] );
									var material = new THREE.MeshBasicMaterial( {color: tempColor } );
								}
								var atom = new THREE.Mesh(geometry, material);
								//atom.scale.set(options.atomSize*atomRadius[view.coordinates[ii][0]], options.atomSize*atomRadius[view.coordinates[ii][0]], options.atomSize*atomRadius[view.coordinates[ii][0]])
								//atom.position.set(xPlotScale(view.coordinates[ii][1][0])*20.0 + i*xStep, yPlotScale(view.coordinates[ii][1][1])*20.0 + j*yStep,zPlotScale(view.coordinates[ii][1][2])*20.0 + k*zStep);
								
								if (sizeCode == "atom") {
							    	//console.log("atom color basis");
									atom.scale.set(options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom]);
								}
								else {
									//console.log("other color basis");
									var tempSize = (moleculeData[ii][sizeCode] - sizeMin)/(sizeMax - sizeMin);
									atom.scale.set(options.atomSize*tempSize, options.atomSize*tempSize, options.atomSize*tempSize);
								}
								//atom.scale.set(options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom], options.atomSize*atomRadius[moleculeData[ii].atom])
								atom.position.set(moleculeData[ii].xPlot*20.0 + i*xStep, moleculeData[ii].yPlot*20.0 + j*yStep, moleculeData[ii].zPlot*20.0 + k*zStep);

								view.periodicReplicateMolecule.atoms.push(atom);
								//scene.add(atom);
								periodicReplicateAtomGroup.add(atom);
								*/
							}
						}
					}
				}
			}
		}


		for ( var i = x_start; i < x_end; i ++) {
			for ( var j = y_start; j < y_end; j ++) {
				for ( var k = z_start; k < z_end; k ++) {
					if (((i == 0) && (j == 0) && (k == 0)) == false) {
						for (var ii = 0; ii < moleculeData.length; ii++) {
							if (moleculeData[ii].selected){
								var coordinates1 = new THREE.Vector3(moleculeData[ii].x, moleculeData[ii].y, moleculeData[ii].z);
								var point1 = new THREE.Vector3(moleculeData[ii].xPlot*20.0 + i*xStep, moleculeData[ii].yPlot*20.0 + j*yStep, moleculeData[ii].zPlot*20.0 + k*zStep);

							    for (var jj = 0; jj < moleculeData.length; jj++) {
							    	var coordinates2 = new THREE.Vector3(moleculeData[jj].x, moleculeData[jj].y, moleculeData[jj].z);
							    	var point2 = new THREE.Vector3(moleculeData[jj].xPlot*20.0 + i*xStep, moleculeData[jj].yPlot*20.0 + j*yStep, moleculeData[jj].zPlot*20.0 + k*zStep);

								    var bondlength = new THREE.Vector3().subVectors( coordinates2, coordinates1 ).length();
								    //console.log(direction.length());
								    if (bondlength < options.maxBondLength && bondlength > options.minBondLength &&  moleculeData[jj].selected) {
								    	addBond(view, point1, point2, periodicReplicateBondGroup, "periodicReplicateMolecule");
								    	/*var direction = new THREE.Vector3().subVectors( point2, point1 );
								    	var orientation = new THREE.Matrix4();
									    // THREE.Object3D().up (=Y) default orientation for all objects 
									    orientation.lookAt(point1, point2, new THREE.Object3D().up);
									    orientation.multiply(new THREE.Matrix4().set(1,0,0,0,
									                                            0,0,1,0, 
									                                            0,-1,0,0,
									                                            0,0,0,1));

									    var bondGeometry = new THREE.CylinderGeometry( options.bondSize*10, options.bondSize*10, direction.length(), options.bondModelSegments, 1, true);

									    var bond = new THREE.Mesh( bondGeometry, 
									            new THREE.MeshBasicMaterial( { color: 0xffffff } ) );

									    bond.applyMatrix(orientation)
							            bond.position.x = (point2.x + point1.x) / 2;
									    bond.position.y = (point2.y + point1.y) / 2;
									    bond.position.z = (point2.z + point1.z) / 2;
									    view.periodicReplicateMolecule.bonds.push(bond);
									    //scene.add(bond);
									    periodicReplicateBondGroup.add(bond);*/
								    }
							    }
							}
						}
					}
				}
			}
		}
	}
	view.periodicReplicateAtomGroup = periodicReplicateAtomGroup;
	view.periodicReplicateBondGroup = periodicReplicateBondGroup;
	scene.add(periodicReplicateAtomGroup);
	scene.add(periodicReplicateBondGroup);
}


export function removeMoleculePeriodicReplicates(view){
	//console.log("delete molecule replicate");
	//console.log(view.periodicReplicateMolecule);
	/*if (view.periodicReplicateMolecule != null ) {
		//console.log(" start delete molecule replicate");
		for (var i = 0; i < view.periodicReplicateMolecule.bonds.length; i++) {
			view.scene.remove(view.periodicReplicateMolecule.bonds[i]);
		}

		for (var i = 0; i < view.periodicReplicateMolecule.atoms.length; i++) {
			view.scene.remove(view.periodicReplicateMolecule.atoms[i]);
		}

		delete view.periodicReplicateMolecule;
	}*/
	view.scene.remove(view.periodicReplicateAtomGroup);
	view.scene.remove(view.periodicReplicateBondGroup);
	delete view.periodicReplicateAtomGroup;
	delete view.periodicReplicateBondGroup;
	delete view.periodicReplicateMolecule;
}

export function changeMoleculePeriodicReplicates(view){
	removeMoleculePeriodicReplicates(view);
	addMoleculePeriodicReplicates(view);
}