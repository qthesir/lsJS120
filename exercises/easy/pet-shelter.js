// Write the code to make this work

/*
Ok if we want to add pets to the shelter and then have the pet get adopted later, we need a new data structure
to keep track of pets in the shelter, a way to add them, and then we have to update the "adopt" function to take a pet 
from the list of available pets instead of passing them into the function... Hm... maybe when a new pet is created,
its added to the shelter, as part of the constructor? But thats not explicit. We want an explicit way to add it to the
shelter. It could also have pets, and pets not available for adoption, but we don't need that level of specificity right now. 

Based on my experimentation with an array, I think the object reference is actually more elegant, because then I don't 
have to do findIndex every time. 

Next thing to do: Change data structure from array to object
*/

class Shelter {
  constructor() {
    this.owners = {};
    this.petsForAdoption = {};
  }

  rescuePet(pet) {
    if (!this.petsForAdoption[pet.getName()]) {
      this.petsForAdoption[pet.getName()] = pet;
    } else {
      return "Pet is already in the shelter";
    }
  }

  printUnadoptedPets() {
    console.log("The Animal Shelter has the following unadopted pets:");
    Object.values(this.petsForAdoption).forEach((pet) => {
      console.log(`a ${pet.getType()} named ${pet.getName()}`);
    });

    console.log("");
  }

  adopt(owner, pet) {
    if (!this.petsForAdoption[pet.getName()]) {
      return "Pet is not available for adoption";
    }
    let petForAdoption = this.petsForAdoption[pet.getName()];
    owner.adoptPet(petForAdoption);
    delete this.petsForAdoption[pet.getName()];
    if (!this.owners[owner.getName()]) {
      this.owners[owner.getName()] = owner;
    }
  }

  printAdoptions() {
    Object.values(this.owners).forEach((owner) => {
      console.log(`${owner.getName()} has adopted the following pets:`);
      owner.printPets();
      console.log(" ");
    });
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }

  adoptPet(pet) {
    this.pets.push(pet);
  }

  printPets() {
    this.pets.forEach((pet) => {
      console.log(`a ${pet.getType()} named ${pet.getName()}`);
    });
  }

  getName() {
    return this.name;
  }
}

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }
}

let shelter = new Shelter();
let butterscotch = new Pet("cat", "Butterscotch");
shelter.rescuePet(butterscotch);
let pudding = new Pet("cat", "Pudding");
shelter.rescuePet(pudding);
let darwin = new Pet("bearded dragon", "Darwin");
shelter.rescuePet(darwin);
let kennedy = new Pet("dog", "Kennedy");
shelter.rescuePet(kennedy);
let sweetie = new Pet("parakeet", "Sweetie Pie");
shelter.rescuePet(sweetie);
let molly = new Pet("dog", "Molly");
shelter.rescuePet(molly);
let chester = new Pet("fish", "Chester");
shelter.rescuePet(chester);

let phanson = new Owner("P Hanson");
let bholmes = new Owner("B Holmes");

shelter.printUnadoptedPets();

shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.getName()} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.getName()} has ${bholmes.numberOfPets()} adopted pets.`);

shelter.printUnadoptedPets();
