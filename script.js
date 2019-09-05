

function random(T,lyamda,a,b,wait_time) {
	let array = new Array();
	let i = 1;
	array[0] = new Object();
	array[0].t_i = 0;
	let t_i = 0;
	do{
		let r_i = Math.random();
		array[i] = new Object();
		array[i].tao_i = -(1/lyamda)*Math.log10(r_i);

		array[i].t_i = array[i-1].t_i + array[i].tao_i;
		array[i].serve = a+(b-a)*r_i;
		array[i].wait_time = wait_time;
		++i;
	} while (array[i-1].t_i < T);

	array.pop(); // jamic ushacoxin jnjuma
	array.shift(); // arajiny vor menak 0 a jnjuma
	return array;
}

function workers(m) {
	let work = new Array();
	for(let i = 0; i < m; ++i){
		work[i] = new Object();
		work[i].t_i = 0;
		work[i].finish_time = 0
		work[i].free = true;
	}
	return work;


}

// let count = 10;
let Time = 10;
let lyamda = 2;
let a = 1;
let b = 2;
let wait_time = 2;

let worker_count = 2;

// let worker_1 = workers();
// let worker_2 = workers();

let N_serviced = 0;
let N_serviced_No = 0;

let hajaxord = random(Time,lyamda,a,b,wait_time);
console.log(hajaxord);

let worker = workers(worker_count);

worker.forEach(function(val, index, array) {
	console.log(val.t_i + "____" + index);
})




for (var i = 0; i < hajaxord.length; i++) {
	worker.forEach(function(work, index) {
		console.log(work.finish_time + "   finish_time" + index + "__"+ i +"__" + hajaxord[i].t_i);
		if(hajaxord[i].t_i > work.finish_time && work.free === false) {
		console.log(hajaxord[i].t_i + " azat 1  "+ i +" ___" + work.finish_time);
		work.free = true;
	}


	if(hajaxord[i].t_i + hajaxord[i].serve <= Time){

		if(work.free === true ){

			work.free = false;
			work.t_i = hajaxord[i].t_i;
			work.finish_time = work.t_i + hajaxord[i].serve;


			N_serviced++;
			return true;
			console.log(i,"work");

		}  else {
			if (hajaxord[i].wait_time + hajaxord[i].t_i >= work.finish_time && 
				work.finish_time + hajaxord[i].serve <= Time){

				work.free = false;
			work.t_i = work.finish_time;
			work.finish_time = work.t_i + hajaxord[i].serve;
			N_serviced++;
			return true;
			console.log(i,"work++++");
		}  else {
			N_serviced_No++;

		}
	} 


} else {
	N_serviced_No++;
}
});
}


/*

for (var i = 0; i < hajaxord.length; i++) {

	if(hajaxord[i].t_i > worker_1.finish_time && worker_1.free === false) {
		// console.log(hajaxord[i].t_i + " azat 1  "+ i +" ___" + worker_1.finish_time);
		worker_1.free = true;
	}
	if(hajaxord[i].t_i > worker_2.finish_time && worker_2.free === false) {
		// console.log(hajaxord[i].t_i + " azat 2  "+ i +" ___" + worker_2.finish_time);
		worker_2.free = true;
	}


	if(hajaxord[i].t_i + hajaxord[i].serve <= Time){

		if(worker_1.free === true ){

			worker_1.free = false;
			worker_1.t_i = hajaxord[i].t_i;
			worker_1.finish_time = worker_1.t_i + hajaxord[i].serve;


			N_serviced++;
			console.log(i,"worker_1");

		} else if(worker_2.free === true){

			worker_2.free = false;
			worker_2.t_i = hajaxord[i].t_i;
			worker_2.finish_time = worker_2.t_i + hajaxord[i].serve;

			N_serviced++;
			console.log(i,"worker_2");

		} else {
			if (hajaxord[i].wait_time + hajaxord[i].t_i >= worker_1.finish_time && 
				worker_1.finish_time + hajaxord[i].serve <= Time){

				worker_1.free = false;
			worker_1.t_i = worker_1.finish_time;
			worker_1.finish_time = worker_1.t_i + hajaxord[i].serve;
			N_serviced++;
			console.log(i,"worker_1++++");
		} else if (hajaxord[i].wait_time + hajaxord[i].t_i >= worker_2.finish_time && 
			worker_2.finish_time + hajaxord[i].serve <= Time){

			worker_2.free = false;
			worker_2.t_i = worker_2.finish_time;
			worker_2.finish_time = worker_2.t_i + hajaxord[i].serve;
			N_serviced++;
			console.log(i,"worker_2++++");
		} else {
			N_serviced_No++;

		}
	} 




} else {
	N_serviced_No++;
}
}*/
console.log(N_serviced,N_serviced_No);