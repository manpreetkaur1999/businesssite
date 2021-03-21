// showing profile picture
function show_profile_pic(){
		var pic_box = document.getElementById("pic-box");
		var image_name = localStorage.getItem(sessionStorage.getItem("user_mail")+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
}



show_profile_pic();

// showing company logo and name
function show_company_logo(){
	var logo = document.getElementById("cmp-logo");
	logo.style.backgroundImage="url("+localStorage.getItem("company-logo")+")";
	logo.style.backgroundSize="80% 80%";
	logo.style.backgroundRepeat="no-repeat";
	logo.style.backgroundPosition="center";
	var cmp_name = document.getElementById("cmp-name");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	cmp_name.innerHTML = company_details.cmp_name;
	cmp_name.style.textTransform = "capitalize";
}

show_company_logo();

// showing date and time
function date_time(){
	var date = new Date();
	var get_date = date.getDate();
	var get_month = date.getMonth();
	var get_year = date.getFullYear();
	document.getElementById("date").innerHTML = "Date : "+get_date+"-"+get_month+1+"-"+get_year;
	document.getElementById("time").innerHTML = "Time : "+date.toLocaleTimeString();
}

date_time();