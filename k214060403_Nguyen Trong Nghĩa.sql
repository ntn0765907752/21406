USE KHOTHUOC
GO
ALTER AUTHORIZATION ON DATABASE::KHOTHUOC TO [sa]
GO
--CAU1
CREATE VIEW PHIEUNHAP
AS
SELECT N.Thoigian as 'Thời gian lưu phiếu',
	N.Sophieu as 'Số phiếu',
	N.Ngay as 'Ngày',
	N.Makhonhap as 'Mã kho nhập',
	K.Tenkho as 'Tên kho nhập',
	DMT.Mathuoc as 'Mã số thuốc',
	DMT.Tenthuoc as 'Tên thuốc',
	NCT.Soluong as 'Số lượng nhập',
	NCT.Dongia as 'Đơn giá',
	NCT.Thanhtien as 'Thành tiền' 
FROM NHAP N
JOIN NHAP_CHITIET NCT
ON N.Sophieu=NCT.Sophieu AND N.Thoigian=NCT.Thoigian
JOIN DANHMUCTHUOC DMT ON DMT.Mathuoc=NCT.Mathuoc
JOIN KHO K ON K.Makho=N.Makhonhap

--CAU2
 SELECT *
 FROM PHIEUNHAP 
 WHERE YEAR([Ngày])=2017 AND [Tên thuốc] LIKE '%var%'
 ORDER BY [Thành tiền] DESC


 --CAU3
SELECT year([ngày]), [Tên kho nhập], COUNT([Số phiếu])
 FROM PHIEUNHAP 
 GROUP BY year(Ngày), [Tên kho nhập]
 HAVING COUNT([Số phiếu])>50
 ORDER BY year(Ngày)


 --CAU4
SELECT [Tên thuốc]
FROM PHIEUNHAP
WHERE YEAR([Ngày])=2017  
EXCEPT
SELECT [Tên thuốc]
FROM PHIEUNHAP
WHERE YEAR([Ngày])=2016 



--CAU5


CREATE PROCEDURE VIEWNHAP

(
@thoigian char(6),
@sophieu char(15)
)
AS
BEGIN
SELECT SUM([Thành tiền]) AS TongTien, [Thời gian lưu phiếu], [Số phiếu]
FROM PHIEUNHAP
WHERE [Thời gian lưu phiếu] = @thoigian 
GROUP BY [Thời gian lưu phiếu], [Số phiếu]
HAVING SUM([Thành tiền]) > (
			SELECT SUM([Thành tiền])
			FROM PHIEUNHAP
			WHERE [Thời gian lưu phiếu] = @thoigian AND [Số phiếu] = @sophieu
			GROUP BY [Thời gian lưu phiếu]
			)
END



--ví dụ thực thi 
exec VIEWNHAP 'KC11/1', 012016
select * from PHIEUNHAP


--CAU6 
SELECT  N.Sophieu as Sophieunhap, ' ', NCT.Soluong,0
FROM NHAP N
JOIN NHAP_CHITIET NCT
ON N.Thoigian =NCT.Thoigian AND N.Sophieu = NCT.Sophieu
WHERE  N.Thoigian = 012017
UNION all

SELECT ' ', XHCT.Sophieu, 0,  XHCT.Soluong
FROM XUATHU XH
JOIN XUATHU_CHITIET XHCT
ON XH.Thoigian=XHCT.Thoigian AND XH.Sophieu=XHCT.Sophieu
WHERE XH.Thoigian = 012017

