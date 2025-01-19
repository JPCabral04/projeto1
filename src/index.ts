const input1 = document.getElementById('num1') as HTMLInputElement;
const input2 = document.getElementById('num2') as HTMLInputElement;
const buttonSoma = document.getElementById('buttonSomar') as HTMLInputElement;
const buttonSubtrair = document.getElementById('buttonSubtrair') as HTMLInputElement;

function somar(a : number,b: number) {
    return a+b;
}

function subtrair(a : number,b: number) {
    return a-b;
}

buttonSoma.addEventListener('click', () => {
    const resultado = somar(Number(input1.value), Number(input2.value));
    console.log(resultado);
})

buttonSubtrair.addEventListener('click', () => {
    const resultado = subtrair(Number(input1.value), Number(input2.value));
    console.log(resultado);
})