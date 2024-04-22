const findMissingNumber = (arr) => {
    // Проверка на массив
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    //Проверка на целые конечные целые
    if (
        arr.some(
            (num) =>
                typeof num !== 'number' ||
                isNaN(num) ||
                !isFinite(num) ||
                num % 1 !== 0
        )
    ) {
        throw new Error('Array must contain only finite whole numbers');
    }

    let n = arr.length;
    if (n === 0) {
        return 0;
    }

    let min = Math.min(...arr);
    let max = Math.max(...arr);

    //Если количество уникальных чисел не равно длине массива, возвращается 0
    let uniqueNumbers = new Set(arr);
    if (uniqueNumbers.size !== n) {
        return 0;
    }

    if (n === max - min + 1) {
        return 0;
    }

    let expectedSum = ((max - min + 1) * (min + max)) / 2;
    let actualSum = arr.reduce((acc, curr) => acc + curr, 0);

    if (expectedSum === actualSum) {
        return 0;
    }

    if (n === 1 || (n === 2 && (arr[0] === arr[1] || arr[0] === arr[1] + 1))) {
        return max + 1;
    }

    for (let i = min; i <= max; i++) {
        if (!arr.includes(i)) {
            return i;
        }
    }
    //Если все числа в диапазоне от минимального до максимального включительно присутствуют в массиве, функция возвращает следующее за максимальным число
    return max + 1;
};

///////////////////////////////////////////////// Проверка примеров//////////////////////////////////////////////////////////////

//Не сортированный
console.log(findMissingNumber([20, 0, 1, 3, 2])); // 4

//Сортированный
console.log(findMissingNumber([7, 9, 10, 11, 12])); // 8
console.log(findMissingNumber([0, 1, 2, 4, 5])); // 3

//Пропущенно несколько чисел (вернет первое пропущенное)
console.log(findMissingNumber([4, 6, 8, 9])); // 5
console.log(findMissingNumber([5, 0])); // 1

//Числа не пропущены
console.log(findMissingNumber([0, 1, 2, 3, 4])); // 0

//Пустой массив или содержит одно число
console.log(findMissingNumber([])); // 0
console.log(findMissingNumber([1])); // 0

//С отрицательными
console.log(findMissingNumber([-1, 0, 1, 2, 3])); // 0
console.log(findMissingNumber([-3, -2, 0, 1, 2])); // -1
console.log(findMissingNumber([-7, -2, 0, 2, 4, 6])); // -6
console.log(findMissingNumber([-2, -1, 0, 1])); // 0

//Ввели не массив
console.log(findMissingNumber(' ')); // Error: Input must be an array

//Массив содержит дробные
console.log(findMissingNumber([0.5, 1, 2.5, 3.5])); // Error: Array must contain only finite whole numbers
