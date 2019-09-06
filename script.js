

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
let a = 3;
let b = 5;
let wait_time = 2;

let worker_count = 6;

// let worker_1 = workers();
// let worker_2 = workers();

let N_serviced = 0;
let N_serviced_No = 0;

let hajaxord = random(Time,lyamda,a,b,wait_time);
console.log(hajaxord);

let worker = workers(worker_count);

for (let i = 0; i < hajaxord.length; i++) {
	let serve_true_false = false;
	if(hajaxord[i].t_i + hajaxord[i].serve <= Time){

		for (let j = 0; j < worker.length; j++) {

			if(hajaxord[i].t_i >= worker[j].finish_time && worker[j].free === false){
				worker[j].free = true;
			}

			if(worker[j].free === true){

				worker[j].free = false;
				worker[j].t_i = hajaxord[i].t_i;
				worker[j].finish_time = worker[j].t_i + hajaxord[i].serve;
				serve_true_false = true;
				// console.log(i,j,worker[j].t_i,worker[j].finish_time);
				console.log("spasarkel = " + j,"hajaxord = " + i,"jamanaky = " + worker[j].t_i, "verj = " + worker[j].finish_time);
				break;

			} 
		}



		if (serve_true_false) {
			N_serviced++;
		} else {
			for (let j = 0; j < worker.length; j++) {
			if(worker[j].free === false && hajaxord[i].t_i + hajaxord[i].wait_time >= worker[j].finish_time &&
						hajaxord[i].t_i + worker[j].finish_time + hajaxord[i].serve <= Time
					){

				worker[j].free = false;
				worker[j].t_i = worker[j].finish_time;
				worker[j].finish_time = worker[j].t_i + hajaxord[i].serve;
				serve_true_false = true;
				// console.log(i,j,worker[j].t_i,worker[j].finish_time);
				console.log("spasarkel = " + j,"hajaxord = " + i,"jamanaky = " + worker[j].t_i, "verj = " + worker[j].finish_time, "spasel = " + (worker[j].t_i - hajaxord[i].t_i));

				break;
			
			}
		}
		if (serve_true_false) {
			N_serviced++;
		} else {
			N_serviced_No++;
		}
		}

	} else {
		N_serviced_No++;
	}
}

console.log(N_serviced,N_serviced_No);