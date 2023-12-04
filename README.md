# 📋 QUẢN LÝ LỊCH THI TẠI TRƯỜNG FU HCM

## Bối cảnh

 Tại trường FU HCM, việc quản lí lịch thi cho giảng viên và sinh viên gặp nhiều bất cập khi vẫn phải đang dùng giấy thông báo dán ở trước phòng khảo thí, đồng thời không áp dụng công nghệ để quản lí lịch thi, gây ra nhiều vấn đề về tính hiệu quả và tính đáng tin cậy trong quá trình tổ chức các kỳ thi.

## Vấn đề
1. Khó khăn trong Quản lý Thời Gian Thi: Giảng viên và sinh viên gặp khó khăn khi phải tự quản lý thời gian canh thi của họ, do thiếu hệ thống hỗ trợ.

2. Khó Khăn trong Sắp Xếp Ca Thi cho Giảng Viên: Công tác sắp xếp giảng viên vào các ca thi trở nên khó khăn và tốn nhiều thời gian khi thực hiện thủ công.

3. Khó Khăn trong việc Tìm Phòng Thi: Sinh viên gặp khó khăn khi phải tìm phòng thi, do không có hệ thống hỗ trợ cho việc này.

4. Rủi Ro của việc Quản lý bằng thủ Công: Quản lý thủ công dễ dẫn đến những lỗi như trùng lịch thi hoặc đặt phòng bị trùng, gây rối trong quá trình tổ chức thi.

5. Tốn Thời Gian: Việc tạo và quản lý bài thi theo cách thủ công đòi hỏi nhiều thời gian, tạo ra sự không hiệu quả trong quá trình tổ chức thi.

6. Gian Lận Đổi Lịch Thi và Phòng Thi: Hệ thống hiện tại không đảm bảo tính minh bạch và bảo mật đối với việc đổi lịch thi và phòng thi, dẫn đến nguy cơ gian lận trong quá trình tổ chức thi.

## Giải pháp
Triển khai một Hệ thống Quản lý Lịch Thi (ESMS) hiện đại và đa năng. Hệ thống này sẽ cung cấp một loạt các tính năng, bao gồm:
- Lập lịch tự động
- Thông báo tự động
- Sắp xếp ca thi
- Tìm kiếm phòng thi
- Minh bạch và Bảo mật

## Đối tượng tham gia
- Examiner
- Student
- Admin

## Tính năng chính của từng đối tượng
### Student:
- Xem Thông Tin Ca Thi
- Tìm Kiếm Ca Thi
### Examiner:
- Đăng Ký Lịch Coi Thi
- Thống Kê Số Lượng Coi Thi
- Xem Thông Tin Lịch Coi Thi
### Admin:
- Toàn Quyền Quản Trị Hệ Thống
- Tìm Kiếm Thông Tin Ca Thi
- Xuất Thông Tin Ra File Excel
- Tạo Ca Thi
- Quản Lý Ca Thi
- Thêm Sinh Viên và Giảng Viên
## Yêu cầu không chức năng:
- Lên Lịch Trước Ngày Bắt Đầu
- Thông Báo qua Email
- Phụ Cấp Coi Thi
- Thời Gian Lên Lịch và Huỷ Lịch
- Phụ Cấp Coi Thi
- Khoảng Cách Giữa Các Ca Thi


## Hướng dẫn cài đặt
### Clone repo github về máy
...
git clone https://github.com/ngogiahuan/FU-Exam-Schedule.git
cd FU-EXAM-Schedule
npm install
npm start
...

### Tài khoản các role
#### Role Admin:
...
Tài khoản: AnhLPVSE170540@fpt.edu.vn
Mật khẩu: 12345
...

#### Role Examiner:
...
Tài khoản: NhanDNHSE171010@fpt.edu.vn
Mật khẩu: 12345
...

#### Role Student:
...
Tài khoản: HuanNGSE171018@fpt.edu.vn
Mật khẩu: 12345
...