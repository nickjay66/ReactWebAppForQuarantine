//arguments object is no longer bound
//this keyword is no longer bound

const add = (a,b) => {
    return a + b;
}

console.log(add(4,5));


const user = {
    name: 'Nick',
    cities: ['Thousand Oaks', 'Simi Valley'],
    printPlacesLived() {
        return this.cities.map((city) => this.name + ' has lived in ' + city); 
    }
};

console.log(user.printPlacesLived());

//Challenge area

const multiplier = {
    numbers: [1,3,5,6],
    multiplyBy(num) {
        return this.numbers.map((number) => number * num);
    }
};

console.log(multiplier.multiplyBy(2));
