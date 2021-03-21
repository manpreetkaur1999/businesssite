// tabs
function tabs()
{
  var tab_list = document.getElementById("tab-list");
  var button = tab_list.getElementsByTagName("BUTTON");
  var hide = document.getElementsByClassName("open");
  var i,j;
  for(i=0;i<button.length;i++)
  {
    button[i].onclick = function(){
      for(j=0;j<hide.length;j++)
      {
        hide[j].style.display = "none";
        document.getElementById("edit-table").style.display = "none";
        document.getElementById("edit-ledger").value = "";
        document.getElementById("search-table").style.display = "none";
        document.getElementById("search-field").value = "";
      }

      for(j=0;j<button.length;j++)
      {
        button[j].className = "";
      }

      var id_value = this.innerHTML.toLowerCase();
      var show_element = document.getElementById(id_value);
      show_element.style.display = "block";

      var input = show_element.getElementsByTagName("INPUT");
      input[0].focus();

      this.className = "active";
    }
  }

 document.getElementById("default").click(); 
}

tabs();

// update cr and dr

function update_cr_dr()
{
  var group = document.getElementById("group");
  group.onchange = function(){
    var ac = this.value;
    var mode = document.getElementById("mode");
    switch(ac)
    {
      case "Capital account" : mode.value = "Cr";
      break;
      case "Sales account" : mode.value = "Cr";
      break;
      case "Purchase account" : mode.value = "Dr";
      break;
      case "Sundry creditors" : mode.value = "Cr";
      break;
      case "Sundry debitors" : mode.value = "Dr";
      break;
      default : mode.value = ""; 

    }
  }
}

update_cr_dr();

// create form submit
function create_submit()
{
  var create_form = document.getElementById("create-form");
  create_form.onsubmit = function(){
    var group = document.getElementById("group");
    if(group.value != "Select group")
    {
      var ledger_name = document.getElementById("ledger-name").value;
      var balance = document.getElementById("balance").value;
      var mode = document.getElementById("mode").value;
      var mailing_name = document.getElementById("mailing-name").value;
      var address = document.getElementById("address").value;
      var ledger_details = {ledger_name:ledger_name,group:group.value,balance:balance,mode:mode,mailing_name:mailing_name,address:address};
      var store_ledger = JSON.stringify(ledger_details);
      localStorage.setItem("ledger_no_"+document.getElementById("ledger-no").innerHTML,store_ledger);

    }
    else{
      group.style.borderColor = "red";
      group.className = "animated infinite pulse";
      group.onclick = function(){
              group.style.borderColor = "";
              group.className = "";
      }
      return false;
    }

  }
}

create_submit();

// update ledger no
function ledger_no()
{
  var i;
  for(i=0;i<localStorage.length;i++)
  {
    var all_keys = localStorage.key(i);
    if(all_keys.match("ledger_no"))
    {
      var no = all_keys.split("_");
      document.getElementById("ledger-no").innerHTML = Number(no[2])+1;
    }

  }
}
ledger_no();
// total calculation
function total_cal()
{
  var i,credit = 0,debit = 0;
  for(i=0;i<localStorage.length;i++)
  {
    var all_keys = localStorage.key(i);
    if(all_keys.match("ledger_no"))
    {
      var ledger_data = localStorage.getItem(all_keys);
      var ledger = JSON.parse(ledger_data);
      if(ledger.mode.match("Cr") != null)
      {
        credit += Number(ledger.balance);
        document.getElementById("credit").innerHTML = credit+" Cr";
      }

      else{
        debit += Number(ledger.balance);
        document.getElementById("debit").innerHTML = debit+" Dr";
      }

      if(credit>debit)
      {
       document.getElementById("dif").innerHTML = credit-debit+" Cr";
      }

      else{
        document.getElementById("dif").innerHTML = debit-credit+" Cr";
      }
    }
  }
}

total_cal();

// edit ledger
function edit_ledger()
{
  var ledger_no = document.getElementById("edit-ledger");
  ledger_no.onkeyup = function(event)
  {
    if(event.keyCode == 13)
    {
      if(this.value == "")
      {
        return false;
      }

      else{
        if(localStorage.getItem("ledger_no_"+this.value) != null)
        {
          var ledger_data = localStorage.getItem("ledger_no_"+this.value);
          var ledger = JSON.parse(ledger_data);
          if(ledger.delete_mode != "active")
          {
          document.getElementById("edit-table").style.display = "block";
          document.getElementById("ledger-notice").innerHTML = "";
          document.getElementById("edit-lno").innerHTML = this.value;
          document.getElementById("edit-lname").innerHTML = "<span contenteditable='true' style='border:1px dashed blue;padding:5px' id='current-lname'>"+ledger.ledger_name+"</span>";
          document.getElementById("select-group").style.display = "block";
          document.getElementById("select-group").value = ledger.group;
          document.getElementById("edit-balance").innerHTML = "<span contenteditable='true' style='border:1px dashed blue;padding:5px' id='current-balance'>"+ledger.balance+"</span> "+"<span id='current-mode'>"+ledger.mode+"</span>";
          document.getElementById("edit-mname").innerHTML = ledger.mailing_name == "" || ledger.mailing_name == undefined?"":"<span contenteditable='true' style='border:1px dashed blue;padding:5px' id='current-mname'>"+ledger.mailing_name+"</span>";
          document.getElementById("edit-address").innerHTML = ledger.address == "" || ledger.address == undefined ? "":"<span contenteditable='true' style='border:1px dashed blue;padding:5px' id='current-address'>"+ledger.address+"</span>";
          document.getElementById("select-group").onchange = function(){
                var ac = this.value;
                var current_mode = document.getElementById("current-mode");
                var mode = document.getElementById("mode");
                switch(ac)
                {
                  case "Capital account" : current_mode.innerHTML = "Cr";
                  break;
                  case "Sales account" : current_mode.innerHTML = "Cr";
                  break;
                  case "Purchase account" : current_mode.innerHTML = "Dr";
                  break;
                  case "Sundry creditors" : current_mode.innerHTML = "Cr";
                  break;
                  case "Sundry debitors" : current_mode.innerHTML = "Dr";
                  break;
                  default : current_mode.innerHTML = ""; 

                }
          }

          document.getElementById("save").style.display = "block";
          document.getElementById("save").onclick = function(){
            var save_data = {
              ledger_name : document.getElementById("current-lname").innerHTML,
              group : document.getElementById("select-group").value,
              balance : document.getElementById("current-balance").innerHTML,
              mode : document.getElementById("current-mode").innerHTML,
              mailing_name : document.getElementById("current-mname").innerHTML,
              address : document.getElementById("current-address").innerHTML
            };

            var final_data = JSON.stringify(save_data);
            localStorage.setItem("ledger_no_"+ledger_no.value,final_data);
          }

          document.getElementById("delete").style.display = "block";
          document.getElementById("delete").onclick = function(){
            var user_choice = window.confirm("Are you sure ?");
            if(user_choice == true)
            {
              save_data = {
              ledger_name : document.getElementById("current-lname").innerHTML,
              group : document.getElementById("select-group").value,
              balance : document.getElementById("current-balance").innerHTML,
              mode : document.getElementById("current-mode").innerHTML,
              mailing_name : document.getElementById("current-mname") == null ? "":document.getElementById("current-mname").innerHTML,
              address : document.getElementById("current-address") == null ? "" : document.getElementById("current-address").innerHTML,
              delete_mode : "active"
              };

            final_data = JSON.stringify(save_data);
            localStorage.setItem("ledger_no_"+ledger_no.value,final_data);
            window.location = location.href;
            }
          }



        }

          else{
              document.getElementById("ledger-notice").innerHTML = "whoops ledger deleted sometimes ago <button id='restore'>Restore ledger</button>";
              document.getElementById("restore").onclick = function(){
                var take_data = localStorage.getItem("ledger_no_"+ledger_no.value);          
                var final_choice = window.confirm("Do you want to restore ledger ?");
                if(final_choice == true)
                {
                  localStorage.setItem("ledger_no_"+ledger_no.value,take_data.replace("active","deactive"));
                  window.location = location.href;
                }
              }
          }





        }

        else{
          document.getElementById("edit-table").style.display = "none";
          document.getElementById("ledger-notice").innerHTML ="<i class='fa fa-ban'></i> Ledger not found ";
          document.getElementById("edit-lno").innerHTML = "";
          document.getElementById("edit-lname").innerHTML = "";
          document.getElementById("edit-group").innerHTML = "";
          document.getElementById("edit-balance").innerHTML = "";
          document.getElementById("edit-mname").innerHTML = "";
          document.getElementById("edit-address").innerHTML = "";
          document.getElementById("save").style.display = "none";
          document.getElementById("delete").style.display = "none";
          document.getElementById("select-group").style.display = "none";
        }
      }
    }
  }

}
edit_ledger();

// search ledger
function search_ledger()
{
  var search = document.getElementById("search-field");
  search.onkeyup = function(event){
    if(event.keyCode == 13)
    {
      if(this.value == "")
      {
        return false;
      }
      else{
        if(localStorage.getItem("ledger_no_"+this.value) != null)
        {
          var search_data = localStorage.getItem("ledger_no_"+this.value);
          var search_all = JSON.parse(search_data);
          document.getElementById("search-notice").innerHTML = "";
          document.getElementById("search-table").style.display = "block";
          document.getElementById("s-ln").innerHTML = this.value;
          document.getElementById("s-lname").innerHTML = search_all.ledger_name;
          document.getElementById("s-group").innerHTML = search_all.group;
          document.getElementById("s-mname").innerHTML = search_all.mailing_name;
          document.getElementById("s-address").innerHTML = search_all.address;
          document.getElementById("s-balance").innerHTML = search_all.balance +" "+search_all.mode;
          
        }

        else{
          document.getElementById("search-notice").innerHTML = "<i class='fa fa-ban'></i> Ledger not found";
           document.getElementById("search-table").style.display = "none";
        }
      }
    }
  }
}
search_ledger();

