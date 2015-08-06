	var img = new Image();
	var canvas = document.querySelector('canvas');
	var offsetX = canvas.offsetLeft,
    	offsetY = canvas.offsetTop;
	var imgs = ['p_0.jpg','p_1.jpg'];
	var num = Math.floor(Math.random()*2);
	img.src = "image/"+imgs[num];
	
	
	var mousedown = false;
    function eventDown(e){
        e.preventDefault();
        mousedown=true;
    }

    function eventUp(e){
        e.preventDefault();
        mousedown=false;
		var pixels  = ctx.getImageData(0,0,canvas.width,canvas.height);
		pdata = pixels.data;

		var stride = 1;
		stride *= 4; // 4 elements per pixel
		for(var i=0,count=0;i<pdata.length;i+=stride){
			if (pdata[i] != 0) {	
				//pdata[i]=0表示刮除
				count++;
			}
		}
		if(count <= canvas.width*canvas.height*0.3){
			alert('已完成');
		}
		console.log(count);
    }
	
	function eventMove(e){
        e.preventDefault();
        if(mousedown) {
             if(e.changedTouches){
                 e=e.changedTouches[e.changedTouches.length-1];
             }
             var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                 y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
             with(ctx) {
                 beginPath()
                 arc(x, y, 10, 0, Math.PI * 2);
                 fill();
             }
        }
    }
	
	img.addEventListener('load', function(e) {
		canvas.style.backgroundImage='url('+img.src+')';
		ctx=canvas.getContext('2d');
		
		ctx.fillStyle='transparent';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle='gray';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.globalCompositeOperation = 'destination-out';
		
		canvas.addEventListener('touchstart', eventDown);
		canvas.addEventListener('touchend', eventUp);
		canvas.addEventListener('touchmove', eventMove);
		canvas.addEventListener('mousedown', eventDown);
		canvas.addEventListener('mouseup', eventUp);
		canvas.addEventListener('mousemove', eventMove);
	});