# **Shamir's Secret Sharing Algorithm Implementation**
##**Overview**
This project implements a simplified version of Shamir's Secret Sharing algorithm. It calculates the constant term c of a polynomial using given encoded roots. The program supports multiple test cases provided in JSON format.

##**Features**
Parses input from JSON files.
Decodes y values based on different bases.
Uses interpolation to compute the constant term c of the polynomial.
Prints the constant c for each test case.
##**Input Format**
Input is provided in JSON format. Each test case contains:

n: Total number of roots.
k: Minimum number of roots required to solve the polynomial.
Encoded roots, where:
The key represents x.
The value is the encoded y in a specific base.
###**Example Input:**
json
Copy code
{
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  "2": {
    "base": "2",
    "value": "111"
  },
  "3": {
    "base": "10",
    "value": "12"
  },
  "6": {
    "base": "4",
    "value": "213"
  }
}
