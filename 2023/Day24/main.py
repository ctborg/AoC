import argparse
from sympy import var, Eq, solve

# Function to solve equations related to particles' motion
def solve_particle_motion(input_file):
    # Store data about particles' positions and velocities
    particle_data = []

    # Define symbolic variables for the rock's starting position and velocity
    start_x, start_y, start_z, velocity_x, velocity_y, velocity_z = var("start_x start_y start_z velocity_x velocity_y velocity_z")

    # List to hold equations for each particle's motion
    motion_equations = []

    # Process each line in the input file
    with open(input_file) as file:
        for line in file:
            # Split the line into position and velocity components
            position_data, velocity_data = line.split(" @ ")
            position_values = list(map(int, position_data.split(", ")))  # Position values
            velocity_values = list(map(int, velocity_data.split(", ")))  # Velocity values

            # Append the particle's position and velocity to the list
            particle_data.append((position_values, velocity_values))

            # Create a symbolic time variable for each particle
            time_symbol = f"t{len(motion_equations) // 3}"
            exec(f'{time_symbol} = var("{time_symbol}")')

            # Create equations comparing the rock's and particle's positions over time for each axis
            motion_equations.append(Eq(start_x + velocity_x * var(time_symbol), position_values[0] + velocity_values[0] * var(time_symbol)))  # X-axis equation
            motion_equations.append(Eq(start_y + velocity_y * var(time_symbol), position_values[1] + velocity_values[1] * var(time_symbol)))  # Y-axis equation
            motion_equations.append(Eq(start_z + velocity_z * var(time_symbol), position_values[2] + velocity_values[2] * var(time_symbol)))  # Z-axis equation

            # Limit the number of particles to process
            if len(motion_equations) > 9:
                break

    # Solve the system of equations for particle motion
    solution = solve(motion_equations)[0]

    # Print the sum of the solved starting positions (start_x, start_y, start_z)
    print(solution[start_x] + solution[start_y] + solution[start_z])

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Solve hailstone and rock intersections.")
    parser.add_argument("input_file", help="Path to the input file containing hailstones.")
    args = parser.parse_args()
    solve_particle_motion(args.input_file)
