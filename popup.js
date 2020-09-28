/*
    Attackpoint Plus written and developed by AJ Riley
*/

////
////                  SCRIPT THAT RUNS WHEN OPENING THE EXTENSION POPUP
////

//  Detects whether the user is logged in or not which determines whether or not they can use Attackpoint Plus features

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    for (i = 0; i < tabs.length; i++){
      if(tabs[i].url.startsWith('https://www.attackpoint.org')){
        function modifyDOM() {
          return document.getElementById("utilities").innerHTML;
        }
        // Execute script
        chrome.tabs.executeScript({
          code: '(' + modifyDOM + ')();'
        }, (results) => {
          // Get the username
          let output = results[0].substring(results[0].indexOf('<strong>')+8, results[0].indexOf('</strong>'));
          // If the username doesn't exists then tell the user to login
          if(output.replace(/\s/g, '') == '<div>'){
            document.getElementById("id1").innerHTML = "";
            document.getElementById("id2").innerHTML = "Please Login";
          }
          else {
            document.getElementById("id1").innerHTML = "Logged in as";
            document.getElementById("id2").innerHTML = output;
          }
        });
      }
    };
});

var optionsList = document.getElementsByClassName('options');
for (i = 0; i < optionsList.length; i++){
  function saveoption(option) {
    chrome.storage.sync.get('options', function(result) {
      if(!result.options)
        result.options = []
      if(option.checked)
        if(result.options.indexOf(option.id) == -1)
          result.options.push(option.id)
      if(!option.checked)
        if(result.options.indexOf(option.id) != -1)
          result.options.splice(result.options.indexOf(option.id), 1)
      chrome.storage.sync.set({options: result.options}, function() {
        console.log('Saved Options: ' + result.options);
      });
    });
  }
  optionsList[i].addEventListener('click', saveoption.bind(null, optionsList[i]));
}

chrome.storage.sync.get('options', function(result) {
  for (i = 0; i < optionsList.length; i++){
    optionsList[i].checked = false
  }
  for (i = 0; i < result.options.length; i++){
    document.getElementById(result.options[i]).checked = true
  }
});
