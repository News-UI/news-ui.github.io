const url = "./us_json.json";
let us_data;
fetch(url).then(function(resp){
    return resp.json();
})
.then(function(data){
    let my_Div =  document.getElementById("main1");
console.log(data)
    for(x in data){

        let count = data[x]["no_of_news"];
        let company = data[x]["company_name"];
     let i;

     let card = document.createElement('div');
     card.setAttribute("class","card bg-secondary text-white");
   
    let card_body=document.createElement('div');
    card_body.setAttribute("class","card-body");
   
    let title = document.createElement('h4');
title.setAttribute("class","card-title");
title.innerHTML = "Company Name: "+company;

card_body.appendChild(title);
card.appendChild(card_body);
my_Div.appendChild(card)

     for(i=1;i<=count;i++){

let title_text = data[x]["News "+i.toString()]["title"];
let date_text = data[x]["News "+i.toString()]["publish_date"];
let summary_text = data[x]["News "+i.toString()]["summary"];
let url_text = data[x]["News "+i.toString()]["url"];

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
a.setAttribute("class","card-link");
a.setAttribute("href",url_text);
a.innerHTML ="Read Complete News";

card_body.appendChild(title);
card_body.appendChild(date);
card_body.appendChild(summary);
card_body.appendChild(a);

card.appendChild(card_body);

my_Div.appendChild(card);
     }
    }



 });

