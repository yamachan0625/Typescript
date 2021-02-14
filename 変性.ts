// Crow <: Bird <: Animal
class Animal {}
class Bird extends Animal {
  chirp() {}
}
class Crow extends Bird {
  caw() {}
}

function chirp(bird: Bird): Bird {
  bird.chirp();
  return bird;
}
chirp(new Animal());
chirp(new Crow()); // Birdのサブタイプであるため渡すことができる
chirp(new Bird());

// ----------------------------------------------------------- //
function clone(f: (b: Bird) => Bird): void {
  let parent = new Bird();
  let babyBird = f(parent);
  babyBird.chirp();
}

function birdToBird(b: Bird): Bird {
  return new Bird();
}
clone(birdToBird);

function birdToCrow(d: Bird): Crow {
  return new Crow();
}
clone(birdToCrow);

function birdToAnimal(d: Bird): Animal {
  return new Animal();
}
clone(birdToAnimal); // clone関数内でchirp()を呼ぶため少なくともBirdを返すことを期待する

function animalToBird(a: Animal): Bird {
  return new Bird();
}
clone(animalToBird);

function crowToBird(c: Crow): Bird {
  c.caw();
  return new Bird();
}
clone(crowToBird);

// ----------------------------------------------------------- //
