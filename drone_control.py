from dronekit import connect, VehicleMode, LocationGlobalRelative
import time
import math

vehicle = None  # Global vehicle reference


def connect_drone(connection_string="udp:127.0.0.1:14550"):
    """
    Connect to SITL or real drone.
    Default: SITL at udp:127.0.0.1:14550
    """
    global vehicle
    if vehicle is None:
        print(f"🔗 Connecting to drone at {connection_string} ...")
        vehicle = connect(connection_string, wait_ready=True, timeout=60)
        print("✅ Drone connected successfully")
    return vehicle


def arm_and_takeoff(aTargetAltitude):
    v = connect_drone()

    print("🚁 Pre-arm checks...")
    while not v.is_armable:
        print("⏳ Waiting for vehicle to initialise...")
        time.sleep(1)

    print("🚁 Arming motors...")
    v.mode = VehicleMode("GUIDED")
    v.armed = True

    while not v.armed:
        print("⏳ Waiting for arming...")
        time.sleep(1)

    print(f"🚀 Taking off to {aTargetAltitude} meters...")
    v.simple_takeoff(aTargetAltitude)

    # Wait until the vehicle reaches the target altitude
    while True:
        alt = v.location.global_relative_frame.alt
        print(f"📡 Altitude: {alt:.2f} m")
        if alt >= aTargetAltitude * 0.95:
            print("✅ Reached target altitude")
            break
        time.sleep(1)


def land():
    v = connect_drone()
    print("🛬 Landing...")
    v.mode = VehicleMode("LAND")


def rtl():
    v = connect_drone()
    print("🔙 Return to Launch (RTL)...")
    v.mode = VehicleMode("RTL")


def move_forward(distance):
    v = connect_drone()
    print(f"➡️ Moving forward {distance} meters...")

    current_location = v.location.global_relative_frame
    heading = math.radians(v.heading)
    dlat = (distance * math.cos(heading)) / 111139.0
    dlon = (distance * math.sin(heading)) / (111139.0 * math.cos(math.radians(current_location.lat)))

    target_location = LocationGlobalRelative(
        current_location.lat + dlat,
        current_location.lon + dlon,
        current_location.alt
    )

    v.simple_goto(target_location)
    time.sleep(distance / 2)  # crude travel delay


def move_backward(distance):
    v = connect_drone()
    print(f"⬅️ Moving backward {distance} meters...")

    current_location = v.location.global_relative_frame
    heading = math.radians(v.heading)
    dlat = (-distance * math.cos(heading)) / 111139.0
    dlon = (-distance * math.sin(heading)) / (111139.0 * math.cos(math.radians(current_location.lat)))

    target_location = LocationGlobalRelative(
        current_location.lat + dlat,
        current_location.lon + dlon,
        current_location.alt
    )

    v.simple_goto(target_location)
    time.sleep(distance / 2)


def move_left(distance):
    v = connect_drone()
    print(f"⬅️ Moving left {distance} meters...")

    current_location = v.location.global_relative_frame
    heading = math.radians(v.heading)
    dlat = (-distance * math.sin(heading)) / 111139.0
    dlon = (distance * math.cos(heading)) / (111139.0 * math.cos(math.radians(current_location.lat)))

    target_location = LocationGlobalRelative(
        current_location.lat + dlat,
        current_location.lon + dlon,
        current_location.alt
    )

    v.simple_goto(target_location)
    time.sleep(distance / 2)


def move_right(distance):
    v = connect_drone()
    print(f"➡️ Moving right {distance} meters...")

    current_location = v.location.global_relative_frame
    heading = math.radians(v.heading)
    dlat = (distance * math.sin(heading)) / 111139.0
    dlon = (-distance * math.cos(heading)) / (111139.0 * math.cos(math.radians(current_location.lat)))

    target_location = LocationGlobalRelative(
        current_location.lat + dlat,
        current_location.lon + dlon,
        current_location.alt
    )

    v.simple_goto(target_location)
    time.sleep(distance / 2)


def stop():
    v = connect_drone()
    print("⏹️ Stop command received (hover in place)")
    v.mode = VehicleMode("BRAKE")


def disarm():
    v = connect_drone()
    print("🔒 Disarming motors...")
    v.armed = False
    time.sleep(2)


def execute_drone_command(intent, value=None):
    """
    Executes a drone command based on recognized intent.
    """
    intent = intent.upper().strip()
    print(f"🎯 Executing command: {intent} | Value: {value}")

    if intent == "TAKEOFF":
        arm_and_takeoff(value or 10)
    elif intent == "LAND":
        land()
    elif intent == "RTL":
        rtl()
    elif intent == "STOP":
        stop()
    elif intent == "DISARM":
        disarm()
    elif intent == "MOVE_FORWARD":
        move_forward(value or 5)
    elif intent == "MOVE_BACKWARD":
        move_backward(value or 5)
    elif intent == "MOVE_LEFT":
        move_left(value or 5)
    elif intent == "MOVE_RIGHT":
        move_right(value or 5)
    elif intent == "UP":
        arm_and_takeoff(value or 15)  # climb to given altitude
    elif intent == "DOWN":
        land()
    else:
        print(f"⚠️ Unknown intent: {intent}")


if __name__ == "__main__":
    vehicle = connect_drone("udp:127.0.0.1:14550")

    arm_and_takeoff(10)
    time.sleep(3)

    execute_drone_command("MOVE_FORWARD", 100)
    time.sleep(5)

    execute_drone_command("MOVE_LEFT", 15)
    time.sleep(5)

    execute_drone_command("MOVE_RIGHT", 15)
    time.sleep(5)

    execute_drone_command("MOVE_BACKWARD", 100)
    time.sleep(5)

    execute_drone_command("RTL")
    time.sleep(15)

    execute_drone_command("LAND")
    disarm()

    print("🚪 Closing connection...")
    vehicle.close()
    print("✅ Mission completed and connection closed.")