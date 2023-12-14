# Day 14

After several days of struggling, I managed to solve today fairly quickly. I started breaking the problem down into 
even smaller chunks, and verifying the output after each step. It was quite effective.

The final star solution, while not optimized, hinted at the solution in the example. I noticed that the cycle was repeating,
and I just ran the final solution for 1000 iterations to get the star.

Now on to the prompts

## Prompt 1
```
I'm going to provide input that contains a flat 2d platform. It has Cube Rocks, which are labeled as #, Rounded Rocks which are labeled as O,
and empty space, labeled as a .   Imagine the surface has a control panel on the side that lets you tilt it in one of four directions. The
rounded rocks will roll when the platform is tilted, while the cube-shaped rocks will stay in place.  write a ES6 program to simulate what
would happen if platform was tilted north.  Here is the input:
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
```

## Prompt 2
```
Good. Now modify the pogram to calculate the total load on the north support beams. The amount of load caused by a single rounded rock is equal
to the number of rows from the rock to the south edge of the platform, including the row the rock is on. Cube-shaped rocks  don't contribute to
load.
```

## Prompt 3
```
Not quite. So after you run calculateNorthLoad, the first row would look like this: OOOO.#.O..  Since it is 10 rows away from the south edge,
 the row would weigh 50. For the second row it would look like this: OO..#....#. Since it is 9 rows away from the south egdge, the row would
 weigh 18.  Modify the program to calculate the weight for all rows, and return the total. 
```
This was enough for the first star.

## Prompt 4
```
Okay. Good, that worked. Now modify the program so that the platform will tilt in 4 directions at the press of a button. First north, then west,
then south, then east. Call this a "cycle". After each tilt, the rounded rocks roll as far as they can before the platform tilts in the next
direction. Output the platform and total load after each tilt.

```

## Prompt 5
```
Good. Now modify the program to run for 1000000000 cycles.
```  
Interestingly, the LLM called out "that in many simulations with repetitive cycles like this one, the system often reaches a steady state where 
further cycles do not change the state of the system. If the platform reaches such a state, we can stop the simulation early to avoid unnecessary 
computations."  While it understood there was a pattern to be found, it only produced code that looked at the previous state. It didn't look for a
repating pattern.


## Prompt 6
```
I'm getting an error in the IsMatrixEqual function. "Cannot read properties of undefined (reading '0')"
```

This was enough to solve part 2. I eyeballed the repeated pattern, and only ran the program for 1000 cycles to get the solution. 

Onward to [Day 15](https://github.com/ctborg/AoC/tree/master/2023/Day14)
