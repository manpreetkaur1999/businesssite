// url copy paste security

function url_secure()
{
	if(sessionStorage.length<=0)
	{
		var page = document.getElementById("profile-page");
		page.style.display="none";
		document.body.style.background="black";
		document.body.innerHTML = "<h1 style='color:white;font-size:100px;font-family:sans-serif;text-align:center'>Illigal action performed</h1>";
	}
}

url_secure();

// pic upload coding

function upload_pic(){
	var input = document.getElementById("profile-pic-upload");
	if(input.files[0].size<1000000)
	{
	var freader = new FileReader();
	freader.readAsDataURL(input.files[0]);
	freader.onloadend = function(event){
	var image_url = event.target.result;
	var show = document.getElementById("upload-btn");
	show.style.background="url("+event.target.result+")";
	show.style.backgroundRepeat="no-repeat";
	show.style.backgroundSize="cover";
	var icon = document.getElementById("upload-icon");
	icon.style.display="none";
	var ficon = document.getElementById("next-icon");
	ficon.style.display="block";
	ficon.onclick = function(){
		localStorage.setItem(sessionStorage.getItem('user_mail')+"image_url",image_url);
		var hide_uploadbox = document.getElementById("profile-bg");
		hide_uploadbox.style.display="none";
		window.location=location.href;
	}

}
}

else{alert('please upload less than 1mb of image');}

}

// printing profile name in upload box

function profile_name(){
	var result = document.getElementById("welcome");
	var user_mail = sessionStorage.getItem('user_mail');
	var user_details = localStorage.getItem(user_mail);
	var user_data = JSON.parse(user_details);
	var fullname = user_data.name;
	result.innerHTML = atob(fullname);
}

profile_name();


// stop showing upload

function stop_upload(){
	if(localStorage.getItem(sessionStorage.getItem('user_mail')+"image_url") != null)
	{
		var hide_uploadbox = document.getElementById("profile-bg");
		hide_uploadbox.style.display = "none";
	}
}
stop_upload();

// start app contents 

	function showing_pic_name(){
		var name = document.getElementById("profile-name");
		var user_mail = sessionStorage.getItem("user_mail");
		var user_details = localStorage.getItem(user_mail);
		var user_data = JSON.parse(user_details);
		var fullname = user_data.name;
		name.innerHTML = atob(fullname);

		var pic_box = document.getElementById("profile-pic");
		var image_name = localStorage.getItem(user_mail+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
	}



	showing_pic_name();

// logout coding

function logout(){
	sessionStorage.clear();
	document.getElementById("profile-notice").style.display="block";
	setTimeout(function(){
		window.location="../index.html";
	},2000);
}


