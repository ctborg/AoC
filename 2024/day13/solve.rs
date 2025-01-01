use std::str::FromStr;
use num_bigint::BigInt;
use num_traits::{Zero, Signed};

fn main() {
    // These are the four machines from the puzzle:
    //
    // Machine 1 (solvable: cost 280)
    // Machine 2 (not solvable)
    // Machine 3 (solvable: cost 200)
    // Machine 4 (not solvable)
    //
    // Expected total for the winnable machines (1 & 3) = 480.

    let input = r#"
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
"#;

    // Split into lines
    let lines: Vec<&str> = input.trim().split('\n').collect();

    // Split into groups separated by blank lines
    let groups: Vec<&[&str]> = {
        let mut result = Vec::new();
        let mut start = 0;
        for (i, line) in lines.iter().enumerate() {
            if line.is_empty() {
                // push the slice of lines from start..i
                result.push(&lines[start..i]);
                start = i + 1;
            }
        }
        // push the final group if there is one
        if start < lines.len() {
            result.push(&lines[start..]);
        }
        result
    };

    let mut total = BigInt::zero();

    for group in groups {
        if group.len() < 3 {
            continue;
        }

        // Example lines for a single group:
        // Button A: X+94, Y+34
        // Button B: X+22, Y+67
        // Prize: X=8400, Y=5400

        // Parse Button A:
        // Skip "Button A: " (10 chars), then split by ", "
        let a_line_main = &group[0][10..];
        let mut a_parts = a_line_main.split(", ");
        let ax_str = &a_parts.next().unwrap()[2..]; // skip "X+"
        let ay_str = &a_parts.next().unwrap()[2..]; // skip "Y+"
        let ax = BigInt::from_str(ax_str).unwrap();
        let ay = BigInt::from_str(ay_str).unwrap();

        // Parse Button B:
        // Skip "Button B: " (10 chars), then split by ", "
        let b_line_main = &group[1][10..];
        let mut b_parts = b_line_main.split(", ");
        let bx_str = &b_parts.next().unwrap()[2..]; // skip "X+"
        let by_str = &b_parts.next().unwrap()[2..]; // skip "Y+"
        let bx = BigInt::from_str(bx_str).unwrap();
        let by = BigInt::from_str(by_str).unwrap();

        // Parse Prize:
        // Skip "Prize: " (7 chars), then split by ", "
        let p_line_main = &group[2][7..];
        let mut p_parts = p_line_main.split(", ");
        let px_str = &p_parts.next().unwrap()[2..]; // skip "X="
        let py_str = &p_parts.next().unwrap()[2..]; // skip "Y="
        let px = BigInt::from_str(px_str).unwrap();
        let py = BigInt::from_str(py_str).unwrap();

        // Solve the system:
        //  a*Ax + b*Bx = Px
        //  a*Ay + b*By = Py
        //
        // Using:
        //  denom = Ax*By - Ay*Bx
        //  a = (Px*By - Py*Bx) / denom
        //  b = (Py - Ay*a) / By
        //
        // Then cost = 3a + b.

        let denom = &ax * &by - &ay * &bx;
        if denom.is_zero() {
            // No unique solution
            continue;
        }

        // numerator for 'a'
        let numerator_a = &px * &by - &py * &bx;
        if &numerator_a % &denom != BigInt::zero() {
            continue;
        }
        let a = &numerator_a / &denom;

        // numerator for 'b'
        let numerator_b = &py - &ay * &a;
        if &numerator_b % &by != BigInt::zero() {
            continue;
        }
        let b = &numerator_b / &by;

        // a and b must be non-negative
        if a.is_negative() || b.is_negative() {
            continue;
        }

        // cost = 3*a + b
        let cost = &((&BigInt::from(3) * a) + b);
        total += cost;
    }

    // Print the sum of costs for all solvable machines
    println!("{}", total);
}
