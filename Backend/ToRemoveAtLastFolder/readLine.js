const readLine =require('readline');
const r1=readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})

const name2=process.argv.slice(2);
const ToGive=name2.join(" ");
if(ToGive){
    r1.setPrompt('Write something good ');
    r1.prompt();
    console.log(`Why you have written this ${ToGive}`);
    console.log("Sorry no more inputs");
    process.exit();
}

// console.log(name2);

r1.setPrompt('Write something good ');
r1.prompt();
r1.on('line',(input)=>{
    console.log(`Why you have written this ${input}`);
    console.log("Sorry no more inputs");
    r1.close();
})