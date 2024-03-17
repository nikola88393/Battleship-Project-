export default function Ship(length) {
  const size = length;
  let health = size;
  let isSunk = size === 0;

  const getHealth = () => health;

  const getIsSunk = () => isSunk;

  const hit = () => {
    if (!isSunk) {
      health -= 1;
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
