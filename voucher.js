// tabs
function tabs()
{
  var voucher_page = document.getElementById("voucher-page");
  var button = voucher_page.getElementsByTagName("BUTTON");
  var hide = document.getElementsByClassName("open");
  var i,j;
  for(i=0;i<button.length;i++)
  {
    button[i].onclick = function(){
      for(j=0;j<hide.length;j++)
      {
        hide[j].style.display = "none";
      }

      for(j=0;j<button.length;j++)
      {
        button[j].className = "";
        button[j].getElementsByTagName("P")[0].style.color = "black";

      }

      var id_name = this.getAttribute("name");
      document.getElementById(id_name).style.display = "block";
      this.className = "active";
      this.getElementsByTagName("P")[0].style.color = "white";
    }
  }

  // shortcuts
  window.onkeyup = function(event)
  {
    if(event.altKey && event.keyCode == 80)
    {
      button[0].click();
    }

    else if(event.altKey && event.keyCode == 83)
    {
      button[1].click();
    }
  }
  document.querySelector("[name=purchase]").click();
}

tabs();