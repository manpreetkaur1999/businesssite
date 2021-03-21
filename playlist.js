// play and pause coading
 
var play_icon = document.getElementById("play-icon");

play_icon.onclick = function(){
	var video = document.getElementById("video-player");
	if(this.className == "fa fa-play")
	{
	video.play();
	this.className ="fa fa-pause";
	this.title = "pause";

     }

   else{
			video.pause();
			this.className = "fa fa-play";
			this.title = "Play";
		}

}


// video progress coding
	var video = document.getElementById("video-player");
	video.ontimeupdate = function(){
		var progress = document.getElementById("progress");
		var time = (100/this.duration)*this.currentTime;
		progress.style.width=time+"%";
		video.onended = function(){
		if(video.currentTime == video.duration)
		{
			play_icon.className="fa fa-play";
			play_icon.title="Play";
		}
		else{

			play_icon.className="fa fa-pause";
			play_icon.title="Pause";
			video.play();
		}
	}
	}


	// video full screen coding 
	
	var fullscreen = document.getElementById("fullscreen");
	fullscreen.onclick = function(){
		if(video.requestFullscreen)
		{
			video.requestFullscreen();
		}

		else if(video.webkitRequestFullscreen)
		{
			video.webkitRequestFullscreen();
		}

		else if(video.mozRequestFullscreen)
		{
			video.mozRequestFullscreen();
		}

		else if(video.msRequestFullscreen)
		{
			video.msRequestFullscreen();
		}


	}


// volume coding 

	var speaker = document.getElementById("volume-icon");
	speaker.onclick = function(){
		var volume_slider = document.getElementById("volume-slider");
		if(volume_slider.style.display=="none")
		{
			volume_slider.style.display="block";
			volume_slider.oninput = function(){
				video.volume = this.value;
				if(this.value <= 0)
				{
					speaker.className = "fa fa-volume-off";
					speaker.title = this.value*100+"%";
				}

				else{
					speaker.className = "fa fa-volume-up";
					speaker.title = this.value*100+"%";
				}
			}
		}
		else{
			volume_slider.style.display="none";
		}
	}

// stop video coding

	var stop_icon = document.getElementById("stop-icon");
	stop_icon.onclick = function(){
		video.currentTime = 0;
		video.pause();
		play_icon.className="fa fa-play"
	}



// replay video coding

	var replay_icon = document.getElementById("replay-icon");
	replay_icon.onclick = function(){
		video.currentTime=0;
		video.play();
		play_icon.className = "fa fa-pause";
		play_icon.title = "Pause";
	}


// forward and backward progress

	var progress_bar = document.getElementById("progress-bar");
	progress_bar.onclick = function(event){
		var percent = event.offsetX / this.offsetWidth;
		video.currentTime = percent*video.duration;	
	}




// video setting coding

var setting_icon = document.getElementById("setting");
setting_icon.onclick = function(){

	var setting_toggle = document.getElementById("setting-app");
	if(setting_toggle.offsetHeight == 0)
	{
		setting_toggle.style.height = "320px";
		setting_toggle.style.webkitTransition = "0.5s";
	}

	else{
		setting_toggle.style.height = "0";
		setting_toggle.style.webkitTransition = "0.5s";
	}


// control video speed

var video_speed_slider = document.getElementById("speed-slider");
video_speed_slider.oninput = function(){
	video.playbackRate = this.value;
	document.getElementById("show-speed").innerHTML = this.value;
}

// reset video speed

var reset_speed = document.getElementById("reset-speed");
reset_speed.onclick = function(){
	video.playbackRate = 1;
	document.getElementById("show-speed").innerHTML = 1;
	video_speed_slider.value = 1;
}



// mini video player coding

	var miniplayer_icon = document.getElementById("miniplayer-icon");
	miniplayer_icon.onclick = function(){
		var setting_toggle = document.getElementById("setting-app");
		setting_toggle.style.height="0";
        video.pause();
		var large_video_time = video.currentTime;
		var large_video_name = document.getElementById("video-source").src;
		document.getElementById("player-con").style.display = "none";
		var miniplayer = document.getElementById("miniplayer");
		miniplayer.style.height = "230px";
		miniplayer.style.display ="block";
		miniplayer.style.webkitTransition = "0.5s";
		var mini_video_player = document.getElementById("mini-video-player");
		mini_video_player.load();
        var minivideo_source=document.getElementById("minivideo-source");
		if(play_icon.className == "fa fa-pause")
		{
			minivideo_source.src = large_video_name;
			mini_video_player.currentTime = large_video_time;
			mini_video_player.play();
			mini_video_player.onmouseover = function(){
			this.controls = true;
			}
			minivideo_close();

		}

		else{
			minivideo_source.src = large_video_name;
			mini_video_player.currentTime = large_video_time;
			mini_video_player.pause();
			mini_video_player.onmouseover = function(){
			this.controls = true;
			}
			minivideo_close();
          
          }


 // close minivideo coding

		function minivideo_close(){
			mini_video_player.onplaying = function(){
			var close_icon = document.getElementById("close-icon");
			close_icon.onclick = function(){
				mini_video_player.pause();
				this.parentElement.style.display = "none";
				document.getElementById("player-con").style.display="block";
				video.load();
				video.currentTime = mini_video_player.currentTime;
				large_video_name = minivideo_source.src;
				video.play();
				play_icon.className = "fa fa-pause";
				play_icon.title = "Pause";
				}
		}
     }

     mini_video_player.onpause = function(){
			var close_icon = document.getElementById("close-icon");
			close_icon.onclick = function(){
				mini_video_player.pause();
				this.parentElement.style.display = "none";
				document.getElementById("player-con").style.display="block";
				video.load();
				video.currentTime = mini_video_player.currentTime;
				large_video_name = minivideo_source.src;
				video.pause();
				play_icon.className = "fa fa-play";
				play_icon.title = "Play";
				}
		}

}


// container theme coding
	var container_theme = document.getElementById("container-theme");
	container_theme.onchange = function(){
		var player_header = document.getElementById("player-header");
		player_header.style.backgroundColor = this.value;
		var controls = document.getElementById("controls");
		controls.style.backgroundColor = this.value;
		var color = this.value;
		localStorage.setItem("c_theme",color);

	}


// icon theme coding
	
	var icon_theme = document.getElementById("icon-theme");
	icon_theme.onchange = function(){
		var controls = document.getElementById("controls");
		var i_tag = controls.getElementsByTagName("I");
		var i;
		for(i=0;i<i_tag.length;i++)
		{
			i_tag[i].style.color = this.value;
		}
		localStorage.setItem("i_theme",this.value);

	}


// text theme coding
	var text_theme = document.getElementById("text-theme");
	text_theme.onchange = function(){
		var player_header = document.getElementById("player-header");
		player_header.style.color = this.value;
		var playlist_header = document.getElementById("playlist-header");
		playlist_header.style.color = this.value;
		localStorage.setItem("text_theme",this.value);

	}


	// reset theme coding

var reset_theme = document.getElementById("reset-themes");
reset_theme.onclick = function(){
	localStorage.removeItem("c_theme");
	localStorage.removeItem("i_theme");
	localStorage.removeItem("text_theme");
	window.location = location.href;
}

}


function active_theme(){
		var color = [localStorage.getItem("c_theme"),localStorage.getItem("i_theme"),localStorage.getItem("text_theme")];
		var player_header = document.getElementById("player-header");
		player_header.style.backgroundColor = color[0];
		var controls = document.getElementById("controls");
		controls.style.backgroundColor = color[0];
		var controls = document.getElementById("controls");
		var i_tag = controls.getElementsByTagName("I");
		var i;
		for(i=0;i<i_tag.length;i++)
		{
			i_tag[i].style.color = color[1];
		}

		var player_header = document.getElementById("player-header");
		player_header.style.color = color[2];
		var playlist_header = document.getElementById("playlist-header");
		playlist_header.style.color = color[2];
		

}

active_theme();


// video buffering coding
	video.onprogress = function(){
		var percentage = (this.buffered.end(0)/this.duration)*100;
		var buffer = document.getElementById("buffer-progress");
		buffer.style.width = percentage+'%';

	}



// show video upload 
if(video.networkState == 3)
{
	video.setAttribute("poster","../../images/upload_pic.jpg");
	video.onclick = function(){
		var upload_btn = document.getElementById("upload-video");
		upload_btn.click();
		upload_btn.onchange= function(){
			var url = URL.createObjectURL(this.files[0]);
			var play_source = document.getElementById("player-src");
			play_source.src = url;
			video.load();
			video.play();
			play_icon.className = "fa fa-pause";
			play_icon.title = "Pause";
		   var v_name= this.files[0].name;
		   var show = document.getElementById("show");
		   show.innerHTML = v_name;
		}
		
	}
}




