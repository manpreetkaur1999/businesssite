// showing profile picture
function show_profile_pic(){
		var pic_box = document.getElementById("pic-box");
		var image_name = localStorage.getItem(sessionStorage.getItem("user_mail")+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
}

show_profile_pic();

// showing company logo

function show_company_logo(){
	var logo = document.getElementById("brand");
	logo.style.backgroundImage="url("+localStorage.getItem("company-logo")+")";
	logo.style.backgroundSize="cover";
	var cmp_name = document.getElementById("brand-name");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	cmp_name.innerHTML = company_details.cmp_name;

}

show_company_logo();

// set unit of measure
function unit_of_measure()
{
	var unit_btn = document.getElementById("unit-of-measure");
	var pri_con = document.getElementById("primary-content");
	var sec_con = document.getElementById("secondary-content");
	var close = document.getElementById("close-icon");
	var form = document.getElementById("unit-form");
	unit_btn.onclick = function demo(){
		document.getElementById("manage-section").style.display = "none";
		this.style.webkitTransform = "rotateX(180deg)";
		this.style.transform = "rotateX(180deg)";
		this.style.webkitTransition = "1s";
		this.style.transition = "1s";
		pri_con.style.display = "none";
		unit_btn.style.height = "auto";

		setTimeout(function(){
			sec_con.style.display = "block";
			sec_con.style.webkitTransform = "rotateX(-180deg)";
			sec_con.style.transform = "rotateX(-180deg)";
			unit_btn.style.height = "auto";

			close.onclick = function(){
				window.location = location.href;
				unit_btn.className = "animated flipInX";
				unit_btn.innerHTML = "<i class='fa fa-balance-scale' style='font-size:25px;float:left'></i> &nbspUnit of measure";
				document.getElementById("manage-section").style.display = "block";
			}

			form.onsubmit = function(){
				var input = sec_con.getElementsByTagName("INPUT");
				var symbol = input[0].value;
				var formal_name = input[1].value;
				var unit_object = {symbol:symbol,formal_name:formal_name};
				var unit_details = JSON.stringify(unit_object);
				localStorage.setItem("unit_of_measure_"+symbol,unit_details);
				var success = document.createElement("div");
				success.append(document.createTextNode("Success"));
				success.style.color = "red";
				success.style.transform = "rotateX(-180deg)";
				success.style.float = "left";
				setTimeout(function(){success.innerHTML = ""},1000);
				unit_btn.append(success);
				this.reset();
				return false;
			}

		},500);	
	
	}
}


unit_of_measure();

// sales voucher
var update_subtotal;
function sales_voucher(){
	var i;
	var sales_btn = document.getElementById("sales-btn");
	var sales_voucher = document.getElementById("sales-voucher");
	sales_btn.onclick = function(){
		sales_voucher.style.display = "block";
		sales_voucher.className = "animated slideInDown";
		document.getElementById("manage-section").style.display = "none";
		// showing voucher number
		for(i=0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match("voucher_no"))
			{
				var find_no = all_keys.split("_");
				all_voucher_no = find_no[2];
				all_voucher_no++;
				document.getElementById("voucher-no").innerHTML = "Voucher no : "+all_voucher_no;
			}

			else if(all_keys.match("voucher_no") == null)

			{
				document.getElementById("voucher-no").innerHTML = "Voucher no : "+all_voucher_no;
			}

		}


		// showing taxes from localstorage
		var tax_display = document.getElementById("tax-col");
		for(i=0;i<localStorage.length;i++)
		{
			var tax_name = localStorage.key(i);
			if(tax_name.indexOf("tax") != -1)
			{
				var tax_item = localStorage.getItem(tax_name);
				var extract = JSON.parse(tax_item);
				tax_display.innerHTML += extract.name_of_tax+"("+extract.tax_qty+")<br>";
				var subtotal = document.getElementById("subtotal").innerHTML;
				document.getElementById("tax-calculation").innerHTML += subtotal+"<br>";
				
			}

		}

		var buyer_form = document.getElementById("buyer-form");
		var input = buyer_form.getElementsByTagName("INPUT");
		input[0].focus();
		input[0].onkeyup = function(event)
		{
			if(event.keyCode == 13)
			{
				input[1].focus();
			}
		}

		input[1].onkeyup = function(event)
		{
					if(event.keyCode == 13)
					{
						input[2].focus();
					}
		}


		input[2].onkeyup = function(event)
		{
					if(event.keyCode == 13)
					{
						input[3].focus();
					}
		}


		input[3].onkeyup = function(event)
				{
					if(event.keyCode == 13)
					{
						document.getElementById("add-product").click();
						var product_table = document.getElementById("product-table");
						product_table.getElementsByTagName("INPUT")[0].focus();
					}
				}

	}


}

sales_voucher();

// close voucher
function close_voucher(){
	var close_btn = document.getElementById("voucher-close");
	var sales_voucher = document.getElementById("sales-voucher");
	close_btn.onclick = function(){
		sales_voucher.className = "animated slideOutUp";
		document.getElementById("manage-section").style.display = "block";
		document.getElementById("tax-col").innerHTML = "";
		document.getElementById("tax-calculation").innerHTML = "";


	}
}

close_voucher();

// showing voucher details and logo
function voucher_logo_details(){
	var voucher_logo = document.getElementById("cmp-pic");
	voucher_logo.src = localStorage.getItem("company-logo");
	voucher_logo.style.backgroundSize = "cover";
	var voucher_details = document.getElementById("voucher-details");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	voucher_details.innerHTML = "<div style='font-size:35px;text-transform:capitalize;font-family:Righteous;font-weight:bold'>"+company_details.cmp_name+"</div><address style='margin-bottom:5px;margin-left:2px;font-size:18px'> venue : "+company_details.address+"</address>"+"call : "+company_details.phone;
}

voucher_logo_details();

// adding item
var store_subtotal,tax=[],store_total,store_paid,store_dues,all_voucher_no = 1;
function add_item(){
	var product_table = document.getElementById("product-table");
	var tr = document.createElement("TR");
	var td_item = document.createElement("TD");
	var td_price = document.createElement("TD");
	var td_qty= document.createElement("TD");
	var td_unit= document.createElement("TD");
	var td_amount = document.createElement("TD");
	var td_delete = document.createElement("TD");
	var input_item = document.createElement("INPUT");
	input_item.type = "text";
	input_item.className = "item";
	input_item.placeholder = "Item Description";
	var input_price = document.createElement("INPUT");
	input_price.className = "price";
	input_price.type = "number";
	input_price.disabled = true;
		input_price.placeholder = "0.00";
		var input_qty = document.createElement("INPUT");
		input_qty.className = "input-qty";
		input_qty.type = "number";
		input_qty.disabled = true;
		input_qty.placeholder = "1";
		var input_unit = document.createElement("SELECT");
		input_unit.className = "unit";
		var u;
		for(u=0;u<localStorage.length;u++)
		{
			var all_keys = localStorage.key(u);
			if(all_keys.match("unit_of_measure"))
			{
				var unit_string = localStorage.getItem(all_keys);
				var unit_details = JSON.parse(unit_string);
				var option = document.createElement("OPTION");
				option.append(document.createTextNode(unit_details.symbol));
				input_unit.append(option);

			}

		}
		var input_amount = document.createElement("INPUT");
		input_amount.type = "number";
		input_amount.placeholder = "0.00";
		input_amount.className = "amount";
		var del_icon = document.createElement("I");
		del_icon.className = "fa fa-trash";
		del_icon.id = "delete-row";
		product_table.append(tr);
		tr.append(td_item);
		tr.append(td_price);
		tr.append(td_qty);
		tr.append(td_unit);
		tr.append(td_amount);
		tr.append(td_delete);				
		td_item.append(input_item);
		td_price.append(input_price);
		td_qty.append(input_qty);
		td_unit.append(input_unit);
		td_amount.append(input_amount);
		td_delete.append(del_icon);
		td_delete.align = "center";
		del_icon.onclick = function(){
			var del_icon_td = this.parentElement;
			var remove_element = del_icon_td.parentElement;
			remove_element.remove();
			var remove_amount = remove_element.getElementsByClassName("amount")[0].value;
			store_subtotal = store_subtotal-remove_amount;
			document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> " + store_subtotal;
			var i,tax_qty = "";
			for(i=0;i<localStorage.length;i++)
			{
				var all_keys = localStorage.key(i);
				if(all_keys.match("tax") != null)
				{
					var tax_string = localStorage.getItem(all_keys);
					var tax_details = JSON.parse(tax_string);
					tax_qty += tax_details.tax_qty+",";
				}
				
			}
			var split_comma = tax_qty.split(",");
			document.getElementById("tax-calculation").innerHTML = "";
			for(i=0;i<split_comma.length-1;i++)
			{
				var num = split_comma[i].replace("%","");
				var final_cal = (store_subtotal*num)/100;
				tax[i] = final_cal;
				document.getElementById("tax-calculation").innerHTML += "<i class='fa fa-rupee'></i> "+final_cal+"<br>";
			}
			var all_taxes = 0;
			for(i=0;i<tax.length;i++)
			{
				all_taxes = all_taxes+tax[i];
			}

			store_total = store_subtotal+all_taxes;
			document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+store_total;
			store_paid = document.getElementById("paid").value;
			store_dues = store_total - store_paid;
			store_dues.toFixed(2);
			document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+store_dues;
			if(store_total == 0)
			{
				document.getElementById("paid").value = "";
				document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+0;
			}



		}

		input_amount.onkeydown = function(){
			return false;
		}

		input_amount.oncontextmenu = function(){
			return false;	
		}

		input_item.oninput = function(){
			this.onkeyup = function(event){
				if(event.keyCode == 13)
				{
					var item_parent = this.parentElement;
					var tr_of_item = item_parent.parentElement;
					tr_of_item.getElementsByTagName("INPUT")[1].focus();
				}
			}
			input_price.disabled = false;
			input_price.oninput = function(){
							this.onkeyup = function(event){
				if(event.keyCode == 13)
				{
					var item_parent = this.parentElement;
					var tr_of_item = item_parent.parentElement;
					tr_of_item.getElementsByTagName("INPUT")[2].focus();
				}
			}
				input_qty.disabled = false;

			}
		}


					input_qty.oninput = function(){
					input_amount.value = input_price.value*input_qty.value;
					var amount_input = document.getElementsByClassName("amount");
					var i;
					var previous_amount = 0;
					for(i=0;i<amount_input.length;i++)
					{
						previous_amount = previous_amount + Number(amount_input[i].value);
						store_subtotal = previous_amount.toFixed(2);
						document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+previous_amount.toFixed(2);
					}
					var reserve = 0;
					for(i=0;i<localStorage.length;i++)
					{
						var tax_key = localStorage.key(i);
						if(tax_key.indexOf("tax") != -1)
						{
							var tax_item = localStorage.getItem(tax_key);
							var extract = JSON.parse(tax_item);
							reserve = reserve+extract.tax_qty+"<br>";
							document.getElementById("tax-calculation").innerHTML = "<span id='percentage' style='display:none'>"+reserve.replace(0,"")+"</span>";
							
						}
					}

					var split_num = document.getElementById('percentage').innerHTML;
					var final_num = split_num.split("%<br>");
					for(i=0;i<final_num.length-1;i++)
					{
						var fixed = (previous_amount*final_num[i])/100;
						tax[i] = fixed.toFixed(2);
						document.getElementById("tax-calculation").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
						previous_amount = previous_amount+fixed;
						store_total = previous_amount.toFixed(2);
						document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);

						document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
						var paid = document.getElementById("paid");
						paid.oninput = function(){
							store_paid = this.value;
							document.getElementById("get-bill").style.display = "block";
							var dues = previous_amount-this.value;
							store_dues = dues.toFixed(2);
							document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
						}

					}




					this.onkeyup = function(event){
						if(event.keyCode == 13)
						{
							document.getElementById("add-product").click();
							var items = document.getElementsByClassName("item");
							items[items.length-1].focus();

						}
					}





				}


					input_price.oninput = function(){
					input_amount.value = input_price.value*input_qty.value;
					var amount_input = document.getElementsByClassName("amount");
					var i;
					var previous_amount = 0;
					for(i=0;i<amount_input.length;i++)
					{
						previous_amount = previous_amount + Number(amount_input[i].value);
						store_subtotal = previous_amount.toFixed(2);
						document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+previous_amount.toFixed(2);
					}
					var reserve = 0;
					for(i=0;i<localStorage.length;i++)
					{
						var tax_key = localStorage.key(i);
						if(tax_key.indexOf("tax") != -1)
						{
							var tax_item = localStorage.getItem(tax_key);
							var extract = JSON.parse(tax_item);
							reserve = reserve+extract.tax_qty+"<br>";
							document.getElementById("tax-calculation").innerHTML = "<span id='percentage' style='display:none'>"+reserve.replace(0,"")+"</span>";
							
						}
					}

					var split_num = document.getElementById('percentage').innerHTML;
					var final_num = split_num.split("%<br>");
					for(i=0;i<final_num.length-1;i++)
					{
						var fixed = (previous_amount*final_num[i])/100;
						tax[i] = fixed.toFixed(2);
						document.getElementById("tax-calculation").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
						previous_amount = previous_amount+fixed;
						store_total = previous_amount.toFixed(2);
						document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);

						document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
						var paid = document.getElementById("paid");
						paid.oninput = function(){
							store_paid = this.value;
							document.getElementById("get-bill").style.display = "block";
							var dues = previous_amount-this.value;
							store_dues = dues.toFixed(2);
							document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
						}

					}




					this.onkeyup = function(event){
						if(event.keyCode == 13)
						{
							document.getElementById("add-product").click();
							var items = document.getElementsByClassName("item");
							items[items.length-1].focus();

						}
					}





				}
}


function adding_item(){
	document.getElementById("add-product").onclick = function()
	{
		add_item();
	}
}

adding_item();

// tax setup
function tax_setup(){
	var tax_btn = document.getElementById("tax-btn");
	var tax_link = document.getElementById("tax-link");
	var tax_form = document.getElementById("tax-form");
	tax_link.onclick = function(){
		if(tax_btn.offsetHeight == 65)
		{
		document.getElementById("manage-section").style.display = "none";
		tax_btn.style.height = "250px";
		tax_btn.style.webkitTransition = "0.5s";
		tax_btn.style.transition = "0.5s";
		}

		else{
			document.getElementById("manage-section").style.display = "block";
			tax_btn.style.height = "65px";
			tax_btn.style.webkitTransition = "0.5s";
			tax_btn.style.transition = "0.5s";
		}

	var tax_name = document.getElementById("tax-name");
	var tax = document.getElementById("tax");
	tax_name.onchange = function(){
		if(this.value.indexOf("tax") != -1)
		{
			tax.oninput = function(){
				if(tax.value.charAt(0).indexOf("%") == -1)
				{
					document.getElementById("tax-form").onsubmit = function(){
						if(tax.value.indexOf("%") != -1)
						{
							var regexp = /[a-z!=@#+$_^&*({;:"'|\][?/<,.>})-]/i;
							var check = tax.value.match(regexp);
							if(check == null)
							{
								var name_of_tax = document.getElementById("tax-name").value;
								var tax_qty = tax.value;
								var tax_details = {name_of_tax:name_of_tax,tax_qty:tax_qty};
								var tax_string = JSON.stringify(tax_details);
								localStorage.setItem(name_of_tax,tax_string);
							}

							else{
								alert("Only 0 to 9 and % symbol allowed in tax field");
								return false;
							}
						}

						else{
							alert("Must add % symbol in tax field");
							return false;
						}
					}
				}

				else{
					tax.className = "animated infinite pulse";
					tax.value = "% not allowed at first place";
					tax.style.color = "red";
					tax.style.borderColor = "red";
					tax.onclick = function(){
					tax.className = "";
					tax.value = "";
					tax.style.color = "";
					tax.style.borderColor = "";
					}
				}
			}
		}

		else{
			this.className = "animated infinite pulse";
			this.value = "must add tax word";
			this.style.color = "red";
			this.style.borderColor = "red";
			this.onclick = function(){
			this.className = "";
			this.value = "";
			this.style.color = "";
			this.style.borderColor = "";
			}
		}
	}
	}
}

tax_setup();

// showing date
var voucher_date;
function showing_date(){
	var date = new Date();
	var current_date = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	document.getElementById("date").innerHTML += current_date+"/"+month+1+"/"+year;
	voucher_date = current_date+"/"+month+1+"/"+year;
}

showing_date();

// get bill
function get_bill(){
	var get_bill_btn = document.getElementById("get-bill");
	get_bill_btn.onclick = function(){
		var i,store_item = [],store_price = [],store_qty = [],store_unit = [],store_amount = [];
		var remove_element = document.getElementsByClassName("remove");
		for(i=0;i<remove_element.length;i++)
		{
			remove_element[i].style.display = "none";
		}
		document.getElementById("add-product").style.display = "none";
		document.getElementById("voucher-close").style.display = "none";
		document.getElementById("calc-table").border = "1";
		var get_bill_td = this.parentElement;
		var get_bill_tr = get_bill_td.parentElement;
		get_bill_tr.style.display = "none";
		var sales_voucher = document.getElementById("sales-voucher");
		sales_voucher.style.width = "100%";
		sales_voucher.style.left = "0";
		sales_voucher.style.top = "0";
		var input = sales_voucher.getElementsByTagName("INPUT");	
		var select = document.getElementsByTagName("SELECT");
		for(i=0;i<input.length;i++)
		{
			input[i].style.border = "none";
			input[i].style.padding = "0";
			input[i].style.background = "white";

		}

		for(i=0;i<select.length;i++)
		{
			select[i].style.border = "none";
			select[i].style.webkitAppearance = "none";
			select[i].style.mozAppearance = "none";
			select[i].style.appearance = "none";
		}

		document.getElementById("delete-voucher").style.display = "none";

		var product_table = document.getElementById("product-table");
		product_table.border = "1";
		var product_table_tr = product_table.getElementsByTagName("TR");
		for(i=0;i<product_table_tr.length;i++)
		{
			var product_table_td = product_table_tr[i].getElementsByTagName("TD");
			product_table_td[product_table_td.length-1].remove();
		}

		// storing voucher details
		var buyer_name = document.getElementById("name").value;
		var buyer_email = document.getElementById("email").value;
		var buyer_address = document.getElementById("address").value;
		var buyer_phone = document.getElementById("phone").value;
		var buyer_item = document.getElementsByClassName("item");
		for(i=0;i<buyer_item.length;i++)
		{
			store_item[i] =  buyer_item[i].value;
			
		}
		var buyer_price = document.getElementsByClassName("price");
		for(i=0;i<buyer_price.length;i++)
		{
			store_price[i] = buyer_price[i].value;
		}

		var buyer_qty = document.getElementsByClassName("input-qty");
		for(i=0;i<buyer_qty.length;i++)
		{
			store_qty[i] = buyer_qty[i].value;
		}

		var buyer_unit = document.getElementsByClassName("unit");
		for(i=0;i<buyer_unit.length;i++)
		{
			store_unit[i] = buyer_unit[i].value;
		}

		var buyer_amount = document.getElementsByClassName("amount");
		for(i=0;i<buyer_amount.length;i++)
		{
			store_amount[i] = buyer_amount[i].value;
		}

		var buyer_object = {buyer_name:buyer_name,buyer_email:buyer_email,buyer_address:buyer_address,buyer_phone:buyer_phone,store_item:store_item,store_price:store_price,store_qty:store_qty,store_unit:store_unit,store_amount:store_amount,store_subtotal:store_subtotal,store_tax:tax,store_total:store_total,store_paid:store_paid,store_dues:store_dues,store_date:voucher_date};
		var buyer_details = JSON.stringify(buyer_object);
		localStorage.setItem("voucher_no_"+all_voucher_no,buyer_details);


	}
}

get_bill();



// search voucher
function search_voucher()
{
	var search_field = document.getElementById("search-voucher");
	var sales_voucher = document.getElementById("sales-voucher");
	search_field.onkeyup = function(event)
	{
		if(event.keyCode == 13)
		{

			var user_input = "voucher_no_"+this.value;
			var i;
			for(i=0;i<localStorage.length;i++)
			{
				var all_keys = localStorage.key(i);
				if(all_keys == user_input)
				{
					var buyer_string = localStorage.getItem(all_keys);
					var buyer_extract = JSON.parse(buyer_string);
					document.getElementById("sales-btn").click();
					var del_icon = document.getElementById("delete-voucher");
					del_icon.style.display = "block";
					del_icon.onclick = function(){
						var allow = window.confirm("Are you sure ?");
						if(allow == true)
						{
							localStorage.removeItem("voucher_no_"+search_field.value);
							window.location = location.href;
						}




					}
					document.getElementById("voucher-no").innerHTML = "Voucher no : "+this.value;
					document.getElementById("name").value = buyer_extract.buyer_name;
					document.getElementById("email").value = buyer_extract.buyer_email;
					document.getElementById("address").value = buyer_extract.buyer_address;
					document.getElementById("phone").value = buyer_extract.buyer_phone;
					var item = document.getElementsByClassName("item");
					var price = document.getElementsByClassName("price");
					var qty = document.getElementsByClassName("input-qty");
					var unit = document.getElementsByClassName("unit");
					var amount = document.getElementsByClassName("amount");
					var item_length = buyer_extract.store_item.length;
					var j;
					for(j=0;j<item_length;j++)
					{
						document.getElementById("add-product").click();
						item[j].value = buyer_extract.store_item[j];
						price[j].value = buyer_extract.store_price[j];
						price[j].disabled = false;
						qty[j].value = buyer_extract.store_qty[j];
						qty[j].disabled = false;
						unit[j].value = buyer_extract.store_unit[j];
						amount[j].value = buyer_extract.store_amount[j];
					}

					
					var amount_input = document.getElementsByClassName("amount");
				
					var previous_amount = 0;
					for(j=0;j<amount_input.length;j++)
					{
						previous_amount = previous_amount + Number(amount_input[j].value);
						store_subtotal = previous_amount.toFixed(2);
						document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+previous_amount.toFixed(2);
					}
					var reserve = 0;
					for(j=0;j<localStorage.length;j++)
					{
						var tax_key = localStorage.key(j);
						if(tax_key.indexOf("tax") != -1)
						{
							var tax_item = localStorage.getItem(tax_key);
							var extract = JSON.parse(tax_item);
							reserve = reserve+extract.tax_qty+"<br>";
							document.getElementById("tax-calculation").innerHTML = "<span id='percentage' style='display:none'>"+reserve.replace(0,"")+"</span>";
							
						}
					}

					var split_num = document.getElementById('percentage').innerHTML;
					var final_num = split_num.split("%<br>");
					for(j=0;j<final_num.length-1;j++)
					{
						var fixed = (previous_amount*final_num[j])/100;
						tax[j] = fixed.toFixed(2);
						document.getElementById("tax-calculation").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
						previous_amount = previous_amount+fixed;
						store_total = previous_amount.toFixed(2);
						document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);

						document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
						var paid = document.getElementById("paid");
						paid.oninput = function(){
							store_paid = this.value;
							document.getElementById("get-bill").style.display = "block";
							var dues = previous_amount-this.value;
							store_dues = dues.toFixed(2);
							document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
						}

					}

					document.getElementById("paid").value = buyer_extract.store_paid;
					document.getElementById("dues").innerHTML = "<i class='fa fa-rupee'></i> "+buyer_extract.store_dues;
					document.getElementById("date").innerHTML = "Date : "+buyer_extract.store_date;
					all_voucher_no = this.value;
					document.getElementById("get-bill").style.display = "block";

				}





			}

			var date = document.getElementById("date");
			date.onclick = function(){
				var input = window.prompt("Edit date in defined format",buyer_extract.store_date);
				this.innerHTML = "Date : "+input;
				voucher_date = input;
				if(input == null)
				{
					this.innerHTML = "Date : "+buyer_extract.store_date;
				}

			}


				
		}


	}

}
search_voucher();

// showing manage voucher
function manage_voucher()
{
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i)
		if(all_keys.indexOf("voucher_no") != -1)
		{
			document.getElementById("voucher-section").style.display = "block";
		}

		else{
			document.getElementById("voucher-section").style.display = "none";
		}


	}
}

manage_voucher();



// manage taxes
function manage_tax()
{
	// display taxes from localstorage
	var manage_tax = document.getElementById("select-tax");
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match("tax"))
		{
			document.getElementById("tax-section").style.display = "block";
			document.getElementById("manage-section").style.display = "block";
			var option = document.createElement("OPTION");
			option.append(document.createTextNode(all_keys));
			manage_tax.append(option);
		}
	}

	// open tax details in tax setup menu
	manage_tax.onchange = function(){
		var reserve = this.value;
		document.getElementById("tax-link").click();
		var tax_icon = document.getElementById("tax-icon");
		tax_icon.className = "fa fa-trash";
		tax_icon.onclick = function(){
			var confirm = window.confirm("Do you want to delete tax ?");
			if(confirm == true)
			{
				localStorage.removeItem(reserve);
				window.location = location.href;
			}


		}
		this.onclick = function(){
			document.getElementById("tax-link").click();
		}
		var tax_string = localStorage.getItem(this.value);
		var tax_details = JSON.parse(tax_string);
		document.getElementById("tax-name").value = tax_details.name_of_tax;
		document.getElementById("tax").value = tax_details.tax_qty;
		document.getElementById("tax-submit").onclick = function(){
			var name_of_tax = document.getElementById("tax-name").value;
			var tax_qty = document.getElementById("tax").value;
			if(name_of_tax == reserve)
			{
				var tax_object = {name_of_tax:name_of_tax,tax_qty:tax_qty};
				var tax_store = JSON.stringify(tax_object);
				localStorage.setItem(name_of_tax,tax_store);
			}

			else{
				localStorage.removeItem(reserve);
				var tax_object = {name_of_tax:name_of_tax,tax_qty:tax_qty};
				var tax_store = JSON.stringify(tax_object);
				localStorage.setItem(name_of_tax,tax_store);

			}
		}
	}
}

manage_tax();

// shut company
function shut_company()
{
	var shut_cmp = document.getElementById("shut-cmp");
	shut_cmp.onclick = function(){
		window.location = "../business.html";
	}
}
shut_company();

// hiding manage section
function hide_manageSection(){
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match("tax") == null && all_keys.match("voucher_no") == null)
		{
			document.getElementById("manage-section").style.display = "none";
		}

		else{
			document.getElementById("manage-section").style.display = "block";
		}

	}

}
hide_manageSection();