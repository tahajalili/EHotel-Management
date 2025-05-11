INSERT INTO Customer (FullName, Address, IdType, IdNUmber, RegistrationDate)
VALUES ('','','','',CURRENT_TIMESTAMP);

DELETE FROM Customer WHERE id = null;

INSERT INTO Employee(HotelId, FullName, Address, Ssn)
Values (null, null, null, null) 

DELETE FROM Employee WHERE id = null;

DELETE FROM Renting WHERE id = null;

DELETE FROM Booking WHERE id = null;


