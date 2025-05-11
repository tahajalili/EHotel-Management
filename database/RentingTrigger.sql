/*
create trigger RentToArchive 
ON Renting 
FOR INSERT
AS
INSERT INTO RentingArchive(CustomerInfo, RoomInfo, StartDate, EndDate, CheckInEmployeeInfo, IsPaid)
SELECT TOP 1 CustomerId, RoomId, StartDate, EndDate, CheckInEmployeeId, IsPaid FROM Renting  ORDER BY ID DESC;

---the rest is used for testing only
INSERT INTO Employee([HotelId],[FullName],[Address],[Ssn])
VALUES(1,'rob swan', '124323 dfhgdh', '1232342355');

INSERT INTO Renting (CustomerId, RoomId, StartDate, EndDate, CheckInEmployeeId, IsPaid)
VALUES(1, 2, CURRENT_TIMESTAMP, DATEADD(day, 5, CURRENT_TIMESTAMP), 1, 0);


DELETE FROM RENTING;
DROP Trigger RentToArchive
*/

