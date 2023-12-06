# Day 06

Progress today. Solved both stars using just 2 prompts.

# First prompt

Holding down the button charges the boat, and releasing the button allows the boat to move.  Boats move faster if their button was held longer, but time spent holding the button counts against the total race time.  For example:
Time:      7  15   30
Distance:  9  40  200
This document describes three races:
		The first race lasts 7 milliseconds. The record distance in this race is 9 millimeters.
		The second race lasts 15 milliseconds. The record distance in this race is 40 millimeters.
		The third race lasts 30 milliseconds. The record distance in this race is 200 millimeters.  Your toy boat has a starting speed of zero millimeters per millisecond. For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by one millimeter per millisecond. For the first race, the  record distance is 9 millimeters, there are actually 4 different ways you could win: you could hold the button for 2, 3, 4, or 5 milliseconds at the start of the race. In the second race, you could hold the button for at least 4 milliseconds and at most 11 milliseconds and beat the record, a total of 8 different ways to win.
In the third race, you could hold the button for at least 11 milliseconds and no more than 19 milliseconds and still beat the record, a total of 9 ways you could win.   Write a javascript program to calculate the number of ways you can beat the record in each race; in this example, if you multiply these values together, you get 288 (4 * 8 * 9). 


# Second prompt

if my input changes to Time:        [my input time]
Distance:   [my input distance] the calculateWaysToWin function fails to run. 

Fairly impressive. The entire time to solve was less than 5 minutes, including reading time.

Onward to [Day 07](https://github.com/ctborg/AoC/tree/master/2023/Day07)
