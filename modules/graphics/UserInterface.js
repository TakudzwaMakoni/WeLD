
var UserInterface = function()
{
  var focus = function(args){
    var selection = parseInt(args[0]); // todo: check user input

    nodes.forEach((node) => {
      var index = parseInt(node.getAttribute("idx"))
      var neighbours = data[selection].neighbours;
      var isNeighbour = false;
      for(let i = 0; i < neighbours.length; i++)
      {
        if(index === neighbours[i][0])
        {
          isNeighbour = true
        }
      }

      if( index !== selection && !isNeighbour)
      {
        node.setAttribute("visibility", "hidden");
      }
    });
  }

  var commandMap = new Map(
    [
      ["focus", focus],
    ]
  )

  var data=[]; //data associated with the simulation
  var nodes=[];
  var highlighted=false;

  var output = "";
  var input = "";

  var sim = false;
  this.sim = function(){return sim;}
  var control = false;

  var updateScroll = function(){
    termNode.scrollTop = termNode.scrollHeight;
  }
  var colouredText = function(msg, colour) {
    return "<text class='"+colour+"'>"+msg+"</text>";
  }
  var initTerminal = function(termNode){

    termNode = document.getElementById("terminal");

      termNode.focus();
      termNode.addEventListener("keydown", function( event ) {

        var key = event.keyCode;
        var char = String.fromCharCode((96 <= key && key <= 105) ? key-48 : key).toLowerCase();

        // If the user has pressed enter

        switch (key) {
          case 32 /*space*/:
          {
            input+=(input.slice(-1)===" "?"":" ");
            termNode.innerHTML = output + "UserIn: " + input + "<";;
            break;
          }
          case 13 /*enter*/:
          {
            var args = input.split(" ");
            var command = args[0]
            var fn = commandMap.get(command);
            fn(args.slice(1));
            input = "";
            termNode.innerHTML = output + "UserIn: " +input + "<";
            break;
          }
          case 8/*backspace*/:
          {
            if(input.length>0)
            {
              input = input.slice(0, -1);
              termNode.innerHTML = output + "UserIn: " +input + "<";
            }
            break;
          }
          case 37/*left*/:
          {

            break;
          }
          case 39/*right*/:
          {

            break;
          }
            case 38/*up*/:
          {

            break;
          }
            case 40/*down*/:

              break;
          default:
          {
            input += char;
            termNode.innerHTML = output + "UserIn: " + input + "<";
          }
          console.log(input);

        }
      }, false);
    }
  this.colouredText = function(msg, colour){
    return colouredText(msg, colour);
  }
  var logWarning = function(msg, newline=true){
      output += colouredText("WeLD (warning): ","orange") + msg + (newline?"<br/>":"");
      document.getElementById("terminal").innerHTML = output + "UserIn: " + input + "<";
      updateScroll()
    }
  this.logWarning = function(msg,newline=true){logWarning(msg,newline)}

  var logError = function(msg, newline=true){
      output += colouredText("WeLD (error): ","red") + msg + (newline?"<br/>":"");
      document.getElementById("termNode").innerHTML = output + "UserIn: " + input + "<";
      updateScroll()
    }
  this.logError = function(msg,newline=true){logError(msg,newline)}

  var log = function (msg, newline=true) {
      output += colouredText("WeLD: ","green") + msg + (newline?"<br/>":"") ;
      document.getElementById("terminal").innerHTML = output + "UserIn: " + input + "<";
      updateScroll()
    };
  this.log = function(msg,newline=true){log(msg,newline)}

  this.setData = function(d){data=d}
  this.setNodes = function(n){nodes=n}
  this.highlight = function(evt, i){
    var datapoint = data[parseInt(i)];
    if(datapoint.stroke=="red")
    {
      datapoint.stroke="black";
      highlighted=false;
    } else {
        datapoint.stroke = "red";
        if(highlighted!==false){
          data[highlighted].stroke = "black";
        }
        highlighted=parseInt(i);
        log("selected node "+colouredText("#"+i,"green"))
      }
  }
  this.showTooltip = function(evt, i) {
    let tooltip = document.getElementById("tooltip");
    var datapoint = data[parseInt(i)];
    tooltip.innerHTML = datapoint.name + ", id: #"+i+"</br>";
    tooltip.innerHTML += "x: "+parseFloat(datapoint.x).toFixed(2)+", y: "+parseFloat(datapoint.y).toFixed(2)+", z: "+parseFloat(datapoint.z).toFixed(2) + "</br>";
    tooltip.innerHTML += "mass: "+parseFloat(datapoint.m).toFixed(2)+", radius: " + parseFloat(datapoint.r).toFixed(2)+"</br>";

    var neighbours = datapoint.neighbours;
    if(Array.isArray(neighbours) && neighbours.length)
    {
      tooltip.innerHTML += "neighbour(s): "
      neighbours.forEach((neighbour) => {
          tooltip.innerHTML += "#"+ neighbour[0] + " ";
      });
    }
    tooltip.innerHTML += ""
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
  }
  this.hideTooltip = function() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  }
  this.loadBasic = function(){

    sim = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.body.appendChild(sim);
    sim.setAttribute("id","sim");
    sim.setAttribute("class","sim"); // todo pick ONE
    sim.style.position = "fixed";
    sim.style.top = "2.5%";
    sim.style.left = "2.5%";
    sim.style.width = "70%";
    sim.style.height = "95%";
    sim.style.backgroundColor = "rgb(33,33,37)";

    termNode = document.createElement("div");
    document.body.appendChild(termNode);
    termNode.setAttribute("tabindex","0");
    termNode.setAttribute("id","terminal");
    termNode.innerHTML = output + "User: " + input + "<";
    termNode.style.position = "fixed";
    termNode.style.top = "2.5%";
    termNode.style.right = "2%";
    termNode.style.width = "25%";
    termNode.style.height = "25%";
    termNode.style.color = "rgb(173,172,173)";
    termNode.style.padding = "2.5px";
    termNode.style.fontFamily = "monospace";
    termNode.style.overflowX = "scroll";
    termNode.style.overflowY = "scroll";
    termNode.addEventListener("focus",function(event){
        termNode.style.color = "black";
        termNode.innerHTML = output + "UserIn: " + input + "<";
    })
    termNode.addEventListener("focusout",function(event){
        termNode.style.backgroundColor = "white";
        termNode.style.color = "rgb(173,172,173)";
    });
    initTerminal(termNode);

    control = document.createElement("div");
    document.body.appendChild(control);
    control.setAttribute("id","control");
    control.style.position = "fixed";
    control.style.top = "28.0%";
    control.style.right = "1.5%";
    control.style.width = "25%";
    control.style.height = "68.5%";
    control.style.color = "rgb(173,172,173)";
    control.style.padding = "2.5px";
    control.style.fontFamily = "monospace";
    control.style.overflowX = "scroll";
    control.style.overflowY = "scroll";

    sim.focus();

  }
  this.slider = function(min=0, max=100, step=1){

    // TODO remove d3 here too
    var container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "40%";
    container.style.height = "10%";
    container.style.top = "0%";
    container.style.right = "1%";
    container.style.padding = "5px";

    var slider = document.createElement("input");
    container.appendChild(slider);
    slider.setAttribute("type","range");
    slider.setAttribute("min",min);
    slider.setAttribute("max",max);
    slider.setAttribute("step",step);
    slider.setAttribute("value",min);
    //slider.style.backgroundColor = "blue";

    var label = document.createElement("p");
    container.appendChild(label);

      return [container, slider, label];
  }

  return this;
}

Graphics.UserInterface = new UserInterface();
