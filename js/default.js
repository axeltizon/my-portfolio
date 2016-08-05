$(function(){
	$(document).ready(function(){
	    /** 
	     * This part does the "fixed navigation after scroll" functionality
	     * We use the jQuery function scroll() to recalculate our variables as the 
	     * page is scrolled/
	     */

     	$('.service-menu-container .service-main-menu').on( 'click', function() {
     		
	      	if($(this).parents('.service-menu-container').hasClass('active')){
	      		$(this).parents('.service-menu-container').removeClass('active');
	      	} else{
				$(this).parents('.service-menu-container').addClass('active');
	      	}
  			return false;

  		});

     	$('.service-menu-container .service-main-menu').click();

     	$('nav.desktop-view').wrap('<div class="nav-wraper desktop"></div>');
 		$('.nav-wraper').height($('nav').outerHeight());

		var div_top = $('nav').offset().top;
	    
	    $(window).scroll(function(){
    		var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
            if (window_top > div_top) {
                $('nav').addClass('stick');
            } else {
                $('nav').removeClass('stick');
            }
	    });

	    /**
	     * This part causes smooth scrolling using scrollto.js
	     * We target all a tags inside the nav, and apply the scrollto.js to it.
	     */

	    $("nav a").click(function(evn){
	        evn.preventDefault();
			$("nav a").removeClass('nav-active');
	    	$(this).addClass('nav-active');
	        
	        $('html,body').scrollTo(this.hash, this.hash); 
	    });


	    /**
	     * This part handles the highlighting functionality.
	     * We use the scroll functionality again, some array creation and 
	     * manipulation, class adding and class removing, and conditional testing
	     */
	    var aChildren = $("nav li").children(); // find the a children of the list items
	    var aArray = []; // create the empty aArray
	    for (var i=0; i < aChildren.length; i++) {    
	        var aChild = aChildren[i];
	        var ahref = $(aChild).attr('href');
	        aArray.push(ahref);
	    } // this for loop fills the aArray with attribute href values

	    $(window).scroll(function(){
	        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
	        var windowHeight = $(window).height(); // get the height of the window
	        var docHeight = $(document).height();

	        for (var i=0; i < aArray.length; i++) {
	            var theID = aArray[i];
	            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
	            var divHeight = $(theID).height(); // get the height of the div in question
	            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
	                $("a[href='" + theID + "']").addClass("nav-active");
	            } else {
	                $("a[href='" + theID + "']").removeClass("nav-active");
	            }
	        }

	        if(windowPos + windowHeight == docHeight) {
	            if (!$("nav li:last-child a").hasClass("nav-active")) {
	                var navActiveCurrent = $(".nav-active").attr("href");
	                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
	                $("nav li:last-child a").addClass("nav-active");
	            }
	        }
	    });

		/*Service Side*/
		$('.service-menu button.btn').on('click', function(){
			$('.service-menu button.btn').removeClass('active');
			var _this = $(this);
			_this.addClass('active');
			var value = _this.attr('data-value');
			$('.service-content').removeClass('active');
			$('.service-content.'+value).addClass('active');
		});

		$('.call-me').click(function(){ 
			$('a[href="#contact"]').click();
		});

		/* Mobile Menu click*/
		$('.mobile-view button').on('click', function(){
			var _mobile_container = $(this).parents('.mobile-view');
			if (_mobile_container.hasClass('active-menu')) {
				_mobile_container.removeClass('active-menu');
			} 
			else{
				_mobile_container.addClass('active-menu');
			}
		});

	   // $('a[href="#home"]').click();


	    $('#Send').click(function(){
	    	var name = $.trim($('#contactForm #Name').val());
	    	var email = $.trim($('#contactForm #Email').val());
	    	var skype = $.trim($('#contactForm #Skype').val());
	    	var message = $.trim($('#contactForm #Message').val());
	    	
	    	if(name.length>0 && email.length>0 && skype.length>0 && message.length>0){
			
				$('#contactForm .feedback-input').removeClass('error');
				if(IsEmail(email) == false){
					console.log('Invalid Email');
					$('#contactForm #Email').addClass('error');
				} else{
					var datavalue = 'name='+name+'&email='+email+'&message='+message;
					$.ajax({
			    		type: 'POST',
			    		url: 'mail.php',
			    		data :datavalue,
			    		cache: false,
			    		success: function(data){
			    			console.log(data);
			    		}

			    	});	
				}
	  			
	  		} else{
	  			console.log('required all');
	  			$('#contactForm #Name').addClass('error');
	  			$('#contactForm #Email').addClass('error');
	  			$('#contactForm #Skype').addClass('error');
	  			$('#contactForm #Message').addClass('error');
	  		}
	    		
	    	return false;
	    });

		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!regex.test(email)) {
			   return false;
			}else{
			   return true;
			}
		}
	});
});