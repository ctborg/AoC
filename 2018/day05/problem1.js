q = input.split('');
let re;
let prevLength;

while(true) {
  prevLength = q.length;
  q.forEach((i,j)=>{
    re = new RegExp(q[j+1], 'i');
    re2 = new RegExp(q[j+1]);
    if (i.match(re) && !i.match(re2)){
      q.splice(j,2)
    }
  });
  
  if (prevLength == q.length) {
    break;
  }
}
console.log(q.length);
