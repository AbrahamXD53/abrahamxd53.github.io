function GetDimensions(){
  return Math.floor((Math.random() * 5) + 2)*100;
}
function NewImage(){
  console.log("Clicked");
   document.getElementById("imgDisplay").style.backgroundImage = "url('http://lorempixel.com/"+GetDimensions()+ "/" +GetDimensions()+"')";
}
