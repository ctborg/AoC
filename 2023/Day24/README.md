# Day 24

Whew, finally made it to the "last" day. 

Part 1 was a 4 prompter today. Largely it was just a matter of tweaking the prompts to follow the instructions. Although, I knew what was coming when 
the story mentioned, "ignore z-axis".  🤔

Part 2 took a few prompts for me to discover the Least Squares approach. As I continued to propmt, CGpt eventualy just say 'use python', and then proceeded
to provide a sympy solution. My contribution here, as to prompt to use different libraries, and to limit the input to 5 lines. The "solution", essentially 
abstracted the hard problem away. The code compares the rock’s position over time to the particle’s position over time for each axis (X, Y, Z). 
Given the high cardinality of the particle positions, I assumed that solving for 2 particles would provide valid positions for the remainder.
