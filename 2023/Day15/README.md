# Day 15

This was the first time in AoC that I was able to get a solution using a single prompt. Pretty big win. Total time was less than 5 minutes. Most of 
that time was reading time for me.

## Prompt 1
```
Good morning. I'd like you to write an ES6 program for me. I want you to write a program that takes a string input and calculates a "HASH". The
HASH algorithms starts with a "current value" of 0. Then, for each character in the string starting from the beginning:
		Determine the ASCII code for the current character of the string.
		Increase the current value by the ASCII code you just determined.
		Set the "current value" to itself multiplied by 17.
		Set the "current value" to the remainder of dividing itself by 256.
. The "current value" is used as the starting point for the next letter in the string. After following these steps for each character in the
string in order, the current value is the output of the HASH algorithm. 
```

That was enough to solve the first star.

## Prompt 2
```
Good. Now write a parsing function to take this input: "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7" and using the hashString function, 
calcluate the sum of these results.
```

## Prompt 3
```
Okay good. Now imagine you have 256 boxes numbered 0 through 255. Inside each box, there are several lens slots.  Along the wall running parallel
 to the boxes is a large library containing lenses organized by "focal length" ranging from 1 through 9. In my input that I provided, each step
begins with a sequence of letters that indicate the label of the lens on which the step operates. The result of running the hashString function
on the label indicates the correct box for that step. The label will be immediately followed by a character that indicates the operation to perform:
either an equals sign (=) or a dash (-). If the operation character is a dash (-), go to the relevant box and remove the lens with the given label
if it is present in the box. Then, move any remaining lenses as far forward in the box as they can go without changing their order, filling any
space made by removing the indicated lens. (If no lens in that box has the given label, nothing happens.).  If the operation character is an equals
sign (=), it will be followed by a number indicating the focal length of the lens that needs to go into the relevant box. There are two possible
situations: 		If there is already a lens in the box with the same label, replace the old lens with the new lens: remove the old lens and put the
new lens in its place, not moving any other lenses in the box.

If there is not already a lens in the box with the same label, add the lens to the box immediately behind any lenses already in the box. Don't
move any of the other lenses when you do this. If there aren't any lenses in the box, the new lens goes all the way to the front of the box.  I want
you to write a function that adds up the focusing power of all of the lenses.
```

## Prompt 4
```
Okay. So to calculate the "focusing power" it is the result of multiplying together:
		One plus the box number of the lens in question.
		The slot number of the lens within the box: 1 for the first lens, 2 for the second lens, and so on.
		The focal length of the lens.
```

## Prompt 5
Not too sure why, but it missed an instruction. I had to debug a little to figure out what was going wrong. 
```
So there is an error in your program. For the labelOperation and instruction. The correct value can be either an equals (=) or a minus (-).
```

Tha was enough to solve the second star. Consider me impresssed.

Onward to [Day 16](https://github.com/ctborg/AoC/tree/master/2023/Day16)
