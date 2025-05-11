/*

CREATE TRIGGER PreventOverlapingBookingsAndBookToArchive
ON Booking
INSTEAD OF INSERT
AS
BEGIN
    IF EXISTS (
		SELECT 1 FROM Booking as b
		JOIN inserted as i ON b.RoomId = i.RoomId
		WHERE   i.StartDate between b.StartDate and b.EndDate OR i.EndDate between b.StartDate and b.EndDate OR 
			b.StartDate between i.StartDate and i.EndDate OR b.EndDate between i.StartDate and i.EndDate
    )
    BEGIN
        PRINT 'BAD';
		RETURN;
    END
 
    INSERT INTO Booking(CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed)
    SELECT CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed FROM inserted;
	INSERT INTO BookingArchive(CustomerInfo, RoomInfo, StartDate, EndDate, BookingDate, IsConfirmed)
	SELECT CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed FROM inserted;
END;

---the rest is used for testing only

INSERT INTO Booking (CustomerId, RoomId, StartDate, EndDate, IsConfirmed)
VALUES (2, 1 , ('2025-11-1'), ('2025-11-3'), 1

DROP TRIGGER PreventOverlapingBookings

DELETE FROM Booking;


INSERT INTO Booking (CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed)
VALUES (1, 1 , ('2025-11-1'), ('2025-11-3'),CURRENT_TIMESTAMP, 1)
*/




