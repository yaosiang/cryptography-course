import MersenneTwister from 'mersenne-twister';

const fixSeed: number = 123456;

const generator: MersenneTwister = new MersenneTwister();
generator.init_seed(fixSeed);

const anotherGenerator: MersenneTwister = new MersenneTwister();
anotherGenerator.init_seed(fixSeed);

console.log(`Seed: ${fixSeed}`);
for (let i = 0; i < 10; i++) {
  console.log(`Generator A: ${i + 1} - ${generator.random()}`);
  console.log(`Generator B: ${i + 1} - ${anotherGenerator.random()}`);
  console.log();
}
