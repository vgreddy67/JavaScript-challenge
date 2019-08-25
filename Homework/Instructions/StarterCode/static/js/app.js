// from data.js
var tableData = data;

// YOUR CODE HERE!
//Function adds the option fields for the passed list item with the passed array parameter
function addSelect(lival, arr){
    //Selecting the element using the id value passed as parameter.
    var selectItem = document.getElementById(lival);

    //Clearing the dropdown list items if present. 
    //To avaoid having wrong cities for state and wrong states for countries etc.
    if (selectItem.options.length > 0){
        selectItem.options.length = 0;
    }

    //creating dropdown box values or options dynamically
    for(var i=0;i<arr.length;i++){
        var option = document.createElement("option");
        option.text = arr[i];
        option.value = arr[i];
        selectItem.add(option);
    }
    
    //Defaultly no item is selected in the dropdown box
    selectItem.value = "";
}

//Remove duplicates from arrays and return arrays with no duplicate values.
function removeDuplicates(arrData){
        let unique = {};
        arrData.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        
        return Object.keys(unique);
}

//Fills data i.e creates option elements for the passed element.
//The data for the country , city,state and shapes is retreived from the data.js
function fillData(selValue){
    // var getCity = tableData.filter(searcheCity => searcheCity.city);
    // console.log(getCity);
        var optionData = [];
        tableData.forEach((ufoData)=>{
            Object.entries(ufoData).forEach(([key,value])=>{
            if(key === selValue)
            optionData.push(value);
            });
        });
    var optionsArray = removeDuplicates(optionData);
    addSelect(selValue,optionsArray);
}

//Defaulty populate all the dropdown boxes with values.
fillData("country");
fillData("state");
fillData("city");
fillData("shape");

//Dynamic population of cities and state dropdown boxes 
//Function is called on onChange method for country and state dropdown's
//For Country it will take the selected country and retreives the states only for that country
// and cities for only that country.
//When called onChange for a state onlt that states cities are displayed 
//in the cities dropdown box.
function getData(dropVal){
    // console.log(dropVal);
    var cityval;
    var stateval;
    var statearr = [];
    var cityarr = [];

    //iterating through the entire data set.
    tableData.forEach((ufoData)=>{
        Object.entries(ufoData).forEach(([key,value])=>{

            //storing the city and state values in variables for each object.
            if(key === "city"){
                cityval = value;
            }
            if (key === "state"){
                stateval = value;
            }

            //checking  if the current value is the value that has been selected
            if(value === dropVal){
                //if the value is equal then is the key a country or a state.
                if(key === "country"){
                    //The key is a country. so populating the state and city arrays with respective values
                    statearr.push(stateval);
                    cityarr.push(cityval);
                }else if (key === "state"){
                    //The key is state. so populating only the city array for the state.
                    cityarr.push(cityval);
                }
            }
        });
    });

    //checking if the state arra is having values.
    //If it has values the populate both state and city dropdowns.
    //else if state array is zero and city array is having values poplate city dropdown
    if (statearr.length > 0){
        var stateArray = removeDuplicates(statearr);
        addSelect("state",stateArray);

        var cityArray = removeDuplicates(cityarr);
        addSelect("city",cityArray);

        console.log(stateArray);
        console.log(cityArray);
    }else if(statearr.length === 0 && cityarr.length > 0){
        var cityArray = removeDuplicates(cityarr);
        addSelect("city",cityArray);
    }
    
}

//Get button reference
var filter_btn = d3.select("#filter-btn");

//Get table reference
var ufo_tbody = d3.select("tbody");

//on the click of the filter button
filter_btn.on("click",function(){

    d3.event.preventDefault();

    // Select the date time field for user input
    var inputdatetime = d3.select("#datetime");
    var datetimeVal = inputdatetime.property("value");
    // console.log(datetimeVal);
    
    // Select the country downdrop list value
    var countryHandle = d3.select("#country");
    // var countryVal = countryHandle.options[countryHandle.selectedIndex].value;
    var countryVal = countryHandle.property("value");
    // console.log(countryVal);

    // Select the state downdrop list value
    var stateHandle = d3.select("#state");
    var stateVal = stateHandle.property("value");
    // console.log(stateVal);

    // Select the city downdrop list value
    var cityHandle = d3.select("#city");
    var cityVal = cityHandle.property("value");
    // console.log(cityVal);

    // Select the shape downdrop list value
    var shapeHandle = d3.select("#shape");
    var shapeVal = shapeHandle.property("value");
    // console.log(shapeVal);
 
    // if()
    var filteredData = tableData.filter(searchedate => searchedate.datetime === datetimeVal);
    // console.log(filteredData);

    filteredData.forEach((ufoData)=>{
        // console.log(ufoData);
        // console.log("Key: ");
        var row = ufo_tbody.append("tr");
        Object.entries(ufoData).forEach(([key,value])=>{
            var cell = row.append("td");
            cell.text(value);
        });
    });
});

