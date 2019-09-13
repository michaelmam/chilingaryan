

let qanak = 100;
// let count = 10;
let Time = 110;
let lyamda_mutq = 6;
let lyamda_serve = 8;
let a = 3;
let b = 5;

let worker_count = 6;

// let worker_1 = workers();
// let worker_2 = workers();

let all_served = 0;
let all_served_no = 0;

for (let porc = 0; porc < qanak; ++porc){
	
	
	let N_serviced = 0;
	let N_serviced_No = 0;
	
	let kungurent_n_0 = 3*Math.floor(Math.random() * 11)+1;
	let kungurent_t = 5*Math.floor(Math.random() * 11)+1;
	let kungurent_k = 8;
	
	let hajaxord = random(Time,lyamda_mutq,lyamda_serve,a,b,kungurent_n_0,kungurent_t,kungurent_k);
	// console.table(hajaxord);
	
	let worker = workers(worker_count);
	
	
	
	for (let i = 0; i < hajaxord.length; ++i) {
		let serve_true_false = false;
		if(hajaxord[i].t_i + hajaxord[i].serve <= Time){
			
			for (let j = 0; j < worker.length; ++j) {
				
				if(hajaxord[i].t_i >= worker[j].finish_time && worker[j].free === false){
					worker[j].free = true;
				}
				
				if(worker[j].free === true){
					
					worker[j].free = false;
					worker[j].t_i = hajaxord[i].t_i;
					worker[j].finish_time = worker[j].t_i + hajaxord[i].serve;
					worker[j].serve_all_time += hajaxord[i].serve;
					serve_true_false = true;
					// console.log(i,j,worker[j].t_i,worker[j].finish_time);
					// console.log("spasarkel = " + j,"hajaxord = " + i,"jamanaky = " + worker[j].t_i, "verj = " + worker[j].finish_time);
					break;
					
				} 
			}
			
			
			
			if (serve_true_false) {
				N_serviced++;
			} else {
				let sorted_worker = indexOfSmallest(worker,"finish_time");
				
				// console.log(sorted_worker);
				// for (let j = 0; j < worker.length; j++) {
				let j = 0;
				if(worker[sorted_worker[j]].free === false && hajaxord[i].t_i + hajaxord[i].wait_time >= worker[sorted_worker[j]].finish_time &&
					hajaxord[i].t_i + worker[sorted_worker[j]].finish_time + hajaxord[i].serve <= Time
					){
						
						worker[sorted_worker[j]].free = false;
						worker[sorted_worker[j]].t_i = worker[sorted_worker[j]].finish_time;
						worker[sorted_worker[j]].finish_time = worker[sorted_worker[j]].t_i + hajaxord[i].serve;
						worker[sorted_worker[j]].serve_all_time += hajaxord[i].serve;
						serve_true_false = true;
						// console.log(i,j,worker[sorted_worker[j]].t_i,worker[sorted_worker[j]].finish_time);
						// console.log("spasarkel = " + sorted_worker[j],"hajaxord = " + i,"jamanaky = " + worker[sorted_worker[j]].t_i, "verj = " + worker[sorted_worker[j]].finish_time, "spasel = " + (worker[sorted_worker[j]].t_i - hajaxord[i].t_i));
						
						// break;
						
					}
					// }
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
		all_served += N_serviced; 
		all_served_no += N_serviced_No;
		
		console.log(N_serviced,N_serviced_No);
	}

	console.log(all_served,all_served_no);
	
