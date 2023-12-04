# Day 03

## First prompt
Write javascript code. The input provided consists of  number and symbols in 2d space. Any number adjacent to a symbol, even diagonally, is a "part number" and should added to a variable called part sum. Here is the input: 
```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```

## Second prompt
Almost, two numbers are not added to the partSum because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so it is added; the sum should be 4361

## Third prompt
Close. Numbers that are adjecent to each other, should be considered a single integer, not seperate. For example: the line "617*......" the integer should be 617, not 6, 1, 7.

## Fourth prompt
Close. The symbols can be any character except either a number or a period .

That was enough to solve part 1. Total time was around 5 minutes. Not bad. On to part 2.

## Fifth prompt
Okay great. Now modify the code so that the only numbers that you add to partSum is the product of exactly two part numbers that are adjacent to a *. All other symbols can be ignored. In the input there are only 4 numbers that match this criteria numbers 467 and 35, so its productSum is 16345. Ther other two numbers are in the lower right 755 and 598 are both next to a *. So the productSum is 451490. Adding all productSums produces 467835

## Sixth prompty
The code produces the output: 1294499. 

Oddly, ChatGPT doesn't verify the results, and will just lie to your face.

## Seventh prompty
Good. Adjacent numbers can also be on the same line. For example the output should be 223416 for this input: 
```
...788..............................54.........501...........555.........270.................................521......893...................
..../..*963........................*..860......................*....53...../.....................52.................&....347........428*522.
```

## Eighth prompt
Great. But the code has some errors. The numbers can only be used once. So 1558784 should be output  for this input: 
```
.....210................356..*.........977.68.........38.......835.622.332.....*300.....131.422..............89..*.....+..........$.........
..............14..312......+..926.....*.......529..*............*...*....*.............*......%...310.......*...835..................885....
...416../467..........................423.....*...143...132..955...356...124.........588..947....*.....512......................134&.*......
```
## Ninth prompt
Almost, so for this input 
```
...788.............................54.........501...........555.........270.................................521......893....................
..../..*963........................*..860......................*....53...../.....................52.................&....347........428*522.
```
the 54 is being included in the product sum. It shouldn't be because there are not 2 integers adjacent to each other.

This produced working code. I did have to add some debugging to figure out what was going on, but overll time was around 15 minutes to complete the challenge.

Onward to [Day 04](https://github.com/ctborg/AoC/tree/master/2023/Day04)
