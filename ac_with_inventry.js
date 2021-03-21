// exit
function exit()
{
	var exit_btn = document.getElementById("exit");
	exit_btn.onclick = function(){
		history.back();
	}
}

exit();

// menu hover coding
function menu_hover()
{
	var app_name = document.getElementById("app-box");
	var li = app_name.getElementsByTagName("LI");
	var i;
	for(i=0;i<li.length;i++)
	{
		li[i].onmouseover = function(){
			this.style.webkitTransform = "rotate(360deg)";
			this.style.mozTransform = "rotate(360deg)";
			this.style.transform = "rotate(360deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
		}

		li[i].onmouseout = function(){
			this.style.webkitTransform = "rotate(0deg)";
			this.style.mozTransform = "rotate(0deg)";
			this.style.transform = "rotate(0deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
		}
	}
}

menu_hover();

// update default ledgers
function default_ledger()
{
	var cash = localStorage.getItem("cash_ledger");
	var profit_loss = localStorage.getItem("profit_loss_ledger");
	if(cash == null && profit_loss == null)
	{
		var cash_ledger = {ledger_name:"Cash",group:"Cash in hand",balance:"",mode:""};
		var cash_store = JSON.stringify(cash_ledger);
		localStorage.setItem("cash_ledger",cash_store);

		var profit_loss_ledger = {ledger_name:"Profit & Loss A/c",group:"Profit & Loss A/c",balance:"",mode:""};
		var profit_loss_store = JSON.stringify(profit_loss_ledger);
		localStorage.setItem("profit_loss_ledger",profit_loss_store);
	}



}

default_ledger();

// unit of measure
function unit_of_measure()
{
  var unit_btn = document.getElementById("unit-of-measure");
  unit_btn.onclick = function()
  {
    var frame = document.getElementById("unit-frame");
    frame.style.display = "block";
    frame.src = "accounts_only.html#unit-of-measure";
    alert(frame.innerHTML)
  }
}
unit_of_measure();

// unit of measure
function unit_of_measure()
{
	document.getElementById("unit-of-measure").onclick = function()
	{
	var frame = document.getElementById("frame");
	frame.style.display = "block";
	frame.src = "accounts_only.html#unit-of-measure";
	frame.onload = function(){
		var target = this.contentWindow.document.getElementById("unit-of-measure");
		target.style.position = "absolute";
		target.style.top = "0";	
		target.style.left = "0";
		target.click();
		frame.contentWindow.document.getElementById("close-icon").style.display = "none";
		var close_btn = document.createElement("I");
		close_btn.className = "fa fa-close";
		target.append(close_btn);
		close_btn.style.float = "right";
		close_btn.onclick = function(){
			frame.style.display = "none";
			setTimeout(function(){window.location = location.href;},100);
		}
		frame.contentWindow.document.getElementById("select-measure-text").style.display = "block";
		var select_measure = frame.contentWindow.document.getElementById("select-measure");
		select_measure.style.display = "block";
		var i;
		for(i=0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match("unit_of_measure"))
			{
				var key_data = localStorage.getItem(all_keys);
				var data = JSON.parse(key_data);
				var option = document.createElement("OPTION");
				option.append(document.createTextNode(data.symbol));
				select_measure.append(option);
			}
		}

		select_measure.onchange = function(){
			var unit_del = frame.contentWindow.document.getElementById("unit-del");
			unit_del.style.display = "block";
			unit_del.onclick = function(){
				var confirm = window.confirm("Do you want to delete ?");
				if(confirm == true)
				{
					localStorage.removeItem("unit_of_measure_"+select_measure.value);
					window.location = location.href;
				}

			}

			var unit_as_string = localStorage.getItem("unit_of_measure_"+select_measure.value);
			var unit_data = JSON.parse(unit_as_string);
			var input = frame.contentWindow.document.getElementsByTagName("INPUT");
			input[0].value = unit_data.symbol;
			var store_symbol = input[0].value;
			input[1].value = unit_data.formal_name;
			input[2].type = "button";
			input[2].onclick = function()
			{
				if(store_symbol == input[0].value)
				{
					var unit_obj = {
						symbol : input[0].value,
						formal_name : input[1].value
					}

					var update = JSON.stringify(unit_obj);
					localStorage.setItem("unit_of_measure_"+input[0].value,update);
					var success = document.createElement("DIV");
					success.append(document.createTextNode("Saved"));
					success.style.color = "red";
					success.style.transform = "rotateX(-180deg)";
					success.style.float = "left";
					target.append(success);
					setTimeout(function(){
						window.location = location.href;
					},2000);
				}

				else{
					localStorage.removeItem("unit_of_measure_"+select_measure.value);
					var unit_obj = {
						symbol : input[0].value,
						formal_name : input[1].value
					}

					var update = JSON.stringify(unit_obj);
					localStorage.setItem("unit_of_measure_"+input[0].value,update);
					var success = document.createElement("DIV");
					success.append(document.createTextNode("Saved"));
					success.style.color = "red";
					success.style.transform = "rotateX(-180deg)";
					success.style.float = "left";
					target.append(success);
					setTimeout(function(){
						window.location = location.href;
					},2000);
				}
			}
		}

	}
	}
}

unit_of_measure();