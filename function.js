function indexOfSmallest(a,b) {
 let lowest = new Array();
 for (let i = 0; i < a.length; i++) {
    lowest[i] = new Object();
  lowest[i].value = a[i][b];
  lowest[i].index = i;
 }
 // console.log(lowest);
 lowest.sort(function (a, b) {
  return a.value - b.value;
});
 let sort_index = new Array;
 for(let i = 0; i < a.length; i++){
    sort_index[i] = lowest[i].index;
 }
 return sort_index;
}

function kungrument(kung_n,kung_t,kung_k,r_i_qanak) {
    let kung_m = Math.pow(2,kung_k);
    let kung_lyamda = 8*kung_t+3;
    let r_i = new Array();
    for (let i = 0; i < r_i_qanak; i++) {
        r_i[i] = kung_n/kung_m;
        kung_n = (kung_n * kung_lyamda) % kung_m;
    }
    // console.log(r_i);
    return r_i;
}

function puason(lyamda,kung_n,kung_t,kung_k,r_i,l) {
    let j=-1;
    let s=1;
    // let  r_i = kungrument(kung_n,kung_t,kung_k,1000);
    do {
        ++j;
        s=s*r_i[++l];
        // console.log(s,Math.pow(Math.E,-lyamda))
    } while (s>Math.pow(Math.E,-lyamda));
    return j;
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