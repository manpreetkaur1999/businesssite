// showing profile picture
function show_profile_pic(){
		var pic_box = document.getElementById("pic-box");
		var image_name = localStorage.getItem(sessionStorage.getItem("user_mail")+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
}

show_profile_pic();

// button hover effect
function button_hover_effect(){
	var button = document.getElementsByTagName("BUTTON");
	var i;
	for(i=0;i<button.length;i++)
	{
		button[i].onmouseover = function(){
			this.className = "animated pulse";
		} 

		button[i].onmouseout = function(){
			this.className = "";
		}
	}
}

button_hover_effect();

// open create company form

	function open_form(){
		var button = document.getElementsByTagName("BUTTON")[0];
		var model = document.getElementById("model");
		button.onclick = function(){
			if(model.offsetHeight == 0)
			{
				model.style.display = "block";
				model.style.height = "440px";
				model.className = "animated fadeInDown";
				this.innerHTML = "Close form";
			}

			else{
				model.className = "animated fadeOut";
				model.style.height = "0";
				this.innerHTML = "Create company";
			}
		}
	}

	open_form();

// create company form validation
	
	function form_val(){
		var cmp_name = document.getElementById("cmp-name");
		var mailing_name = document.getElementById("mailing-name");
		var fine_year = document.getElementById("financial-year");
		var address = document.getElementById("address");
		var number = document.getElementById("phone-number");
		var fax = document.getElementById("fax-number");
		var email = document.getElementById("email");
		var website = document.getElementById("website");
		var stock_type = document.getElementById("stock-type");
		cmp_name.onchange = function()
		{
			if(isNaN(this.value))
			{
				mailing_name.onchange = function(){
					if(this.value == cmp_name.value)
					{
						this.value = "Whoops! company name and mailing name shouldn`t same";
						this.style.color = "red";
						this.style.borderColor = "red";
						this.className = "animated infinite pulse";
						this.onclick = function(){
												this.value="";
												this.className = "";
												this.style.color = "inherit";
												this.style.borderColor = "inherit";
						}

					}

					else{
							if(this.value.indexOf(cmp_name.value+".pvt.ltd") != -1 || this.value.indexOf(cmp_name.value+".govt.ltd") != -1)
							{
								fine_year.onchange = function(){
									var current_date = new Date();
									var selected_date = new Date(fine_year.value);
									if(selected_date.getFullYear() >= current_date.getFullYear())
									{
										if(selected_date.getMonth()+1 == 4)
										{
											if(selected_date.getDate() == 1)
											{
												var form = document.getElementById("form");
												form.onsubmit = function(){
												var cmp_details = {cmp_name:cmp_name.value,mailing_name:mailing_name.value,address:address.value,phone:number.value,fax:fax.value,email:email.value,website:website.value,fine:fine_year.value,stock_type:stock_type.value};
												var cmp_data = JSON.stringify(cmp_details);
												localStorage.setItem("company",cmp_data);
												document.getElementById("form").innerHTML = "<center><i class='fa fa-check-circle' style='text-align:center;font-size:100px;color:red;'></i><br><h1  style='font-family:Ubuntu;font-size:50px;padding:0;margin:0;text-align:center;color:yellow'>Company created successfully.</h1><br><button id='click-here'>Click here</button></center>";
												document.getElementById("click-here").onclick = function(){
													window.location = location.href;
												}

											}
											}

										else{
											this.type = "text";
											this.value = "Whoops! only 1st date allowed";
											this.style.color ="red";
											this.style.borderColor = "red";
											this.className = "animated infinite pulse";
											this.onclick = function(){
											this.type = "date";
											this.style.color = "inherit";
											this.style.borderColor = "inherit";
											this.className = "";
											}}

										}

									else{
											this.type = "text";
											this.value = "Whoops! only 4rth month allowed";
											this.style.color ="red";
											this.style.borderColor = "red";
											this.className = "animated infinite pulse";
											this.onclick = function(){
											this.type = "date";
											this.style.color = "inherit";
											this.style.borderColor = "inherit";
											this.className = "";

										}

										}
									}

									else{
										this.type = "text";
										this.value = "Whoops! passed year not allowed";
										this.style.color ="red";
										this.style.borderColor = "red";
										this.className = "animated infinite pulse";
										this.onclick = function(){
											this.type = "date";
											this.style.color = "inherit";
											this.style.borderColor = "inherit";
											this.className = "";

										}

									}




								}
							}

							else{
									this.value = "Type company name.pvt.ltd or company name.govt.ltd";
									this.className = "animated infinite pulse";
									this.style.color = "red";
									this.style.borderColor = "red";
									this.onclick = function(){
										this.value = "";
										this.className = "";
										this.style.color = "inherit";
										this.style.borderColor = "inherit";
									}
							}
					}
				}
			}

			else{
				this.value = "Whoops ! number is not allowed";
				this.className = "animated infinite pulse";
				this.style.color = "red";
				this.style.borderColor = "red";
				this.onclick = function(){
					this.value="";
					this.className = "";
					this.style.color = "inherit";
					this.style.borderColor = "inherit";
				}
			}
		}
	}

	form_val();

// display company name

function check_cmp(){
	if(localStorage.getItem("company") != null)
	{
		document.getElementById("model").remove();
		var key_data = localStorage.getItem("company");
		var cmp_data = JSON.parse(key_data);
		var brand_name = document.getElementById("create");
		brand_name.innerHTML = cmp_data.cmp_name;
		brand_name.style.color = "red";
		brand_name.style.fontFamily = "Righteous";
		var upload = document.getElementById("company-icon");
		upload.className = "fa fa-upload animated infinite flash";
		upload.title = "Upload company logo 100 * 100";
		upload.onclick = function(){
			var input = document.createElement("INPUT");
			input.type = "file";
			input.accept = "Images/*";
			input.click();
			input.onchange = function(){
				if(this.files[0].size > 512000)
				{
					var upload_notice = document.getElementById("upload-notice");
					upload_notice.className = "fa fa-warning";
					upload_notice.innerHTML = " Upload less than 512kb image";
				}

				else{
					var reader = new FileReader();
					reader.readAsDataURL(this.files[0]);
					reader.onload = function(){
						localStorage.setItem("company-logo",reader.result);
						window.location = location.href;
					}

				}
			}
		}

		brand_name.onclick = function(){
			var cmp_data = localStorage.getItem("company");
			var get_cmp_data = JSON.parse(cmp_data);
			if(get_cmp_data.stock_type == "accounts only")
			{
			window.location = "business_assest/accounts_only.html";
			}

			else{
				window.location = "business_assest/accounts_with_inventry.html";
			}
		}
	}
}	

check_cmp();


// show company logo

function show_company_logo(){
	var upload = document.getElementById("company-icon");
	if(localStorage.getItem("company-logo") != null)
	{
	upload.className = "";
	upload.style.backgroundImage = "url("+localStorage.getItem("company-logo")+")";
	upload.style.backgroundSize = "cover";
	}
}

show_company_logo();

// delete company

function delete_company(){
	var del = document.getElementById("delete");
	del.onclick = function(){
		var del_notice = document.getElementById("delete-notice");
		if(localStorage.getItem("company") != null)
		{
			del_notice.style.display ="block";
			del_notice.className = "animated fadeInDown";
			var ok_btn = document.getElementById("ok-btn");
			ok_btn.onclick = function(){
				localStorage.removeItem("company");
				localStorage.removeItem("company-logo");
				var i;
				for(i=0;i<localStorage.length;i++)
				{
					var all_keys = localStorage.key(i);
					if(all_keys.match("tax") != null)
					{
						localStorage.removeItem(all_keys);
					}

					else if(all_keys.match("voucher_no") != null)
					{
						localStorage.removeItem(all_keys);
					}

					if(all_keys.match("unit_of_measure") != null)
					{
						localStorage.removeItem(all_keys);
					}

				}
				window.location = location.href;
			}

			var cancel = document.getElementById("cancel-btn");
			cancel.onclick = function(){
				del_notice.style.display ="none";
			}
		}

		else{
			del_notice.style.display = "block";
			del_notice.className = "animated fadeInDown";
			del_notice.innerHTML = "No company found !";
			setTimeout(function(){del_notice.style.display="none"},3000);
		}

		
	}
}

delete_company();

// logout coding

function logout(){
	var log_out = document.getElementById("logout");
	log_out.onclick = function(){
		sessionStorage.clear();
		var logout_notice = document.getElementById("logout-notice");
		logout_notice.style.display="block";
		setTimeout(function(){window.location = "../../index.html";},2000);
		

	}
}

logout();

