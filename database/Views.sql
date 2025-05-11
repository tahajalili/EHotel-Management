/*
-- view 1
CREATE VIEW AvaliableRooms AS
SELECT Room.HotelID, Room.Id
FROM Room 
LEFT JOIN 
	Renting ON Room.id = Renting.RoomId
WHERE (Renting.id IS NULL);


--view 2
CREATE VIEW Capcity AS
SELECT Hotel.ID, Room.Capacity
FROM Hotel
JOIN Room ON Hotel.Id = Room.HotelId;

--Query for View 2 
SELECT SUM(
	CASE
		WHEN Capacity = 'Single' THEN 1
		WHEN Capacity = 'Double' THEN 2
		WHEN Capacity = 'Triple' THEN 2
		WHEN Capacity = 'Queen' THEN 2
		WHEN Capacity = 'King' THEN 2
		ELSE 0
	END
		)
FROM Capcity
--WHERE ID = 1;

--Query for View 1
SELECT HotelID, COUNT(*)
FROM AvaliableRooms
GROUP BY HotelID;

---the rest is used for testing only

INSERT INTO Customer (FullName, Address, IdType, IdNumber, RegistrationDate)
VALUES ('paul smith', '123 now, TX', 'Driver Licenses', '12323434325', CURRENT_TIMESTAMP);

INSERT INTO Booking (CustomerId, RoomId, StartDate, EndDate, IsConfirmed)
VALUES (1, 1, ('2025-10-30'), ('2025-10-31'), 1);
*/
