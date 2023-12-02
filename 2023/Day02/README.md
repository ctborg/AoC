# Day 2
I took a different approach today. I started chunking out small solutions, and fed them to the llm. It seemed to work significantly better. I was able to get 
workable code in less than 10 minutes. Progress.

## First prompt
Okay, new problem. The are a few games:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

How many games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes? Write some javascript code to prove this.

## Second prompt
Using the Game number as the ID, sum the ID of all the games that match the criteria. 

I had a working example at this point. Now I used ChatGPT to parse the input.

## Third prompt
Also add to the code a function to parse my input into the games variable. 

## Fourth prompt
not quite. for for the parse function, for game 1, the output should be like: { id: 1, sets: [{ red: 4, blue: 3 }, { red: 1, green: 2, blue: 6 }, { green: 2 }] }

That was enough to solve Part 1

On to part 2
## Fifth prompt
make a slight modification to the code. So that for each game played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible? So for example in Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green. the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.

## Sixth Prompt
Good. Continuing, modify this code,for each game multiply the values of red, green, and blue cubes.  Call that the PowerOfCubes. Then sum the value of each PowerOfCubes.

Done. 2 stars.
