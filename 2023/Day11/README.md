# Day 11 Reflection

In recent days, I noticed missing prompt history and set out to find it. My frustration was mounting due to frequent prompt usage and ineffective strategies. However, I shifted my approach, breaking down the problem more effectively for the language model. Today's success was a significant improvement.

## Prompt 1

This task involves a grid represented by empty spaces (.) and galaxies (#). Example:
```
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#....
```
The goal is to write a JavaScript program that calculates the sum of the shortest paths between each pair of galaxies.

## Prompt 2

Enhance the program by enlarging the grid before calculating paths. Rows and columns without galaxies should double in size. This is achieved through an `expandUniverse` function. After modification, the grid looks like:
```
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......
```
## Prompt 3

The `expandUniverse` function effectively doubles a row by adding a new one below, or doubles a column by adding one to the right. This adjustment was key for solving Part 1.

## Prompt 4

Further modify `expandUniverse` so that it replaces each empty row and column with 1,000,000 of their kind, instead of just doubling. This leads to a discussion about memory usage and a theoretical solution is provided.

## Prompt 5

Acknowledging that the expanded rows and columns lack galaxies, the program needs rewriting with this consideration.

## Prompt 6

A minor correction is needed. For instance, if expansion is by 10, the correct value is 1030. For an expansion of 100, it should be 8410. These adjustments led to achieving the second gold star.

