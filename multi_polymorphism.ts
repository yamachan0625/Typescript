type HasSides = { numberOfside: number };
type SideHaveLength = { sideLength: number };

function logPermeter<T extends HasSides & SideHaveLength>(s: T): T {
  console.log(s.numberOfside * s.sideLength);
  return s;
}

type Square = HasSides & SideHaveLength;
let square: Square = { numberOfside: 4, sideLength: 3 };
const result = logPermeter(square);
