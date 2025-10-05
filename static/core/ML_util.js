const attribute_mode = document.getElementById("sample_button");
const attribute_colors = ['blue', 'green'];
let index = 0;
attribute_mode.addEventListener('click', function buttonColor(){
    attribute_mode.style.backgroundColor = attribute_colors[index];
    console.log(index);
    console.log(attribute_mode.style.backgroundColor);
    index = index + 1;
    if (index == 2){
        index = 0;
    }
});



function tempButtonFunction(tempButton){
    const curTempButton = document.getElementById(tempButton);
    const curstyle = window.getComputedStyle(curTempButton).getPropertyValue('background-color');
    
    console.log(tempButton);
    console.log(curTempButton);
    console.log(curstyle);

    if (curstyle == 'rgb(35, 153, 35)'){
        curTempButton.style.backgroundColor = 'rgb(70, 70, 240)';
    }
    else{
        curTempButton.style.backgroundColor = 'rgb(35, 153, 35)';
    }

}



function isPredictor(color, column, predictor_response){
    var currColumn = document.getElementById(column.id);        
    console.log('column: ', column);
    console.log('predictor_response: ', predictor_response);
    console.log('column.id: ', column.id);
    console.log('predictor_response[column.id]: ', predictor_response[column.id]);
    
    if (color == "red"){  //If column set to response variable 
        predictor_response[column.id] = 0;        //set predictor to 0 (i.e. not a predictor)
        color = 'rgb(255, 0, 0)';
    }
    else{
        predictor_response[column.id] = 1;        ///set predictor to 1 (i.e. is a predictor)
        color = 'rgb(18, 102, 241)';
    }    
    currColumn.style.backgroundColor = color;
    const passedValue = window.getComputedStyle(currColumn).getPropertyValue('background-color');
    console.log('passedValue: ', passedValue);
    /*
    $('.Linear_Regression').html('').load(
        "{% url 'linear_regression' %}?item_num=" + item_num
    );*/

}


function renderFunction(predictorResponse){
    console.log('predictorResponse: ', predictorResponse);
    var dictKeys = Object.keys(predictorResponse);
    var responseVariableNum = 0;
    console.log('dictKeys: ', dictKeys);
    console.log('dictKeys[0]: ', dictKeys[0]);
    console.log('predictorResponse[dictKeys[0]]: ', predictorResponse[dictKeys[0]]);

    console.log('dictKeys.length: ', dictKeys.length);

    for (var j=0; j < dictKeys.length; j++){        
        var column = document.getElementById(dictKeys[j]);
        var renderButton = document.getElementById(j);
        const curstyle = window.getComputedStyle(column).getPropertyValue('background-color');               

        if (curstyle == 'rgb(18, 102, 241)' ){   /* Blue -> Predictor */
            predictorResponse[dictKeys[j]] = 1;
            renderButton.style.backgroundColor = curstyle;
        }    
        else if (curstyle == 'rgb(255, 0, 0)'){  /* Red -> Response */ 
            predictorResponse[dictKeys[j]] = 0;
            renderButton.style.backgroundColor = curstyle;
            responseVariableNum += 1;
        }

        console.log('id: ', j ,' - key: ', dictKeys[j], ' - Value: ', predictorResponse[dictKeys[j]], ' - curstyle: ', curstyle);

    }
    
    let columns = document.getElementById("columnSelectionOutput");
    let hiddenColumns = columns.getAttribute("hidden");

    let warningBanner = document.getElementById('warningBanner');
    let hiddenBanner = warningBanner.getAttribute('hidden');
    console.log('columns: ', columns);

    if (hiddenColumns && responseVariableNum < 2) {
       columns.removeAttribute('hidden');
       warningBanner.setAttribute('hidden', 'hidden');
       console.log('SHOWED');
    }else if (responseVariableNum > 1) {
       columns.setAttribute('hidden', 'hidden');
       warningBanner.removeAttribute('hidden');
       console.log('Too many reponse variables!');
    }
    return predictorResponse;
 
}


function calculateLR(data_id, predictorResponse){
    console.log("button clicked");
    /*var request_data = $this.id;
    console.log("data_id: " + request_data);*/
    console.log('predictorResponse: ', predictorResponse);
    var dictKeys = Object.keys(predictorResponse);
    console.log('dictKeys: ', dictKeys);
    for (var i=0; i < dictKeys.length; i++){
        var column = document.getElementById(dictKeys[i]);        
        const curstyle = window.getComputedStyle(column).getPropertyValue('background-color');               

        if (curstyle == 'rgb(18, 102, 241)' ){   /* Blue -> Predictor */
            predictorResponse[dictKeys[i]] = 1;            
        }    
        else if (curstyle == 'rgb(255, 0, 0)'){  /* Red -> Response */ 
            predictorResponse[dictKeys[i]] = 0;            
        }
    }
    let dictValues = Object.values(predictorResponse);
    console.log('dictValues: ', dictValues);
    console.log('data_id: ', data_id);
    //console.log('csrf_token: ' , csrf_token);
    console.log('type PredictorResponse: ', typeof predictorResponse);

    /*
    $.ajax({
        url : 'Calculations/',
        data : {
            csrfmiddlewaretoken: '{{ csrf_token }}',
            'key1' : 'val1',
        },
        method : 'GET',
        success : function (data) {
            $("#request-access").hide();
            console.log("requested access complete");            
           }
      });
    */
 
    
      function getCookie(c_name)
      {
          if (document.cookie.length > 0)
          {
              c_start = document.cookie.indexOf(c_name + "=");
              if (c_start != -1)
              {
                  c_start = c_start + c_name.length + 1;
                  c_end = document.cookie.indexOf(";", c_start);
                  if (c_end == -1) c_end = document.cookie.length;
                  return unescape(document.cookie.substring(c_start,c_end));
              }
          }
          return "";
       }

   var dataToSend = [predictorResponse, {'id': data_id}];
   
    dataToSend = JSON.stringify({'id':data_id});
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
        data: JSON.stringify([predictorResponse, {'id': data_id}]), //{'id': data_id} ,  //dataToSend,
        success: function (data) {   
         $("#request-access").hide();
         console.log("requested access complete");
         //$("body").append([ {'id': data_id}, predictorResponse]); //Does nothing 
         $("#div1").html(data)
        }
    });
   

}


