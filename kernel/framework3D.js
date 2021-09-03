

// returns the screen x coordinate equivalent of the user defined coordinate system
var screenToCentreX = function(x, worldWidth = 1000){
  var screenToCentreOffX = worldWidth/2;
  return (x + screenToCentreOffX);
}
// returns the screen y coordinate equivalent of the user defined coordinate system
var screenToCentreY = function(y, worldHeight = 1000){
  var screenToCentreOffY = worldHeight/2;
  return (screenToCentreOffY - y);
  }

// returns the bottom coordinates
var screenToBottomLeftX = function(x){
  // they are the same!
  return x;
}
var screenToBottomLeftY = function(y, worldHeight = 1000){
  return worldHeight - y ;
}

var centreToBottomLeftX = function(x, worldWidth = 1000){
  return x + worldWidth/2;
}
var centreToBottomLeftY = function(y,worldHeight=1000){
  return (worldHeight/2) + y;
}

var bottomLeftToCentreX = function(x,worldWidth=1000){
  return (-worldWidth/2) + x;
}

var bottomLeftToCentreY = function(x,worldHeight=1000){
  return (-worldHeight/2) + y;
}

// establish a coordinate system
var centreToScreenY = function(y, worldHeight=1000){
  return (worldHeight/2) - y;
}
var centreToScreenX = function(x, worldWidth=1000){
return  x + worldWidth/2;
}

var bottomLeftToScreenX = function(x, worldWidth=1000){
  // they are the same!
  return x;
}

var bottomLeftToScreenY = function(y,worldHeight=1000){
  return worldHeight - y;
}

var bottomLeftToCentreZ = function(z, worldDepth = 1000){
  return z + worldDepth/2;
}
var centrToBottomLeftZ = function(z, worldDepth = 1000){
  return z - worldDepth/2;
}



var updateVerletV = function(d,t,ax=0,ay=0,az=0){
  d.vx += ax*t;
  d.vy += ay*t;
  d.vz += az*t;
}

var updateVerletP = function(d,t,ax=0, ay=0,az=0){
  d.px += d.vx + (0.5*Math.pow(t,2)*ax);
  d.py += d.vy + (0.5*Math.pow(t,2)*ay);
  d.pz += d.vz + (0.5*Math.pow(t,2)*az);
}

var exchangeMomenta = function(p, data){
   for(var i = 0; i < data.length; i++)
   {
     var q = data[i];

            // find particles within range for collision

      var dx = p.px - q.px;
      var dy = p.py - q.py;

      var r = Math.sqrt(Math.pow(dy,2) + Math.pow(dx,2));
      if(r < (p.r + q.r) && p != q){

        /*
         // move the particles away from each other a little
         var speed_p =  Math.sqrt(Math.pow(p.vx,2)+Math.pow(p.vy,2));
         p.px -= p.vx != 0 ? 0.5 * r * (speed_p/p.vx) : 0;
         p.py -= p.vy != 0 ? 0.5 * r * (speed_p/p.vy) : 0;

         var speed_q =  Math.sqrt(Math.pow(q.vx,2)+Math.pow(q.vy,2));
         q.px -= q.vx != 0 ? 0.5 * r * (speed_q/q.vx) * (Math.sign(q.vx)==Math.sign(p.vx) ? -1 : 1) : 0;
         q.py -= q.vy != 0 ? 0.5 * r * (speed_q/q.vy) * (Math.sign(q.vy)==Math.sign(p.vy) ? -1 : 1) : 0;
         */

         var alpha = (p.m - q.m) / (p.m + q.m);
         var beta =  (2*q.m) / (p.m + q.m);
         var gamma = (q.m - p.m) / (p.m + q.m);
         var delta = (2*p.m) / (q.m + p.m);

         var pvx = alpha * p.vx + beta * q.vx;
         var pvy = alpha * p.vy + beta * q.vy;
         var pvz = alpha * p.vz + beta * q.vz;

         var qvx = gamma * q.vx + delta * p.vx;
         var qvy = gamma * q.vy + delta * p.vy;
         var qvz = gamma * q.vz + delta * p.vz;


         p.vx = pvx * p.cofr * q.cofr;
         p.vy = pvy * p.cofr * q.cofr;
         p.vy = pvz * p.cofr * q.cofr;

         data[i].vx = qvx * p.cofr * q.cofr;
         data[i].vy = qvy * p.cofr * q.cofr;
         data[i].vz = qvz * p.cofr * q.cofr;

         updateVerletP(p,0.00001,0,0);
         updateVerletP(q,0.00001,0,0);
       }

   }
 }

 var randomNumber = function(min, max) {
   return Math.random() * (max - min) + min;
 }

 var randomColour = function(){
   return "rgb("+randomNumber(0,255)+","+randomNumber(0,255)+","+randomNumber(0,255)+")";
 }

 var zFactor = function(d,z,zp){
   return (1-((d)/Math.abs(z-zp)));
 }

 var createCentredBox = function(w,h,d,zp=2){

   var a = zFactor(d,d/2,zp);
   var b = zFactor(d,-d/2,zp);

   //The data for our line
   var topEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2 * a)},
   ];

   var leftEdge = [
     { x: centreToScreenX(-w/2 * a ),   y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2  * a)},
   ];

   var bottomEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a)},
   ];

   var rightEdge = [
     { x: centreToScreenX(w/2 * a),   y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a)},
   ];

   var innerEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a)},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a)},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a)},
   ]

   var outerEdge = [
     { x: centreToScreenX(-w/2 * b),   y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b)},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b)},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b)},
   ]

   return [topEdge,bottomEdge,leftEdge,rightEdge,innerEdge,outerEdge]

 }

 var createCentredBoxZ = function(w,h,d,zp=2){

   var a = zFactor(d,d/2,zp);
   var b = zFactor(d,-d/2,zp);

   //The data for our line
   var topEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b),z:-d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2 * a), z:d/2},
   ];

   var leftEdge = [
     { x: centreToScreenX(-w/2 * a ),   y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b), z:-d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2  * a), z:d/2},
   ];

   var bottomEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
   ];

   var rightEdge = [
     { x: centreToScreenX(w/2 * a),   y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
   ];

   var innerEdge = [
     { x: centreToScreenX(-w/2 * a),   y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(h/2 * a), z:d/2},
     { x: centreToScreenX(w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
     { x: centreToScreenX(-w/2 * a),  y: centreToScreenY(-h/2 * a), z:d/2},
   ]

   var outerEdge = [
     { x: centreToScreenX(-w/2 * b),   y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(h/2 * b), z:-d/2},
     { x: centreToScreenX(w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
     { x: centreToScreenX(-w/2 * b),  y: centreToScreenY(-h/2 * b), z:-d/2},
   ]

    return [topEdge,bottomEdge,leftEdge,rightEdge,innerEdge,outerEdge]

 }

 var createCentredCube = function(l,zp){
   return createCentredBox(l,l,l,zp);
 }
 var createCentredCubeZ = function(l,zp){
   return createCentredBoxZ(l,l,l,zp);
 }

 var pointLen3D = function(a,b){
   return Math.sqrt(Math.pow(a.px-b.px,2)+Math.pow(a.py-b.py,2)+Math.pow(a.pz-b.pz,2));
 }
 var pointsEqual = function(a,b){
   return a.x==b.x&&a.y==b.y&&a.z==b.z;
 }
 var facesEqual = function(faceA,faceB){
   console.log("starting face comparison between:")
   console.log("face A:", faceA)
   console.log("face B:", faceB)
   if(faceA.length!=faceB.length){
     console.log("lengths of faces dont match!")
     return false;
   }

   var numEqualPoints = 0;
   for(i = 0; i < faceA.length-1/*last is duplicate of first*/; i++){
     console.log("point a: ",faceA[i])
     for(j = 0; j < faceB.length-1/*last is duplicate of first*/; j++){
       console.log("point b: ",faceB[j])
       if(pointsEqual(faceA[i],faceB[j])){
         console.log("points equal!")
         numEqualPoints++;
       }
     }
   }
   console.log("total equal pts: ", numEqualPoints)
   return numEqualPoints==faceB.length-1;
 }


 //for rotating a single point
 var rotX = function(d,theta){
   return {x:d.x,y:d.y*Math.cos(theta)-d.z*Math.sin(theta),z:d.z*Math.cos(theta)+d.y*Math.sin(theta)};
 }
 var rotY = function(d,rho){
   return {x:Math.cos(rho)*d.x + Math.sin(rho)*d.z,y:d.y,z:Math.cos(rho)*d.y-Math.sin(rho)*d.x}
 }
 var rotZ = function(d,gamma){
   return {x:Math.cos(gamma)*d.x - Math.sin(gamma)*d.y,y:Math.sin(gamma)*d.x+Math.cos(gamma)*d.y,z:d.z}
 }

 // for rotating entire shape (array of edges)
 var rotateFacesX = function(faces,theta){
   var rotatedFaces = [];
   faces.forEach(function(face){
     var rotatedPoints = [];
     face.forEach(function(point){
       rotatedPoints.push(rotX(point,theta));
     });
     rotatedFaces.push(rotatedPoints);
   });
   return rotatedFaces;
 }

 var rotateFacesY = function(faces,theta){
   var rotatedFaces = [];
   faces.forEach(function(face){
     var rotatedPoints = [];
     face.forEach(function(point){
       rotatedPoints.push(rotY(point,theta));
     });
     rotatedFaces.push(rotatedPoints);
   });
   return rotatedFaces;
 }

 var rotateFacesZ = function(faces,theta){
   var rotatedFaces = [];
   faces.forEach(function(face){
     var rotatedPoints = [];
     face.forEach(function(point){
       rotatedPoints.push(rotZ(point,theta));
     });
     rotatedFaces.push(rotatedPoints);
   });
   return rotatedFaces;
 }

 ///////////////////////////////////////////////////////////////////////////
 ///////////////////////// vectors /////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
