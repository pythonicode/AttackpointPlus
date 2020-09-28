/*
    Attackpoint Plus written and developed by AJ Riley
*/

////
////                    SCRIPT THAT RUNS WHEN ON A DISCUSSION PAGE
////


function getUsername() {
  return document.getElementById("utilities").innerHTML.substring(document.getElementById("utilities").innerHTML.indexOf('<strong>')+8, document.getElementById("utilities").innerHTML.indexOf('</strong>'));
}

function getAuthor(message){
  return message.getElementsByClassName('discussion_post_name')[0].innerHTML.substring(message.getElementsByClassName('discussion_post_name')[0].innerHTML.indexOf(">")+1, message.getElementsByClassName('discussion_post_name')[0].innerHTML.indexOf("</a>"));
}

let messages = document.getElementsByClassName("discussion_post");
let messageLikes = {};

chrome.runtime.sendMessage({command: 'request_discussion_likes', page: messages[0].id}, function(response){
  if(response.data === 'none'){
    for(i = 0; i < messages.length-1; i++){
      messageLikes[messages[i].id] = [getAuthor(messages[i])];
    }
    // sendMessage to bg script
    chrome.runtime.sendMessage({command: 'write_discussion_likes', page: messages[0].id, data: JSON.stringify(messageLikes)});
  }
  else{
    messageLikes = JSON.parse(response.data);
  }
  for(i = 0; i < messages.length; i++){
    let message = messages[i];
    if(message.getElementsByClassName("discussion_post_time")[0].innerHTML !== 'Post a reply' && getUsername().replace(/\s/g, '') !== '<div>'){
      // Fetch each message in the discussion thread
      let author = getAuthor(message);
      let likes = [];
      if(messageLikes[message.id] == null){
        likes = [author];
        messageLikes[message.id] = [author];
      }
      else{
        likes = messageLikes[message.id];
      }
      let selfHasLiked = false;
      for(j = 0; j < likes.length; j++)
        if(likes[j] === getUsername())
          selfHasLiked = true;
      // Auto generated likes
      if(Math.random()*(Math.pow(likes.length+2, 2)) < 0.1*Math.pow(message.innerHTML.length,0.25)){
        messageLikes[message.id].push("auto_generated_like");
        chrome.runtime.sendMessage({command: 'write_discussion_likes', page: messages[0].id, data: JSON.stringify(messageLikes)});
      }
      // Sync with settings
      chrome.storage.sync.get('options', function(result) {
        // If compact mode is on (essentially)
        let likeButton = '';
        let likeText = '';
        let mode = '';
        if(result.options.indexOf('compact') != -1){
          mode = 'compact'
          // Create the like button element
          likeButton = document.createElement("a");
          likeButton.href = 'javascript:void(0)';
          if(selfHasLiked)
            likeButton.textContent = 'unlike';
          else
            likeButton.textContent = 'like';
          likeText = document.createElement("p");
          likeText.innerHTML = likes.length;
          // Styling
          buttonStyle = "color: #FFA744; font-weight: bold; text-decoration: underline; font-size: 11px; margin:2px; font-family: sans-serif, helvetica; display:inline-block";
          textStyle = "color: #FFA744; font-weight: bold; text-decoration: underline; font-size: 11px; margin:2px; font-family: sans-serif, helvetica; display:inline-block";
          likeButton.innerHTML.toLowerCase();
          likeButton.style.cssText = buttonStyle;
          likeText.style.cssText = textStyle;
          let divider = document.createElement("p");
          divider.margin = '2px';
          divider.style.display = "inline-block";
          divider.innerHTML = "|";
          let footerDiv = document.createElement("div");
          footerDiv.appendChild(likeButton);
          footerDiv.appendChild(likeText);
          footerDiv.appendChild(divider);
          footerDiv.style.margin = "-10px 2px";
          footerDiv.style.display = 'inline-block';
          footerDiv.style.textAlign = "right";
          message.getElementsByClassName("discussion_post_actions")[0].insertBefore(footerDiv, message.getElementsByClassName("discussion_post_actions")[0].childNodes[0] || null);
        }
        else{
          mode = 'not-compact';
          // Create the like button element
          likeButton = document.createElement("button");
          if(selfHasLiked)
            likeButton.textContent = 'Unlike';
          else
            likeButton.textContent = 'Like';
          likeText = document.createElement("p");
          likeText.innerHTML = likes.length;
          buttonStyle = "background-color: orange; font-weight: bold; margin:5px; display:inline-block";
          textStyle = "color: white; font-weight: bold; margin: 5px; display: inline-block";
          likeButton.style.cssText = buttonStyle;
          likeText.style.cssText = textStyle;
          let footerDiv = document.createElement("div");
          footerDiv.appendChild(likeButton);
          footerDiv.appendChild(likeText);
          footerDiv.style.textAlign = "right";
          message.appendChild(footerDiv);
        }
        likeButton.onclick = function() {update(likeButton, likeText, messageLikes, message.id, mode)};
      });
    }
  }
});

function update(likeButton, likeText, messageLikes, messageID, mode){
  if(likeButton.textContent.toLowerCase() === 'like'){
    messageLikes[messageID].push(getUsername());
    if(mode == 'compact')
      likeButton.textContent = 'unlike';
    else likeButton.textContent = 'Unlike';
    likeText.innerHTML = messageLikes[messageID].length;
  }
  else{
    messageLikes[messageID].splice(messageLikes[messageID].indexOf(getUsername()),1)
    if(mode == 'compact')
      likeButton.textContent = 'like';
    else likeButton.textContent = 'Like';
    likeText.innerHTML = messageLikes[messageID].length;
  }
  chrome.runtime.sendMessage({command: 'write_discussion_likes', page: messages[0].id, data: JSON.stringify(messageLikes)});
}
