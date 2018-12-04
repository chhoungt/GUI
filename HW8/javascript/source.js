/*
Name: Bunchhoung Tiv
Email: bunchhoung_tiv@student.uml.edu
Affiliation: Student at UML in course 91.61 GUI Programming I
Date: December 4, 2018
*/

document.getElementById("button").addEventListener("click", function(event){event.preventDefault();},false);

/*
  takes user input and checks for user errors

function input()
{
  <!--grab all user input by element ID -->
  var sNumHContain = Number(document.getElementById("sNumH").value);
  var lNumHContain = Number(document.getElementById("lNumH").value);
  var sNumVContain = Number(document.getElementById("sNumV").value);
  var lNumVContain = Number(document.getElementById("lNumV").value);
  var hError;
  var vError;
  var errorNum = 0;
  var errorM;

  if(sNumHContain == "" || lNumHContain == "" || sNumVContain == "" || lNumVContain == "")
  {
    document.getElementById("ErrorMessage").innerHTML = "You are missing one or more inputs.";
    return;
  }
  if(sNumHContain > lNumHContain)
  {
    hError = "Starting value for horizontal input has to be less than last value."
    hError = hError.bold();
    hError = hError.fontcolor("red");
    document.getElementById("hErrorMessage").innerHTML = hError;
    errorNum = errorNum + 1;
  }

  if(sNumVContain > lNumVContain)
  {
    vError = "Starting value for vertical input has to be less than the last value"
    vError = vError.bold();
    vError = vError.fontcolor("red");
    document.getElementById("vErrorMessage").innerHTML = vError;
    errorNum = errorNum + 2;
  }

  if(errorNum == 3)
  {
    errorM = "Please fix the issues above and resubmit."
    errorM = errorM.fontcolor("orange");
    document.getElementById("ErrorMessage").innerHTML = errorM;
  }

  if(errorNum == 2)
  {
    document.getElementById("hErrorMessage").innerHTML = '';
    errorM = "Please fix the issues above and resubmit."
    errorM = errorM.fontcolor("orange");
    document.getElementById("ErrorMessage").innerHTML = errorM;
  }

  if(errorNum == 1)
  {
    document.getElementById("vErrorMessage").innerHTML = '';
    errorM = "Please fix the issues above and resubmit."
    errorM = errorM.fontcolor("orange");
    document.getElementById("ErrorMessage").innerHTML = errorM;
  }

  if(errorNum == 0)
  {
    document.getElementById("vErrorMessage").innerHTML = '';
    document.getElementById("hErrorMessage").innerHTML = '';
    document.getElementById("ErrorMessage").innerHTML = '';
    makeTable(sNumHContain,lNumHContain,sNumVContain,lNumVContain);
  }

}
*/

$(document).ready(function() {
    gud(); //make sure values are valid
    sliders(); //create sliders
    subways(); //autosubmit
    $.validator.addMethod("greater", function(value, element, param) {
    var $otherElement = $(param);
    return parseInt(value, 10) > parseInt($otherElement.val(), 10);
  });
});

function subways(){
  if($("#userInput").valid()){
    $("#userInput").submit();
  }else{
    return;
  }
}

//This function prevents user from inputting character
//This was found off youtube
function isNumber(evt)
{
  var char = String.fromCharCode(evt.which);

  if(!(/[0-9]/.test(char))){
    evt.preventDefault();
  }
}

function gud(){
  $("#userInput").validate({
    rules: {
      sNumH: {
          required: true,
              },

      lNumH: {
          required: true,
          greater: "#sNumH"
              },

      sNumV: {
          required: true,
              },

      lNumV: {
          required: true,
          greater: "#sNumV"
              }

            },

    messages: {
        sNumH: {
            required: " Please input a number"
                },

        lNumH: {
            required: " Please input a number",
            greater: " Ending number has to be greater than the starting number"
                },

        sNumV: {
            required: " Please input a number"
                },

        lNumV: {
            required: " Please input a number",
            greater: " Ending number has to be greater than the starting number"
                },
            },

        submitHandler: function(event){
          makeTable();
          return false;
        },

        invalidHandler: function(){
          $("#outTable").empty();
          }
        });

}

function sliders(){
    // Horizontal start value
    //var j=jQuery.noConflict
    $("#slide_SH").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#sNumH").val(ui.value);
          subways();
        }
      });
      $("#sNumH").change(function() {
        $("#slide_SH").slider("value", this.value);
        subways();
      });

      // Horizontal last value
      $("#slide_LH").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#lNumH").val(ui.value);
          subways();
        }
      });
      $("#lNumH").change(function() {
        $("#slide_LH").slider("value", this.value);
        subways();
      });

      // Vertical start value
      $("#slide_SV").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#sNumV").val(ui.value);
          subways();
        }
      });
      $("#sNumV").change(function() {
        $("#slide_SV").slider("value", this.value);
        subways();
      });

      // Vertical last value
      $("#slide_LV").slider({
        min: 0,
        max: 12,
        slide: function(event, ui) {
          $("#lNumV").val(ui.value);
          subways();
        }
      });
      $("#lNumV").change(function() {
        $("#slide_LV").slider("value", this.value);
        subways();
      });
}
/*
  used this site for makeTable: https://stackoverflow.com/questions/14643617/create-table-using-javascript?fbclid=IwAR3Q8odn2_xWQ9MgrSPce9g9jzWGeni8N3EgjWl53qzyOQnJdFXKV6VkHyI
*/

function makeTable()
{
  var sNumHContain = Number(document.getElementById("sNumH").value);
  var lNumHContain = Number(document.getElementById("lNumH").value);
  var sNumVContain = Number(document.getElementById("sNumV").value);
  var lNumVContain = Number(document.getElementById("lNumV").value);

  const outTable = document.getElementById("outTable");
  const tb1 = document.createElement("table");
  const tableB = document.createElement("tbody");

  var vValue = document.createElement("tr");
  vValue.appendChild(document.createElement("th"));

  for(let i = sNumHContain; i<= lNumHContain; ++i){
      const th = document.createElement("th");
      th.innerText = i;
      vValue.appendChild(th);
  }
  tableB.appendChild(vValue);

  for(let i = sNumVContain; i <= lNumVContain; i++){
      var vValue = document.createElement("tr");
      let vIndex = document.createElement("th");
      let quickMaths = document.createTextNode(i);
      vIndex.appendChild(quickMaths);
      vValue.appendChild(vIndex);

      for(let j = sNumHContain;j <= lNumHContain; j++){
          var cell = document.createElement("td");
          var cellText = document.createTextNode(i * j);

          cell.appendChild(cellText);
          vValue.appendChild(cell);
      }
      tableB.appendChild(vValue);
  }
  tb1.appendChild(tableB);
  outTable.appendChild(tb1);
  outTable.replaceChild(tb1, outTable.childNodes[0]);
}

var numlist = 1;

function tabsGen() {
    var sNumHContain = Number(document.getElementById("sNumH").value);
    var lNumHContain = Number(document.getElementById("lNumH").value);
    var sNumVContain = Number(document.getElementById("sNumV").value);
    var lNumVContain = Number(document.getElementById("lNumV").value);

    var count = $("#multiTabs li").length + 1;

    if(count > 5) {
        return false;
    }

    $("#multiTabs").tabs();

    numlist++;

    var title = "<li class='tab'><a href='#multiTabs-" + numlist + "'>" + "("+ sNumHContain +
    "," + lNumHContain + "," + sNumVContain + "," + lNumVContain + ")" + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
    $("div#multiTabs ul").append(title);

    $("div#multiTabs").append('<div id=multiTabs-' + numlist + '>'+'<table class="table table-bordered table-hover"' + $("#outTable").html() +'</table>'+ '</div>');

    $("div#multiTabs").append(makeTable());
    $("#multiTabs").tabs("refresh");

    $("#multiTabs").tabs("option", "active", -1);

    $("#multiTabs").delegate( "span.ui-icon-close", "click", function() {
        var num_li = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + num_li).remove();
      });
}
