export const N = 4;

export const fillArray = (size, value = 0) => Array(size).fill(value);

export const directions = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
};

export const joinLeft = array => {
  let left, right;
  let newArray = [...array];
  for (left = 0; left < newArray.length - 1; left++) {
    right = left + 1;
    if (newArray[left]) {
      while (right < array.length && !newArray[right]) {
        right++;
      }

      if (newArray[left] === newArray[right]) {
        newArray[left] += newArray[right];
        newArray[right] = 0;
      }
    }
  }

  return newArray;
};

export const slideLeft = array => {
  const filteredArray = array.filter(x => x);

  return [...filteredArray, ...fillArray(N - filteredArray.length)];
};

export const rotate = matrix => {
  const newMatrix = fillArray(N).map(() => fillArray(N));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newMatrix[j][N - 1 - i] = matrix[i][j];
    }
  }

  return newMatrix;
};

export const matches = (matrix1, matrix2) => matrix1.every((row, i) => row.every((value, j) => matrix2[i][j] === value));

