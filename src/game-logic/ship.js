export default function Ship(length) {
  const size = length;
  let health = size;
  let isSunk = size === 0 ? true : false;

  const getHealth = () => {
    return health;
  };

  const getIsSunk = () => {
    return isSunk;
  };

  const hit = () => {
    if (!isSunk) {
      health--;
      if (health === 0) {
        isSunk = true;
      }
    }
  };

  return {
    size,
    getHealth,
    getIsSunk,
    hit,
  };
}
