
  var rIndex;
  var table;

  var styleInput= "margin-top:10px;margin-left:5px;font-size: 1rem;color: #495057;background: #ffffff;padding: 0.5rem 0.75rem;border: 1px solid #ced4da;transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;appearance: none;border-radius: 4px;"
  var styleTH ="text-align: left;padding: 1rem 1rem;border: 1px solid #dee2e6;border-width: 1px 0 2px 0;font-weight: 600;color: #212529; background: #ffffff;transition: box-shadow 0.15s;"
  var styleTD="text-align: left;border: 1px solid #dee2e6; border-width: 1px 0 0 0; padding: 1rem 1rem;"

function generarTabla(){
    var numFilas  = document.getElementById('numFilas').value;
    var numColumnas  = document.getElementById('numColumnas').value;

    var contenedorTabla = document.getElementById('contenedorTabla');

    contenedorTabla.innerHTML ="";

    var tabla ="<table id='table1' style='border-collapse: collapse;'>";

    for (var i = 1; i <=  numFilas; i++){
        tabla+= "<tr>"
        for (var c = 1; c <=  numColumnas; c++){
            if (i == 1){
                tabla += "<th style='"+styleTH+"'>"+"Cabecera" +c +"</th>"
            }else{
                tabla += "<td style='"+styleTD+"'>"+"Valor" +c +"</td>"
            }
           
        }
        tabla +="</tr>"
    }
    tabla +="</table>"
    
    contenedorTabla.innerHTML = tabla;
    
    tabla += "<br>"
    tabla += "<label><strong>Edite la tabla por fila: </strong> A continuación seleccione en la tabla la fila que desea editar.</label>"
    tabla += "<br>"
    tabla += "<div class='inputs-table' style='display:flex; flex-wrap:wrap; margin-top:10px;'>"

    for (var j=1; j<=numColumnas;j++){
        tabla += "<div class='input-element'>"
        tabla += "<label>Atributo"+j+":</label><input type='text' name='atributo"+j+"' id='atributo"+j+"' style='"+styleInput+"' pInputText> </div> &nbsp;"
    }

    tabla += "</div>"

    contenedorTabla.innerHTML = tabla;  
  
     table = document.getElementById("table1");
   
    for(var i = 0; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
          // get the seected row index
          rIndex = this.rowIndex;
          for (var j=0; j<numColumnas;j++){
              var atrib= j+1
              var final = "atributo"+atrib
            document.getElementById(final).value = this.cells[j].innerHTML;
            }
          //document.getElementById("atributo1").value = this.cells[0].innerHTML;
          //document.getElementById("atributo2").value = this.cells[1].innerHTML;
          //document.getElementById("atributo3").value = this.cells[2].innerHTML;
        };
    }

}

function editarTabla1(){

    var isEmpty = false
    var numColumnas  = document.getElementById('numColumnas').value;

    for (var j=0; j<numColumnas;j++){
        var atrib= j+1
        var final = "atributo"+atrib 
        final = document.getElementById(final).value;
    if(final == ""){
        alert("El"+final+" esta vacio");
        isEmpty = true;
    }
    if(!isEmpty){

        table.rows[rIndex].cells[j].innerHTML = final;
    }
    }
    console.log("Index"+rIndex)

  /*  if(!isEmpty()){

        table.rows[rIndex].cells[0].innerHTML = fname;
        table.rows[rIndex].cells[1].innerHTML = lname;
        table.rows[rIndex].cells[2].innerHTML = age;
      }*/
}

var func = function retornarTabla(){
    return table
}





