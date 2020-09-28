/*
    Attackpoint Plus written and developed by AJ Riley
*/

////
////                    SCRIPT THAT RUNS WHEN ON A USER'S TRAINING LOG
////

function getUsername() {
  return document.getElementById("utilities").innerHTML.substring(document.getElementById("utilities").innerHTML.indexOf('<strong>')+8, document.getElementById("utilities").innerHTML.indexOf('</strong>'));
}

let whoseLog = "";
if(document.getElementById("contents").getElementsByTagName("H1")[0].innerHTML.indexOf("Training Log Archive") != -1) {
  whoseLog = document.getElementById("contents").getElementsByTagName("H1")[0].childNodes[1].innerHTML;
}
else whoseLog = document.getElementById("contents").getElementsByClassName("logbody")[0].childNodes[1].childNodes[1].innerHTML;


let activities = document.getElementsByClassName("tlactivity");
let trainings = [];
for(i = 0; i < activities.length; i++)
  if(activities[i].getElementsByClassName("actcolor").length != 0)
    trainings.push(activities[i].getElementsByClassName("actcolor")[0].childNodes[0]);
let trainingLikes = {};

chrome.runtime.sendMessage({command: 'request_training_likes', page: whoseLog}, function(response){
  if(response.data == 'none'){
    for(i = 0; i < trainings.length; i++){
      trainingLikes[trainings[i].name] = [whoseLog];
    }
    chrome.runtime.sendMessage({command: 'write_training_likes', page: whoseLog, data: JSON.stringify(trainingLikes)});
  }
  else{
    trainingLikes = JSON.parse(response.data);
  }
  for(i = 0; i < trainings.length; i++){
    let training = trainings[i];
    if(trainingLikes[training.name] == null) trainingLikes[training.name] = [whoseLog];
    let selfHasLiked = false;
    for(j = 0; j < trainingLikes[training.name].length; j++)
      if(trainingLikes[training.name][j] == getUsername())
        selfHasLiked = true;
    // Auto Generate Likes
    if(Math.random() < ((trainingLikes[training.name].length)/((100 + trainingLikes[training.name].length)*Math.pow(trainingLikes[training.name].length, 2)))){
      trainingLikes[training.name].push("auto_generated_like");
    }
    // Create the like button element
    let likeButton = document.createElement("a");
    likeButton.href = 'javascript:void(0)';
    likeButton.textContent = trainingLikes[training.name].length;
    let buttonStyle = "color: #FFA744; font-weight: bold; text-decoration: none; font-size: 13px; font-family: sans-serif, helvetica; display:inline-block";
    if(selfHasLiked)
      buttonStyle = "color: #FFA744; font-weight: bold; text-decoration: underline; font-size: 13px; font-family: sans-serif, helvetica; display:inline-block";
    likeButton.innerHTML.toLowerCase();
    likeButton.style.cssText = buttonStyle;
    let divider = document.createElement("p");
    divider.innerHTML = "|";
    divider.style.marginLeft = "0.5em";
    divider.style.marginRight = "0.5em";
    divider.style.display = "inline-block";
    let footerDiv = document.createElement("div");
    footerDiv.appendChild(likeButton);
    footerDiv.appendChild(divider);
    footerDiv.style.display = 'inline-block';
    footerDiv.style.textAlign = "right";
    training.parentNode.parentNode.getElementsByClassName("editutils")[0].insertBefore(footerDiv, training.parentNode.parentNode.getElementsByClassName("editutils")[0].childNodes[0] || null);
    likeButton.onclick = function() {update(likeButton, trainingLikes, training.name)};
  };
  chrome.runtime.sendMessage({command: 'write_training_likes', page: whoseLog, data: JSON.stringify(trainingLikes)});
});

function update(likeButton, trainingLikes, trainingName){
  if(likeButton.style.textDecoration == "none"){
    trainingLikes[trainingName].push(getUsername());
    likeButton.style.cssText = "color: #FFA744; font-weight: bold; text-decoration: underline; font-size: 13px; font-family: sans-serif, helvetica; display:inline-block";
    likeButton.innerHTML = trainingLikes[trainingName].length;
  }
  else{
    trainingLikes[trainingName].splice(trainingLikes[trainingName].indexOf(getUsername()),1)
    likeButton.style.cssText = "color: #FFA744; font-weight: bold; text-decoration: none; font-size: 13px; font-family: sans-serif, helvetica; display:inline-block";
    likeButton.innerHTML = trainingLikes[trainingName].length;
  }
  chrome.runtime.sendMessage({command: 'write_training_likes', page: whoseLog, data: JSON.stringify(trainingLikes)});
}
