window.onload = function(){
	var x = document.getElementById("contacts").children.length;
	if(x==0)
	{
		document.getElementById("c-list").innerHTML="No Contact Found !";
	}
}




// start showing pic coadig

function show_profile_pic(){
		var pic_box = document.getElementById("pic-box");
		var image_name = localStorage.getItem(sessionStorage.getItem("user_mail")+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
}

show_profile_pic();


// adding contacts

function add_contacts(){
	var fullname = document.getElementById("fullname").value;
	var pnum = document.getElementById("pnum").value;
	var snum = document.getElementById("snum").value;
	if(fullname != "" && pnum != "" && snum != "")
	{
		if(isNaN(pnum))
		{
			alert("please enter a valid primary number");
		}
		else{
			if(isNaN(snum))
			{
				alert("please enter a valid secondary number");
			}
			else{
				var user = {fullname:fullname,pnum:pnum,snum:snum};
				var user_details = JSON.stringify(user);
				localStorage.setItem(fullname+" contact",user_details);
				var form = document.getElementById("add-form");
				form.reset();
				document.getElementById("saved").style.display="block";
				setTimeout(function(){document.getElementById("saved").style.display="none";},2000);
				window.location=location.href;

			}
		}
	}

	else{
		alert('some fields are empty');
	}

}

// show contact list


function show_contact(){
      var i;
      for(i=1;i<=localStorage.length;i++)
      {
      	var keys =localStorage.key(i);
      	if(keys.match("contact"))
      	{
      		var json_text = localStorage.getItem(keys);
      		var json_extract =JSON.parse(json_text);
      		var con = document.getElementById("contacts");
      		var fieldset = document.createElement("FIELDSET");
      		var legend = document.createElement("LEGEND");
      		var ol =document.createElement("OL");
      		var li_one = document.createElement("LI");
      		var li_two = document.createElement("LI");
      		var trash = document.createElement("I");
      		trash.setAttribute("class","fa fa-trash");
      		trash.setAttribute("id","delete-icon");
      		trash.setAttribute("title","Delete Contact");
      		var edit = document.createElement("I");
			edit.setAttribute("class","fa fa-edit");
			edit.setAttribute("id","delete-icon");
			edit.setAttribute("title","Edit Contact");
			var saved = document.createElement("SPAN");
			var save = document.createElement("I");
			save.setAttribute("class","fa fa-save");
			save.setAttribute("id","delete-icon");
			save.setAttribute("title","Save Contact");
            con.appendChild(fieldset);
      		fieldset.appendChild(legend);
      		fieldset.appendChild(ol);
      		ol.appendChild(li_one);
      		ol.appendChild(li_two);
      		ol.appendChild(trash);
      		ol.appendChild(edit);
			ol.appendChild(save);
			ol.appendChild(saved);
			save.style.display="none";
      		legend.appendChild(document.createTextNode(json_extract.fullname));
      		li_one.appendChild(document.createTextNode(json_extract.pnum));
      		li_two.appendChild(document.createTextNode(json_extract.snum));
      		saved.appendChild(document.createTextNode("saved successfully !"));
			saved.style.color="red";
			saved.style.fontFamily="sans-serif";
			saved.style.fontWeight="bold";
			saved.style.float="right";
			saved.style.clear="both";
			saved.style.marginTop="5px";
			saved.style.display="none";		
			del_contact(keys,trash);
			edit_contact(keys,edit,save,saved);
      		del_contact(keys,trash);

      	}

      }
}

show_contact();


// delete contact


function del_contact(contact_name,del_btn)
{
	del_btn.onclick = function(){
		var answer = confirm("Do you want to Delete contact ?");
		if(answer == true)
		{
		var ol = this.parentElement;
		var fieldset=ol.parentElement;
		fieldset.remove();
		document.cookie=contact_name+"="+localStorage.getItem(contact_name)+";max-age=2592000";
		localStorage.removeItem(contact_name);
		var x = document.getElementById("contacts").children.length;
	if(x==0)
	{
		document.getElementById("c-list").innerHTML="No Contact Found !";
	}

	} 
}  

}


// editing contacts

function edit_contact(contact_name,edit_btn,save_btn,saved){
	edit_btn.onclick = function(){
		save_btn.style.display="block";
		var ul = this.parentElement;
		var fieldset = ul.parentElement;
		var legend = fieldset.getElementsByTagName("LEGEND");
		legend[0].setAttribute("contenteditable","true");
		legend[0].focus();
		var recent_legend;
		var current_legend;
		legend[0].onclick = function(){
			recent_legend = this.innerHTML;
		}

		legend[0].onblur = function(){
			current_legend = this.innerHTML;
		}

		var li = ul.getElementsByTagName("LI");
		var recent_number=[];
		var current_number=[];
		var i;
		for(i=0;i<li.length;i++)
		{
			li[i].setAttribute("contenteditable","true");
		}

		li[0].onclick=function(){
			recent_number[0]=this.innerHTML;
		}

		li[1].onclick=function(){
			recent_number[1]=this.innerHTML;
		}

		li[0].onblur=function(){
			current_number[0]=this.innerHTML;
		}

		li[1].onblur=function(){
			current_number[1]=this.innerHTML;
		}

		save_btn.onclick = function(){
			var edit_data = {fullname:current_legend==undefined?legend[0].innerHTML:current_legend,pnum:current_number[0]==undefined?li[0].innerHTML:current_number[0],snum:current_number[1]==undefined?li[1].innerHTML:current_number[1]};
			var final_data = JSON.stringify(edit_data);
			var txt = localStorage.getItem(contact_name);
			localStorage.setItem(contact_name,txt.replace(txt,final_data));
			saved.style.display="block";
			setTimeout(function(){saved.style.display="none";},2000)
		}


		}


	}


	// searching contacts

function search_contact(user_input)
{
	var keyword = user_input.value.toUpperCase();
	var contact_list = document.getElementById("contacts");
	var legend = contact_list.getElementsByTagName("LEGEND");
	var i;
	for(i=0;i<legend.length;i++)
	{
		if(legend[i].innerHTML.toUpperCase().indexOf(keyword) != -1)
		{
			legend[i].parentElement.style.display="";
		}

		else{
			legend[i].parentElement.style.display="none";
		}

	}
}




// showing contacts in restore table

function restore_contact()
{

	var page = document.getElementById("restore-contacts");
	var restore_table = document.getElementById("restore-table");
	page.style.height="100vh";
	page.style.transition="0.5s";
	var notice = document.getElementById("restore-notice");
	if(document.cookie.length != 0)
	{
		notice.innerHTML = "Deleted Contacts";
		var devide_cookie = document.cookie.split(";");
		var i,j;
		for(i=0;i<devide_cookie.length;i++)
		{
			var key_value = devide_cookie[i].split("="); 
			for(j=0;j<key_value.length;j++)
			{
				if(key_value[j].indexOf("contact") == -1)
				{
					var extract = JSON.parse(key_value[j]);
					var tr = document.createElement("TR");
					var td_cname = document.createElement("TD");
					var td_pnum = document.createElement("TD");
					var td_snum = document.createElement("TD");
					var td_res = document.createElement("TD");
					td_cname.appendChild(document.createTextNode(extract.fullname));
					td_pnum.appendChild(document.createTextNode(extract.pnum));
					td_snum.appendChild(document.createTextNode(extract.snum));
					var res_icon = document.createElement("I");
					res_icon.setAttribute("class","fa fa-refresh");
					td_res.appendChild(res_icon);
					tr.appendChild(td_cname);
					tr.appendChild(td_pnum);
					tr.appendChild(td_snum);
					tr.appendChild(td_res);
					restore_table.appendChild(tr);
					res_icon.onclick = function(){
						var res_per = confirm("Do you want to restore contact ?");
						if(res_per==true)
						{
						var this_td = this.parentElement;
						var this_tr = this_td.parentElement;
						var td_all = this_tr.getElementsByTagName("TD");
						var restore_obj = {fullname:td_all[0].innerHTML,pnum:td_all[1].innerHTML,snum:td_all[2].innerHTML};
						var readyForRestore = JSON.stringify(restore_obj);
						localStorage.setItem(td_all[0].innerHTML+" contact",readyForRestore);
						document.cookie = td_all[0].innerHTML+" contact=;max-age=0";
						this_tr.remove();
						window.location=location.href;

					}

					}
				}

			}
		}
	}

	else{
		notice.innerHTML = "No deleted Contacts"
	}



}



// logout coding

function logout(){
	var user = confirm("Are you sure ?");
	if(user == true)
	{
	sessionStorage.clear();
	setTimeout(function(){
		window.location="../../index.html";
	},2000);
	}
}




