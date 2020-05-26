const url = "./json/final_data.json";
let us_data;

fetch(url).then(function(resp){
    return resp.json();
})
.then(function(data){
    let graph_data={};

    let my_Div =  document.getElementById("main1");
    for(x in data["News"]["FOREX"]){

        let count = data["News"]["FOREX"][x]["no_of_news"];
        let company = data["News"]["FOREX"][x]["currency_pair"];


        let graph_data_1 ={};

        var date_data = data["Plots"]["FOREX"][company]["date"].split(",");
 var close_data = data["Plots"]["FOREX"][company]["close"].split(",").map(Number);
 var open_data = data["Plots"]["FOREX"][company]["open"].split(",").map(Number);
 var low_data = data["Plots"]["FOREX"][company]["low"].split(",").map(Number);
 var high_data = data["Plots"]["FOREX"][company]["high"].split(",").map(Number);


 graph_data_1["open"] = open_data;
 graph_data_1["close"] = close_data;
 graph_data_1["high"] = high_data;
 graph_data_1["low"] = low_data;
 graph_data_1["date"] = date_data;


 graph_data[company] = graph_data_1;

     let i;

     let card = document.createElement('div');
     card.setAttribute("class","card bg-secondary text-white");
   
    let card_body=document.createElement('div');
    card_body.setAttribute("class","card-body");
   
    let title = document.createElement('h4');
title.setAttribute("class","card-title");
title.setAttribute("style","font-family: 'Merriweather', serif;");
title.innerHTML = "Currency Pair: "+company;

card_body.appendChild(title);
card.appendChild(card_body);
my_Div.appendChild(card)

     for(i=1;i<=count;i++){

let title_text = data["News"]["FOREX"][x]["News "+i.toString()]["title"];
let date_text = data["News"]["FOREX"][x]["News "+i.toString()]["publish_date"];
let summary_text = data["News"]["FOREX"][x]["News "+i.toString()]["text"];
let url_text = data["News"]["FOREX"][x]["News "+i.toString()]["url"];

let card = document.createElement('div');
  card.setAttribute("class","card");

 let card_body=document.createElement('div');
 card_body.setAttribute("class","card-body");

let title = document.createElement('h4');
title.setAttribute("class","card-title");
title.innerHTML = title_text;

let date = document.createElement('p');
date.innerHTML ="Publish Date:  "+ "  " +date_text;


let summary = document.createElement('p');
summary.setAttribute("class","card-text");
summary.innerHTML =summary_text;

let a = document.createElement('a');
a.setAttribute("class","btn btn-info");
a.setAttribute("href",url_text);
a.setAttribute("role","button");
a.setAttribute("target","_blank");
a.innerHTML ="Read Complete News";

card_body.appendChild(title);
card_body.appendChild(date);
card_body.appendChild(summary);
card_body.appendChild(a);

card.appendChild(card_body);

my_Div.appendChild(card);
     }

//------------------------------------------------------------------------------------------------------------------------------------
//plot graphs
//-------------------------------------------------------------------------------------------------------------------------------------


let plot_div = document.createElement('div');
plot_div.setAttribute("id",company);
my_Div.appendChild(plot_div);



    }

    for(x in graph_data){

var trace1 = {
  
x:graph_data[x]["date"],
  
close: graph_data[x]["close"],  
  decreasing: {line: {color: '#cf1114F'}}, 


high:graph_data[x]["high"] ,  
  increasing: {line: {color: '#089955'}}, 
  
  line: {color: 'rgba(31,119,180,1)'}, 
  
low: graph_data[x]["low"] ,
open:graph_data[x]["open"],
type: 'candlestick', 
  xaxis: 'x', 
  yaxis: 'y'
};

var data = [trace1];

var layout = {
  dragmode: 'zoom', 
  margin: {
    r: 10, 
    t: 25, 
    b: 40, 
    l: 60
  }, 
  plot_bgcolor:'#edf0f0',
  showlegend: false, 
  xaxis: {
    autorange: true, 
    domain: [0, 1], 

    rangeslider: {visible:false}, 
    title: 'Date', 
    type: 'date'
  }, 
  yaxis: {
    autorange: true, 
    domain: [0, 1], 
   title:'Price',
    type: 'linear'
  },
  title: {
    text : x,
    font: {
      
      size: 16
    },
    xref: 'paper',
    x: 0.5,
  }
};

Plotly.newPlot(x, data, layout);


    }

    
console.log(graph_data)

 });

