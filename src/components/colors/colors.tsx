import * as React from 'react';

// Getting a variable’s value
// window
//   .getComputedStyle(document.documentElement)
//   .getPropertyValue("--color-surface");
// Setting a variable’s value
// document
//   .documentElement.style.setProperty("--color-surface", "black");

const tintColor = (color:string, percent:number) => {
    // send with hash in front #123456
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);
    const p = percent / 100;
    R = Math.round(R + (255 - R) * p);
    G = Math.round(G + (255 - G) * p);
    B = Math.round(B + (255 - B) * p);
    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  
    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    return "#"+RR+GG+BB;

}

const shadeColor = (color:string, percent:number) => {
    // send with hash in front #123456
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);
    const p = percent / 100;
    R = Math.round(R * p);
    G = Math.round(G * p);
    B = Math.round(B * p);
    // R = Math.round(R * (100 + percent) / 100);
    // G = Math.round(G * (100 + percent) / 100);
    // B = Math.round(B * (100 + percent) / 100);
    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  
    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    return "#"+RR+GG+BB;
}

export const Colors = () => {

	// const setDiv = (n, c, arr, append) => {
	// 	const div = document.getElementById('d' + n);
	// 	div.style.backgroundColor = c;
	// 	if (append) arr.unshift(c); else arr.push(c);
	// }
	// const go = () => {
	// 	const val = document.getElementById('col').value;
	// 	const arr = [];
	// 	const step = 12;
	// 	for (var i=0; i < 5; i++) {
		
	// 		setDiv(4 - i, shadeColor(val, 100 - ((i+1) * step )), arr, true);
	// 	}
	// 	setDiv(5, val, arr);
	// 	for (var i=0; i < 5; i++) {
	// 		setDiv(i + 6, tintColor(val, (i+1) * step), arr);
	// 	}
	// 	const p = document.getElementById('prefix').value;
		
	// 	const result = arr.map((x, n) => '--' + p + n + ':' + x + ';').join('\n');
	// 	document.getElementById('out').value = result;
	// }
	
    return <div>
        asdf
    </div>
}

{/* <html>
<style>
	.f { display: flex }
	.d { width:120px; height:90px; }	
</style>
<link href="colors.css" rel="stylesheet"/>
<body>

	<div>
		<div>
			<input type="text" id="prefix" value="blue" placeholder="prefix">
			<input type="text" id="col" value="#50ade5">
			<button onclick="go()">go</button>
		</div>
		
		<div class="f">
			<div class="d" id="d0"></div>
			<div class="d" id="d1"></div>
			<div class="d" id="d2"></div>
			<div class="d" id="d3"></div>
			<div class="d" id="d4"></div>
			<div class="d" id="d5"></div>
			<div class="d" id="d6"></div>
			<div class="d" id="d7"></div>
			<div class="d" id="d8"></div>
			<div class="d" id="d9"></div>
			<div class="d" id="d10"></div>
		</div>
		<div>
			<textarea id="out"></textarea>
		</div>
	</div>
	<script>
		console.log(getComputedStyle(document.documentElement).getPropertyValue("--pig"));
	</script>
	
</body>

<script>

	const setDiv = (n, c, arr, append) => {
		const div = document.getElementById('d' + n);
		div.style.backgroundColor = c;
		if (append) arr.unshift(c); else arr.push(c);
	}
	const go = () => {
		const val = document.getElementById('col').value;
		const arr = [];
		const step = 12;
		for (var i=0; i < 5; i++) {
		
			setDiv(4 - i, shadeColor(val, 100 - ((i+1) * step )), arr, true);
		}
		setDiv(5, val, arr);
		for (var i=0; i < 5; i++) {
			setDiv(i + 6, tintColor(val, (i+1) * step), arr);
		}
		const p = document.getElementById('prefix').value;
		
		const result = arr.map((x, n) => '--' + p + n + ':' + x + ';').join('\n');
		document.getElementById('out').value = result;
	}
	
	const tintColor = (color, percent) => {
		// send with hash in front #123456
		let R = parseInt(color.substring(1,3),16);
		let G = parseInt(color.substring(3,5),16);
		let B = parseInt(color.substring(5,7),16);
		const p = percent / 100;
		R = Math.round(R + (255 - R) * p);
		G = Math.round(G + (255 - G) * p);
		B = Math.round(B + (255 - B) * p);
		R = (R<255)?R:255;  
		G = (G<255)?G:255;  
		B = (B<255)?B:255;  
		const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
		const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
		const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
		return "#"+RR+GG+BB;

	}

	const shadeColor = (color, percent) => {
		// send with hash in front #123456
		let R = parseInt(color.substring(1,3),16);
		let G = parseInt(color.substring(3,5),16);
		let B = parseInt(color.substring(5,7),16);
		const p = percent / 100;
		R = Math.round(R * p);
		G = Math.round(G * p);
		B = Math.round(B * p);
		// R = Math.round(R * (100 + percent) / 100);
		// G = Math.round(G * (100 + percent) / 100);
		// B = Math.round(B * (100 + percent) / 100);
		R = (R<255)?R:255;  
		G = (G<255)?G:255;  
		B = (B<255)?B:255;  
		const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
		const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
		const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
		return "#"+RR+GG+BB;
	}
		
</script>

</html> */}