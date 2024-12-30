// Import necessary modules for file reading (Node.js only)
const fs = require('fs');

// Function to decode a number from a given base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate Lagrange interpolation and find the constant term 'c'
function findConstantTerm(roots, k) {
    let constant = 0;

    // Extract x and y values from roots
    const points = roots.slice(0, k); // Use the first k points
    const xs = points.map(root => root.x);
    const ys = points.map(root => root.y);

    // Calculate the Lagrange polynomial for each point
    for (let i = 0; i < k; i++) {
        let li = 1;

        // Calculate L_i(0), which gives the constant term contribution from the i-th point
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= (0 - xs[j]) / (xs[i] - xs[j]);
            }
        }

        // Add the contribution of the i-th term to the constant
        constant += ys[i] * li;
    }

    // Return the constant term rounded to the nearest integer
    return Math.round(constant);
}

// Main function to process the JSON input and find the secret
function processJsonFile(filename) {
    // Read the JSON file
    const jsonData = fs.readFileSync(filename, 'utf8');
    const data = JSON.parse(jsonData);

    // Extract keys (n and k)
    const n = data.keys.n;
    const k = data.keys.k;

    // Decode the roots
    const roots = Object.keys(data)
        .filter(key => !isNaN(key)) // Only consider numeric keys (root entries)
        .map(key => {
            const root = data[key];
            return {
                x: parseInt(key), // Key is x
                y: decodeValue(parseInt(root.base), root.value) // Decode y
            };
        });

    // Find the constant term 'c'
    return findConstantTerm(roots, k);
}

try {
    const result1 = processJsonFile('testcase1.json'); // Replace with the path to the first JSON file
    const result2 = processJsonFile('testcase2.json'); // Replace with the path to the second JSON file

    console.log("Secret for Test Case 1 (Constant 'c'):", result1);
    console.log("Secret for Test Case 2 (Constant 'c'):", result2);
} catch (error) {
    console.error("Error processing JSON files. Check JSON formatting and paths:", error.message);
}

