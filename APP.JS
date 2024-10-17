let array = [];
let arraySize = 50;
let speed = 500;

// Generates a random array
function generateArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

// Displays the array in the container
function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`; // Multiply to adjust height
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    });
}

// Updates array size and regenerates the array
function updateArraySize(newSize) {
    arraySize = newSize;
    generateArray();
}

// Delay function to slow down the visualization
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort implementation
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                displayArray();
                await delay(speed);
            }
        }
    }
}

// Selection Sort implementation
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap
            displayArray();
            await delay(speed);
        }
    }
}

// Quick Sort implementation
async function quickSort(start = 0, end = array.length - 1) {
    if (start < end) {
        let pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    }
}

// Helper function for Quick Sort (Partitioning)
async function partition(start, end) {
    let pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]]; // Swap
            pivotIndex++;
            displayArray();
            await delay(speed);
        }
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]]; // Swap pivot
    displayArray();
    await delay(speed);
    return pivotIndex;
}

// Insertion Sort implementation
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            displayArray();
            await delay(speed);
        }
        array[j + 1] = key;
        displayArray();
        await delay(speed);
    }
}

// Function to start sorting based on selected algorithm
function startSort() {
    const algorithm = document.getElementById('algorithm').value;
    speed = 1000 - document.getElementById('speed').value * 100;
    
    switch (algorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'quick':
            quickSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        default:
            break;
    }
}

// Initial array generation
generateArray();
