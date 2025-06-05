let number = 70;

// let grade = calculateGrade(number);

// console.log(grade)

const calculateGrade = (number) => {
    if(number >= 90){
        return 'A';
    }
    else if(number >= 80){
        return 'B'
    }
    else if(number >= 70){
        return 'C'
    }
    else if(number >= 60){
        return 'C'
    }
    else{
        return 'F'
    }
}

// ques2

let calculateprice = (price) => {
    if(price <= 100){
        return {msg:'Discount is not applicable'};
    }
    return price - (price * 0.1);
}

// console.log(calculateprice(100));

// ques3

let election = (age) => {
    if(+age < 18){
        return {msg:'Not eligible for voting'};
    }
    return {msg:'You are eligible for voting :)'}
}

// console.log(election(18));

// ques4

let aOrb = () => {
    let a = 100, b = 20
    if(a >= b){
        return true;
    }
    return false;
}

console.log(aOrb());