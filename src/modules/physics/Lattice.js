import {randomNumber} from '../helpers.js';

const Lattice = function()
  {
    let ui = false;
    let predicate = false;
    let showEdges = false;
    this.data = [];
    this.a = 20; // default

    this.setShowEdges = function(bool){
      if(bool && ui){
        ui.logWarning("enabling edges may cause a significant hit to the frame rate.")
      }
      showEdges = bool;
    }

    this.showEdges = function(){return showEdges;}

    this.setUI = function(x)
    {
      // typescript to check type maybe?
      ui = x;
    }

    this.makeFCC3D = function(cellsX, cellsY, cellsZ, a, sim)
    {
      this.data = []
      let counter=0;
      for(let h = 0; h < cellsZ; h++)
      {
        for(let i = 0; i < cellsX; i++)
            {
              for(let j = 0; j < cellsY; j++)
              {

                this.data.push(
                  {
                    ri:{
                      x:(a * i) + (0.5 * a),
                      y:(a * j),
                      z:(a * h) + (0.5 * a)},
                    rf:{x:0,y:0,z:0},

                    // velocity
                    vi:{x:randomNumber(-0.01,0.01), y:randomNumber(-0.01,0.01), z:randomNumber(-0.01,0.01)},
                    vf:{x:0,y:0,z:0},
                    forces: [],

                    id:counter++,
                    r:5,  // radius
                    m:1,  // mass
                    name:"basic node",
                    neighbours:[], // index of other atoms
                    valencePairs:[],
                    showEdges:true,
                    visible: true,
                    stroke:"black",
                    edgeStroke:"black",
                    col:"rgb(173,172,173)", // colour
                  }
                )



                this.data.push(
                  {
                    ri:{
                      x:(a * i),
                      y:(a * j) + (0.5 * a),
                      z:(a * h) + (0.5 * a)},
                    rf:{x:0,y:0,z:0},

                    // velocity
                    vi:{x:randomNumber(-0.01,0.01), y:randomNumber(-0.01,0.01), z:randomNumber(-0.01,0.01)},
                    vf:{x:0,y:0,z:0},
                    forces: [],

                    id:counter++,
                    r:5,  // radius
                    m:1,  // mass
                    name:"basic node",
                    neighbours:[],
                    valencePairs:[],
                    showEdges:true,
                    visible: true,
                    stroke:"black",
                    edgeStroke:"black",
                    col:"rgb(173,172,173)", // colour
                  })


                this.data.push(
                  {

                    // displacement
                    ri:{
                      x:(a * i) + (0.5 * a),
                      y:(a * j) + (0.5 * a),
                      z:(a * h)},
                    rf:{x:0,y:0,z:0},

                    // velocity
                    vi:{x:randomNumber(-0.01,0.01), y:randomNumber(-0.01,0.01), z:randomNumber(-0.01,0.01)},
                    vf:{x:0,y:0,z:0},

                    forces: [],
                    id:counter++,
                    r:5,  // radius
                    m:1,  // mass
                    name:"basic node",
                    showEdges:true,
                    visible: true,
                    stroke:"black",
                    edgeStroke:"black",
                    col:"rgb(173,172,173)", // colour
                  }
                )
              }
            }
          }


          if(ui)
          {
            ui.log("loaded"+ui.colouredText(" Face-Centred Cubic ","blue") +"lattice data with "+ui.colouredText(cellsX,"blue")+" x " +ui.colouredText(cellsY,"blue")+" x " +ui.colouredText(cellsZ,"blue")+" unit cells. Total of "+ui.colouredText(this.data.length,"blue")+" nodes.");
          }
    }

    // creates a free-particle lattice
    this.makePrimitive3D = function(cellsX, cellsY, cellsZ, a)
    {
      this.a = a;
      this.data = []
      const nodes = []
      let counter=0;
      for(let h = 0; h < cellsZ; h++){
        for(let i = 0; i < cellsX; i++)
        {
          for(let j = 0; j < cellsY; j++)
          {

            this.data.push(
              {
                // displacement
                ri:{x:a * i,y:a * j,z:a * h},
                rf:{x:0,y:0,z:0},

                // velocity in angstrom / seconds
                vi:{x:0,y:0,z:0},
                //vi:{x:randomNumber(-1e-5,1e-5),y:randomNumber(-1e-5,1e-5),z:randomNumber(-1e-5,1e-5)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],
                force: {x: 0, y: 0, z: 0},
                id:counter++,
                r:5,  // radius in angstrom
                m:1,  // 1 carbon mass
                name:"basic node",
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"orange", // colour
              }
            )
          }
        }
      }

      if(ui)
      {
        ui.log("loaded"+ui.colouredText(" Primitive Cubic ","blue") +"lattice data with "+ui.colouredText(cellsX,"blue")+" x " +ui.colouredText(cellsY,"blue")+" x " +ui.colouredText(cellsZ,"blue")+" unit cells. Total of "+ui.colouredText(this.data.length,"blue")+" nodes.");
      }
    }

    this.makePerovskite3D = function(cellsX, cellsY, cellsZ, a, sim)
    {
      this.data = []
      let counter = 0;
      for(h=0; h < cellsZ; h++){
        for(i = 0; i < cellsX; i++)
        {
          for(j = 0; j < cellsY; j++)
          {

            // A cation

            this.data.push(
              {

                ri:{x:a * i,y:a * j,z:a * h},
                rf:{x:0,y:0,z:0},

                vi:{x:randomNumber(-1e-10,1e-10),y:randomNumber(-1e-10,1e-10),z:randomNumber(-1e-10,1e-10)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],
                id:counter++,
                r:5,  // radius
                m:1,  // mass
                name:"A Cation",
                neighbours:[], // index of other atoms
                valencePairs:[],
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"blue", // colour
              }
            )

            // B cation
            this.data.push(
              {
                ri:{
                  x:(a * i) + (a * 0.5),
                  y:(a * j) + (a * 0.5),
                  z:(a * h) + (a * 0.5)},
                rf:{x:0,y:0,z:0},

                vi:{x:randomNumber(-1e-10,1e-10),y:randomNumber(-1e-10,1e-10),z:randomNumber(-1e-10,1e-10)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],

                id:counter++,
                r:10,  // radius
                m:1,  // mass
                name:"B Cation",
                neighbours:[], // index of other atoms
                valencePairs:[],
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"orange", // colour
              }
            )

            // O anion(s)

            this.data.push(
              {
                ri:{
                  x:(a * i) + (a * 0.5),
                  y:(a * j) + (a * 0.5),
                  z:(a * h)},
                rf:{x:0,y:0,z:0},

                vi:{x:randomNumber(-1e-10,1e-10),y:randomNumber(-1e-10,1e-10),z:randomNumber(-1e-10,1e-10)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],

                id:counter++,
                r:10,  // radius
                m:1,  // mass
                name:"O Anion",
                neighbours:[], // index of other atoms
                valencePairs:[],
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"red", // colour
              }
            )

            this.data.push(
              {

                ri:{
                  x:(a * i) + (a * 0.5),
                  y:(a * j),
                  z:(a * h) + (a * 0.5)},
                rf:{x:0,y:0,z:0},

                vi:{x:randomNumber(-1e-10,1e-10),y:randomNumber(-1e-10,1e-10),z:randomNumber(-1e-10,1e-10)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],

                id:counter++,
                r:10,  // radius
                m:1,  // mass
                name:"O Anion",
                neighbours:[], // index of other atoms
                valencePairs:[],
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"red", // colour
              }
            )

            this.data.push(
              {

                ri:{
                  x:(a * i),
                  y:(a * j) + (a * 0.5),
                  z:(a * h) + (a * 0.5)},
                rf:{x:0,y:0,z:0},

                vi:{x:randomNumber(-1e-10,1e-10),y:randomNumber(-1e-10,1e-10),z:randomNumber(-1e-10,1e-10)},
                vf:{x:0,y:0,z:0},

                // forces
                forces: [],

                id:counter++,
                r:10,  // radius
                m:1,  // mass
                name:"O Anion",
                neighbours:[], // index of other atoms
                valencePairs:[],
                showEdges:true,
                visible: true,
                stroke:"black",
                edgeStroke:"black",
                col:"red", // colour
              }
            )
          }
        }
      }

      // create bonds based on a given predicate

      if(ui)
      {
        ui.log("loaded"+ui.colouredText(" Perovskite Cubic ","blue") +"lattice data with "+ui.colouredText(cellsX,"blue")+" x " +ui.colouredText(cellsY,"blue")+" x " +ui.colouredText(cellsZ,"blue")+" unit cells. Total of "+ui.colouredText(this.data.length,"blue")+" nodes.");
      }

    }


    // set forces on all nodes given a predicate. e.g. if a force should
    // behave as though in some field
    this.setForces = function(force, predicate=false)
    {
      this.data.forEach(d => {
        if(predicate){
          if(predicate(d)) d.forces.push(force);
        } else{
          d.forces.push(force);
        }
      });
    }

    // Set forces for all node pairs which satisfy a given a predicate.
    this.setInterAtomicForces = function(force, predicate=false) {
      for(let i = 0; i < this.data.length; i++)
      {
        let d1 = this.data[i];
        for(let j = 0; j < this.data.length; j++)
        {
          let d2 = this.data[j];
          if(predicate)
          {
            if(predicate(d1, d2) && i!==j)
            {
              // last parameter for interatomic force is always
              // the index of the neightbouring node.

              let forceCopy = JSON.parse(JSON.stringify(force));
              forceCopy.params.push(d2.id);
              d1.forces.push(forceCopy);
            }
          } else {
            // will interact with all other particles with this force
            if(d1.id!==d2.id)
            {
            let forceCopy = JSON.parse(JSON.stringify(force));
            forceCopy.params.push(d2.id);
            d1.forces.push(forceCopy);
            }
          }

        }
      }
    }

    // sets force for a user-specific node
    this.setForce = function(index, force)
    {
      this.data[index].forces.push(force)
    }

  }

export const lattice = new Lattice();
export default lattice;
