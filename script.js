


function random(T,lyamda_mutq,lyamda_serve,a,b,wait_time,kung_n,kung_t,kung_k) {
	// kung-ery kungurenti popoxakannern en
	let array = new Array();
	let i = 1;
	array[0] = new Object();
	array[0].t_i = 0;
	let t_i = 0;

	let  r_i = new Array();
	r_i = kungrument(kung_n,kung_t,kung_k,1000);

	do{
		array[i] = new Object();

		// array[i].tao_i = puason(lyamda_mutq,kung_n,kung_t,kung_k,r_i,i);
		array[i].tao_i = 1;
		array[i].t_i = array[i-1].t_i + array[i].tao_i;
		array[i].serve = puason(lyamda_serve,kung_n,kung_t,kung_k,r_i,i+100);
		// array[i].serve = 10;
		array[i].wait_time = a+(b-a)*r_i[i];
		++i;
	} while (array[i-1].t_i < T);

	array.pop(); // jamic ushacoxin jnjuma
	array.shift(); // arajiny vor menak 0 a jnjuma

	// let ii = array.indexOf(Math.min(...array));
	// console.log(ii);
	return array;
}


// let count = 10;
let Time = 110;
let lyamda_mutq = 6;
let lyamda_serve = 8;
let a = 3;
let b = 5;
let wait_time = 2;

let worker_count = 6;

// let worker_1 = workers();
// let worker_2 = workers();

let N_serviced = 0;
let N_serviced_No = 0;

let kungurent_n_0 = 3;
let kungurent_t = 9;
let kungurent_k = 12;

let hajaxord = random(Time,lyamda_mutq,lyamda_serve,a,b,wait_time,kungurent_n_0,kungurent_t,kungurent_k);
console.table(hajaxord);

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
			let sorted_worker = indexOfSmallest(worker,"finish_time");

 			console.log(sorted_worker);
			for (let j = 0; j < worker.length; j++) {

				if(worker[sorted_worker[j]].free === false && hajaxord[i].t_i + hajaxord[i].wait_time >= worker[sorted_worker[j]].finish_time &&
					hajaxord[i].t_i + worker[sorted_worker[j]].finish_time + hajaxord[i].serve <= Time
					){

					worker[sorted_worker[j]].free = false;
				worker[sorted_worker[j]].t_i = worker[sorted_worker[j]].finish_time;
				worker[sorted_worker[j]].finish_time = worker[sorted_worker[j]].t_i + hajaxord[i].serve;
				serve_true_false = true;
				// console.log(i,j,worker[sorted_worker[j]].t_i,worker[sorted_worker[j]].finish_time);
				console.log("spasarkel = " + sorted_worker[j],"hajaxord = " + i,"jamanaky = " + worker[sorted_worker[j]].t_i, "verj = " + worker[sorted_worker[j]].finish_time, "spasel = " + (worker[sorted_worker[j]].t_i - hajaxord[i].t_i));

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

